import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableCheckboxColumnDirective } from './table/directives/table-checkbox-column.directive';
import { TableColumnDirective } from './table/directives/table-column.directive';
import { TableElementDirective } from './table/directives/table-element.directive';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableColumnDirective,
    TableCheckboxColumnDirective,
    TableElementDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
