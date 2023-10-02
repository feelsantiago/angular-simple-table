import {
  AfterViewInit,
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
  Subject,
  scan,
} from 'rxjs';
import { TableCheckboxColumnDirective } from './directives/table-checkbox-column.directive';
import { TableColumnDirective } from './directives/table-column.directive';
import { TableExpandableRowDirective } from './directives/table-expandable-row.directive';
import { DataTransform } from './domain/data-transform';
import { ExpandableRow, ExpandableState } from './domain/expandable-state';
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
  public set selectedKeys(keys: TableElementKey<T>[]) {}

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

  // public selecteds: Map<TableElementKey<T>, boolean> = new Map();

  public elements$!: Observable<TableElement<T>[]>;
  public expanded$!: Observable<ExpandableState>;

  private readonly dataInput$ = new BehaviorSubject<T[]>([]);
  private readonly selectByInput$ = new BehaviorSubject<TableElementKey<T>>(0);
  private readonly expandedCommand$ = new BehaviorSubject<ExpandableRow>(
    'none'
  );

  constructor() {
    this.elements$ = combineLatest([this.dataInput$, this.selectByInput$]).pipe(
      filter(([data]) => !!data.length),
      map(([data, key]) => new DataTransform(data).elements(key))
    );

    this.expanded$ = this.expandedCommand$.pipe(
      filter(() => !!this.expandable),
      scan((state, row) => state.expand(row), ExpandableState.init())
    );
  }

  public onExpandRow(row: number): void {
    this.expandedCommand$.next(row);
  }

  public selected(element: TableElement<T>, index: number): boolean {
    // const founded = this.selecteds.get(this.key(element, index));
    // return founded ?? false;

    return false;
  }

  public onElementSelected(element: TableElement<T>, index: number): void {
    // if (this.selected(element, index)) {
    //   this.selecteds.delete(this.key(element, index));
    //   this.selectedKeysChange.emit([...this.selecteds.keys()]);
    //   return;
    // }
    //
    // this.selecteds.set(this.key(element, index), true);
    // this.selectedKeysChange.emit([...this.selecteds.keys()]);
  }

  public onSelectAll(event: Event): void {
    // const checked = (<HTMLInputElement>event.target).checked;
    //
    // this.selecteds.clear();
    // this.selectAll(this.data, checked);
    //
    // const selecteds = checked ? [...this.selecteds.keys()] : [];
    // this.selectedKeysChange.emit(selecteds);
  }

  // private key(element: T, index: number): TableElementKey<T> {
  //   return this.selectBy ? element[this.selectBy] : index;
  // }

  // private selectAll(elements: T[], selection: boolean): void {
  //   for (let [index, element] of elements.entries()) {
  //     this.selecteds.set(this.key(element, index), selection);
  //   }
  // }
  //
  // private selectAllByKey(keys: TableElementKey<T>[], selection: boolean): void {
  //   for (let key of keys) {
  //     this.selecteds.set(key, selection);
  //   }
  // }
}
