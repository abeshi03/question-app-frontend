/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../../businessRules/Test";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestTakeResponse } from "../responses/tests/TestTakeResponse";

export interface TestApiImpl {
  findList: () => Promise<Test[]>;

  testTake: (testId: string) => Promise<TestTakeResponse>;
}
