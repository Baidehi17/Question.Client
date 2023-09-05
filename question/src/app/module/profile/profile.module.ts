import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class ProfileModule { }
