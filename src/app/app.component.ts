import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

type SingleSupplier = {
  name: string;
  value: number;
  group?: false;
};

type GroupedSupplier = {
  name: string;
  group: true;
  suppliers: SingleSupplier[];
};

type Supplier = SingleSupplier | GroupedSupplier;
type Suppliers = Supplier[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public data: Suppliers = [
    {
      name: 'Supplier 1',
      group: false,
      value: 10,
    },
    {
      name: 'Supplier 2',
      group: false,
      value: 10,
    },
    {
      name: 'Grup 1',
      group: true,
      suppliers: [
        {
          name: 'Supplier 3',
          value: 10,
        },
        {
          name: 'Supplier 4',
          value: 10,
        },
        {
          name: 'Supplier 5',
          value: 10,
        },
        {
          name: 'Supplier 6',
          value: 10,
        },
      ],
    },
    {
      name: 'Supplier 7',
      group: false,
      value: 10,
    },
    {
      name: 'Supplier 8',
      group: false,
      value: 10,
    },
  ];

  public key: keyof Supplier = 'name';

  // private _selecteds: TableElementKey<Supplier>[] = ['Supplier 7'];
  //
  // set selecteds(value: TableElementKey<Supplier>[]) {
  //   this._selecteds = value;
  // }
  //
  // get selecteds() {
  //   return this._selecteds;
  // }

  constructor(private ref: ChangeDetectorRef) {}

  public value(supplier: Supplier): number {
    if (supplier.group) {
      return supplier.suppliers.reduce((acc, next) => acc + next.value, 0);
    }

    return supplier.value;
  }
}
