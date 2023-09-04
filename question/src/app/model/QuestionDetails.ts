export class QuestionDetails {
    id: number;
    questionType: string;
    description: string;

    constructor(id: number = 0, questionType: string = '', description: string = '') {
        this.id = id;
        this.questionType = questionType;
        this.description = description;
    }
}
