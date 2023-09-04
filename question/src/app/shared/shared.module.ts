import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from './question-form/question-form.component';

import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports:[
    QuestionFormComponent
  ]
})
export class SharedModule { }
