import { TestQuestion } from "../../../businessRules/TestQuestion";

export type TestDataInputValues = {
  name: string;
  testPassingScore: number;
  timeLimit__hours: number;
  timeLimit__seconds: number;
  categoriesIds: number[];
  questions: Omit<TestQuestion, "id">[];
}
