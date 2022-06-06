/* --- lib ----------------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../businessRules/Test";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { TestApiImpl } from "./implements/TestApiImpl";
import { Endpoint } from "./endpoints";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "./responses/ApiResponse";
import { TestTakeResponse } from "./responses/tests/TestTakeResponse";


class TestApi implements TestApiImpl {
  public async findList(): Promise<Test[]> {
    const response: ApiResponse<Test[]> = await axios.get(Endpoint.Test.findList);
    return response.data.data;
  }

  public async testTake(testId: number): Promise<TestTakeResponse> {
    const response: ApiResponse<TestTakeResponse> = await axios.get(Endpoint.Test.take(testId));
    return response.data.data;
  }
}

export const testApi = new TestApi();
