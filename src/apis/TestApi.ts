/* --- lib ----------------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../businessRules/Test";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { TestApiImpl } from "./implements/TestApiImpl";
import { Endpoint } from "./endpoints";

/* --- request ------------------------------------------------------------------------------------------------------- */
import { SubmitAnswerRequest } from "./requests/tests/SubmitAnswerRequest";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "./responses/ApiResponse";
import { TestTakeResponse } from "./responses/tests/TestTakeResponse";
import { SubmitAnswerResponse } from "./responses/tests/SubmitAnswerResponse";


class TestApi implements TestApiImpl {
  public async findList(): Promise<Test[]> {
    const response: ApiResponse<Test[]> = await axios.get(Endpoint.Test.findList);
    return response.data.data;
  }

  public async testTake(testId: string): Promise<TestTakeResponse> {
    const response: ApiResponse<TestTakeResponse> = await axios.get(Endpoint.Test.take(testId));
    return response.data.data;
  }

  public async submitAnswer(requestBody: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
    const response: ApiResponse<SubmitAnswerResponse> =
      await axios.post(Endpoint.Test.submitAnswer(requestBody.testId), {
        answers: requestBody.answers
      });
    return response.data.data;
  }
}

export const testApi = new TestApi();
