import { TestQuestion } from "../../../businessRules/TestQuestion";

export type TestTakeResponse = {
  id: number;
  name: string,
  timeLimit: number;
  numberOfQuestions: number;
  testPassingScore: number;
  questions: Omit<TestQuestion, "answer">[];
}
