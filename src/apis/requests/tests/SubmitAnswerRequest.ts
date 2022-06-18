import { QuestionType } from "../../../businessRules/TestQuestion";

type Answer = {
  questionId: number;
  type: QuestionType;
  payload: number | number[];
}


export type SubmitAnswerRequest = {
  testId: string;
  answers: Answer[];
}
