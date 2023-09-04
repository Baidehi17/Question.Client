import { Component, Input } from '@angular/core';
import { SubQuestions } from 'src/app/model/sub-questions';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() id!: number;
  @Input() questionId!: number;

  subQuestion: SubQuestions[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getsubQuestionDetails();
  }

  getsubQuestionDetails() {
    this.questionService.getSubQuestionDetailsByID(this.id).subscribe(res => {
      this.subQuestion = res;
    })
  }
}
