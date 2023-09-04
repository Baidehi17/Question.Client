export class subQuestions {
    id: number
    subQuestionName: string
    numberOfQuestion: number;
    timeLimit: number;
    questionDetails_id: number;

    constructor(id: number = 0, subQuestionName: string = "", numberOfQuestion: number = 0, timeLimit: number = 0, questionDetails_id: number = 0) {
        this.id = id;
        this.subQuestionName = subQuestionName;
        this.numberOfQuestion = numberOfQuestion;
        this.timeLimit = timeLimit;
        this.questionDetails_id = questionDetails_id;
    }
}