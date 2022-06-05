import { Category } from "./Category";

export type Test = {
  id: number;
  name: string;
  thumbnailUri?: string;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: number;
  categories: Category[]
}
