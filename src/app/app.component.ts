import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public data = [
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

  private _selecteds: any[] = ['Supplier 7'];

  set selecteds(value: any[]) {
    this._selecteds = value;
  }

  get selecteds() {
    return this._selecteds;
  }
}
