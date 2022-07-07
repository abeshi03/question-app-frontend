/* --- lib ----------------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Category } from "../businessRules/Category";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { CategoryApiImpl } from "./implements/CategoryApiImpl";
import { Endpoint } from "./endpoints";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "./responses/ApiResponse";


class CategoryApi implements CategoryApiImpl {
  public async findList(): Promise<Category[]> {
    const response: ApiResponse<Category[]> = await axios.get(Endpoint.Category.findList);
    return response.data.data;
  }
}

export const categoryApi = new CategoryApi();
