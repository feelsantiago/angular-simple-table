import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  filter,
  Observable,
  scan,
  tap,
  withLatestFrom,
  shareReplay,
} from 'rxjs';
import { TableCheckboxColumnDirective } from './directives/table-checkbox-column.directive';
import { TableColumnDirective } from './directives/table-column.directive';
import { TableExpandableRowDirective } from './directives/table-expandable-row.directive';
import { DataTransform } from './domain/data-transform';
import { ExpandableRow, ExpandableState } from './domain/expandable-state';
import {
  SelectionState,
  TableSelectionState,
} from './domain/table-selection-state';
import { TableElement, TableElementKey } from './domain/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Object> {
  @Input()
  public set data(elements: T[]) {
    this.dataInput$.next(elements);
  }

  @Input()
  public set selectBy(key: keyof T) {
    this.selectByInput$.next(key);
  }

  @Input()
  public set selectedKeys(keys: TableElementKey<T>[]) {
    this.selectedsInput$.next(keys);
  }

  @Output()
  public selectedKeysChange = new EventEmitter<TableElementKey<T>[]>();

  @ContentChildren(TableColumnDirective)
  public _columns!: QueryList<TableColumnDirective>;

  @ContentChild(TableCheckboxColumnDirective)
  public checkbox?: TableCheckboxColumnDirective;

  @ContentChild(TableExpandableRowDirective)
  public expandable?: TableExpandableRowDirective;

  public get columns() {
    return this.expandable?.columns ?? this._columns;
  }

  public elements$!: Observable<TableElement<T>[]>;
  public expanded$!: Observable<ExpandableState>;

  private readonly dataInput$ = new BehaviorSubject<T[]>([]);
  private readonly selectByInput$ = new BehaviorSubject<keyof T | undefined>(
    undefined
  );
  private readonly selectedsInput$ = new BehaviorSubject<TableElementKey<T>[]>(
    []
  );
  private readonly expandedCommand$ = new BehaviorSubject<ExpandableRow>(
    'none'
  );
  private readonly selectedCommand = new BehaviorSubject<SelectionState<T>>([]);

  constructor() {
    const selecteds$ = this.selectedCommand.pipe(
      withLatestFrom(this.selectedsInput$),
      map(([selecteds, inputs]) =>
        TableSelectionState.difference(inputs, selecteds)
      )
    );

    this.elements$ = combineLatest([
      this.dataInput$,
      this.selectByInput$,
      selecteds$,
    ]).pipe(
      filter(([data]) => !!data.length),
      map(([data, key, selecteds]) =>
        new DataTransform(data, selecteds).elements(key)
      ),
      tap((elements) => this.selectionChange(elements))
    );

    this.expanded$ = this.expandedCommand$.pipe(
      scan((state, row) => state.expand(row), ExpandableState.init()),
      shareReplay(1),
      filter(() => !!this.expandable)
    );
  }

  public onExpandRow(row: number): void {
    this.expandedCommand$.next(row);
  }

  public onElementSelected(element: TableElement<T>): void {
    this.selectedCommand.next([element.key]);
  }

  public onSelectAll(event: Event): void {
    const checked = (<HTMLInputElement>event.target).checked;
    this.selectedCommand.next(checked ? 'all' : 'none');
  }

  private selectionChange(elements: TableElement<T>[]): void {
    const selecteds = elements
      .filter((element) => element.selected)
      .map((element) => element.key);
    this.selectedKeysChange.emit(selecteds);
  }
}
