/* --- libs ------------------------------------------------------------------------------------------------------ */
import React, { memo, FC } from "react";
import useSWR from "swr";

/* --- businessRules ------------------------------------------------------------------------------------------------- */
import { Category } from "../../../../businessRules/Category";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./SelectableCategories.module.scss";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";

/* --- apis ---------------------------------------------------------------------------------------------------------- */
import { categoryApi } from "../../../../apis/CategoryApi";
import { Endpoint } from "../../../../apis/endpoints";


type Props = {
  required: boolean;
  className?: string;
  guidance?: string
  defaultChecked?: boolean;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}

export const SelectableCategories: FC<Props> = memo((props) => {

  const {
    required,
    className,
    defaultChecked = false,
    inputProps,
  } = props;

  /* --- カテゴリー一覧取得 ---------------------------------------------------------------------------------------------- */
  const { data: categories, error } = useSWR<Category[]>(Endpoint.Category.findList, categoryApi.findList);
  const isLoading = !categories && !error;
  const isError = error;
  const isNoCategories = categories && categories.length === 0;


  return (
    <div className={`${className} ${styles.selectableCategories}`}>
      <InputLabel label="カテゴリー" required={required} />
      {isLoading && <p>ローディング</p>}
      {isError && <p>エラー</p>}
      {isNoCategories && <p>カテゴリーなし</p>}
      {categories &&
        <div className={styles.categoriesFlow}>
          {categories.map((category) => (
            <label htmlFor={String(category.id)} className={styles.checkboxAndLabel} key={category.id}>
              <input
                type="checkbox"
                id={String(category.id)}
                value={category.id}
                defaultChecked={defaultChecked}
                { ...inputProps }
              />
              <span>{ category.name }</span>
            </label>
          ))}
        </div>
      }
    </div>
  );
});
