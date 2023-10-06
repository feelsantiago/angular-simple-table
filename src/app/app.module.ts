import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableCheckboxColumnDirective } from './table/directives/table-checkbox-column.directive';
import { TableColumnDirective } from './table/directives/table-column.directive';
import { TableElementDirective } from './table/directives/table-element.directive';
import { TableExpandableColumnDirective } from './table/directives/table-expandable-column.directive';
import { TableExpandableContentDirective } from './table/directives/table-expandable-content.directive';
import { TableExpandableRowDirective } from './table/directives/table-expandable-row.directive';
import { TableComponent } from './table/table.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableExpandableRowDirective,
    TableColumnDirective,
    TableCheckboxColumnDirective,
    TableElementDirective,
    TableExpandableContentDirective,
    TableExpandableColumnDirective,
    TestComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
