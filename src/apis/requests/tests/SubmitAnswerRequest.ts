import { QuestionType } from "../../../businessRules/TestQuestion";

type Answer = {
  questionId: number;
  type: QuestionType;
  payload: string | string[];
}


export type SubmitAnswerRequest = {
  testId: string;
  answers: Answer[];
}
