/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../businessRules/Test";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { TestApiImpl } from "./implements/TestApiImpl";
import { Endpoint } from "./endpoints";

/* --- type --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "./responses/ApiResponse";
import axios from "axios";


class TestApi implements TestApiImpl {
  public async findList(): Promise<Test[]> {
    const response: ApiResponse<Test[]> = await axios.get(Endpoint.Test.findList);
    return response.data.data;
  }
}

export const testApi = new TestApi();
