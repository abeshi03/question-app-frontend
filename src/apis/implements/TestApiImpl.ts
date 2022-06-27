/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../../businessRules/Test";

/* --- request ------------------------------------------------------------------------------------------------------- */
import { SubmitAnswerRequest } from "../requests/tests/SubmitAnswerRequest";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestTakeResponse } from "../responses/tests/TestTakeResponse";
import { SubmitAnswerResponse } from "../responses/tests/SubmitAnswerResponse";

export interface TestApiImpl {
  findList: () => Promise<Test[]>;

  testTake: (testId: string) => Promise<TestTakeResponse>;

  submitAnswer: (requestBody: SubmitAnswerRequest) => Promise<SubmitAnswerResponse>;
}
