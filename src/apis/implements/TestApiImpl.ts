/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../../businessRules/Test";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestTakeResponse } from "../responses/tests/TestTakeResponse";

export interface TestApiImpl {
  findList: () => Promise<Test[]>;

  /**
   * 本来はtestIdを引数に取る
   * @param testId
   */
  testTake: (endpoint: string) => Promise<TestTakeResponse>;
}
