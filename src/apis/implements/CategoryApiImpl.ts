/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Category } from "../../businessRules/Category";

export interface CategoryApiImpl {
  findList: () => Promise<Category[]>;
}
