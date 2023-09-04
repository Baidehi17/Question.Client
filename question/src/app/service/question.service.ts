import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { QuestionDetails } from '../model/QuestionDetails';
import { subQuestions } from '../model/subQuestions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  
  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseApiUrl;

  getQuestionDetials(): Observable<QuestionDetails[]> {
    return this.http.get<QuestionDetails[]>(`${this.baseUrl}question/getall`);
  }

  getSubQuestionDetailsByID(id: number): Observable<subQuestions[]> {
    return this.http.get<subQuestions[]>(`${this.baseUrl}subquestion/getbyid?id=${id}`);
  }

  getQuestionDetailsByID(id: number): Observable<QuestionDetails> {
    return this.http.get<QuestionDetails>(`${this.baseUrl}question/getbyid?id=${id}`);
  }

  updateQuestion(question: QuestionDetails): Observable<QuestionDetails> {
    return this.http.put<QuestionDetails>(`${this.baseUrl}question/updatequestion`, question)
  }
  updateSubQuestion(subQuest: subQuestions): Observable<subQuestions> {
    return this.http.put<subQuestions>(`${this.baseUrl}subquestion/updatesubques`, subQuest)
  }

  deleteQuest(id: number): Observable<QuestionDetails> {
    return this.http.delete<QuestionDetails>(`${this.baseUrl}question/deletebyid?id=${id}`)
  }

  deletesubQuest(id: number): Observable<subQuestions> {
    return this.http.delete<subQuestions>(`${this.baseUrl}subquestion/deletesubques?id=${id}`)
  }

  deleteSubById(id: number): Observable<subQuestions> {
    return this.http.delete<subQuestions>(`${this.baseUrl}subquestion/deletebyid?id=${id}`)
  }

  addquestion(quest: any): Observable<QuestionDetails> {
    return this.http.post<QuestionDetails>(`${this.baseUrl}question/addquestion`, quest)
  }

  addSubquestion(quest: any): Observable<subQuestions> {
    return this.http.post<subQuestions>(`${this.baseUrl}subquestion/addsubques`, quest)
  }
}
