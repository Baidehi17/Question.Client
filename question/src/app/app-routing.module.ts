import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './module/question-bank/question-list/question-list.component';
import { Table } from 'primeng/table';
import { TableComponent } from './module/profile/table/table.component';

const routes: Routes = [
  {path:'', component:TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
