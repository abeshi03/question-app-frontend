import { TestQuestion } from "../../../businessRules/TestQuestion";

export type TestTakeResponse = {
  id: number;
  name: string,
  timeLimit: {
    minutes: number;
    seconds: number;
  };
  numberOfQuestions: number;
  testPassingScore: number;
  questions: Omit<TestQuestion, "answer">[];
}
