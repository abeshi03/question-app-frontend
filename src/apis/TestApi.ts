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

  /**
   * 本来はtestIdを引数に取る
   * @param testId
   */
  public async testTake(endpoint: string): Promise<TestTakeResponse> {
    const response: ApiResponse<TestTakeResponse> = await axios.get(endpoint);
    return response.data.data;
  }
}

export const testApi = new TestApi();
