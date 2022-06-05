import { Test } from "../../businessRules/Test";

export interface TestApiImpl {
  findList: () => Promise<Test[]>;
}
