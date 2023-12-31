import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionDetails } from 'src/app/model/question-details';
import { SubQuestions } from 'src/app/model/sub-questions';
import { LoadDataService } from 'src/app/service/load-data.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {
  @Input() questionId!: number;

  @ViewChild('popup') popup: any;

  subQuestion: SubQuestions[] = [];
  questionDetail!: QuestionDetails;
  form!: FormGroup;
  submitted = false;

  constructor(private questionService: QuestionService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionType: ['', Validators.required],
      description: ['', Validators.required],
      subQuestions: this.fb.array([]) 
    });

    this.onload();
  }

  get subQuestions(): FormArray {
    return this.form.get('subQuestions') as FormArray;
  }

  get f() {
    return this.form.controls;
  }

  getSubQuestionControl(index: number, controlName: string): FormControl {
    return this.subQuestions.controls[index].get(controlName) as FormControl;
  }

  addSubQuestion() {
    this.subQuestions.push(this.fb.group({
      id: [''],
      subQuestionName: ['', Validators.required],
      numberOfQuestion: ['', Validators.required],
      timeLimit: ['', Validators.required]
    }));
  }

  onSubmit(id:number) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      if (id != undefined) {
        this.updateDetails();
      }
      else {
        this.AddDetails();
      }
      this.close();
    }
  }

  close() {
    this.modalService.dismissAll();
  }

  removeSubQuestion(index: number) {
    this.subQuestions.removeAt(index);
  }

  onload() {
    this.questionService.getQuestionDetailsByID(this.questionId).subscribe(res => {
      this.questionDetail = res;
      this.form.patchValue({
        questionType: this.questionDetail.questionType,
        description: this.questionDetail.description
      });
    })
    this.questionService.getSubQuestionDetailsByID(this.questionId).subscribe(res => {
      console.log((res));
      this.subQuestion = res;
      this.populateSubQuestionFormArray();
    });
  }

  populateSubQuestionFormArray() {
    const subQuestionFormGroups = this.subQuestion.map(sq => {
      return this.fb.group({
        id: [sq.id],
        subQuestionName: [sq.subQuestionName],
        numberOfQuestion: [sq.numberOfQuestion],
        timeLimit: [sq.timeLimit]
      });
    });
    this.form.setControl('subQuestions', this.fb.array(subQuestionFormGroups));
  }

  updateDetails() {
    const updatedQuestionDetails = {
      id: this.questionId,
      questionType: this.form.value.questionType,
      description: this.form.value.description
    };
    this.questionService.updateQuestion(updatedQuestionDetails).subscribe(
      () => {
        LoadDataService.reloadData.emit();  },
      (error) => {
        console.log('error');
      }
    );

    const updatedSubQuestions: SubQuestions[] = this.subQuestions.controls.map((subQuestionControl: AbstractControl, index: number) => {
      const subQuestionFormGroup = subQuestionControl as FormGroup;
      return {
        id: subQuestionFormGroup.controls['id'].value,
        subQuestionName: subQuestionFormGroup.controls['subQuestionName'].value,
        numberOfQuestion: subQuestionFormGroup.controls['numberOfQuestion'].value,
        timeLimit: subQuestionFormGroup.controls['timeLimit'].value,
        questionDetailsId: this.questionId
      };
    });

    updatedSubQuestions.forEach((updatedSubQuestion, index) => {
      this.questionService.updateSubQuestion(updatedSubQuestion).subscribe(
        () => {

        },
        (error) => { console.log(error); }
      );
    });
    LoadDataService.reloadData.emit();
  }

  async AddDetails() {
    const updatedQuestionDetails = {
      questionType: this.form.value.questionType,
      description: this.form.value.description
    };
    let response: QuestionDetails | undefined;
    try {
      response = await this.questionService.addquestion(updatedQuestionDetails).toPromise();
    } catch (error) {
      console.log('Error');
    }
    const ADDSubQuestions: any[] = this.subQuestions.controls.map((subQuestionControl: AbstractControl, index: number) => {
      const subQuestionFormGroup = subQuestionControl as FormGroup;
      return {
        subQuestionName: subQuestionFormGroup.controls['subQuestionName'].value,
        numberOfQuestion: subQuestionFormGroup.controls['numberOfQuestion'].value,
        timeLimit: subQuestionFormGroup.controls['timeLimit'].value,
        questionDetailsId: response
      };
    });

    ADDSubQuestions.forEach((ADDSubQuestions, index) => {
      this.questionService.addSubquestion(ADDSubQuestions).subscribe(
        () => {
          LoadDataService.reloadData.emit();
          console.log();
        },
        (error) => {
          console.log(error);
        }
      );
    });
    LoadDataService.reloadData.emit();
  }

  delete() {
    if (this.questionId != undefined) {
      this.questionService.deletesubQuest(this.questionId).subscribe(
        () => {
          this.questionService.deleteQuest(this.questionId).subscribe(
            () => {
              LoadDataService.reloadData.emit();
              this.close();
            },
            (error) => {
              console.log('Error deleting question:', error);
            }
          );
        },
        (error) => {
          console.log('Error deleting sub-question:', error);
        }
      );
    }
  }
}
