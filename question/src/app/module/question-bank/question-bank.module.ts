import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list/question-list.component';
import { CardComponent } from './question-list/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    QuestionListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
  ]
})
export class QuestionBankModule { }
