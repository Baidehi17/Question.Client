import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionDetails } from 'src/app/model/QuestionDetails';
import { LoadDataService } from 'src/app/service/load-data.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionFormComponent } from 'src/app/shared/question-form/question-form.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  @ViewChild('popupTemplate') popupTemplate: any;

  id!: number;
  screenWidth!: number;
  sidebarVisible: boolean = false;
  questionDetails: QuestionDetails[] = [];
  closeResult: string = '';

  constructor(private questionService: QuestionService, private modalService: NgbModal) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.onload();
    LoadDataService.reloadData.subscribe(res => {
      this.onload();
    })
  }
  onload() {
    this.questionService.getQuestionDetials().subscribe(res => {
      this.questionDetails = res;
    })
  }

  addQuestionPaper() {
    this.id = 0;
    this.modalService.open(QuestionFormComponent);
  }

  editQuestionDetail(question: QuestionDetails) {
    if (question.id != 0) {
      this.id = question.id;
    }
    this.modalService.open(this.popupTemplate);
  }

  close() {
    this.modalService.dismissAll();
  }

  delete(question: QuestionDetails) {
    if (question.id != 0) {
      this.id = question.id;
    }
    this.modalService.open(this.popupTemplate);
  }
}
