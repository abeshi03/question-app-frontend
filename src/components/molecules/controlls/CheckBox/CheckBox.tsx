/* --- libs ---------------------------------------------------------------------------------------------------------- */
import React, { memo, FC } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./CheckBox.module.scss";


type Props = {
  label: string
  id: string | number;
  required: boolean;
  value: string | number;
  guidance?: string
  defaultChecked?: boolean;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}


export const Checkbox: FC<Props> = memo((props) => {

  const {
    label,
    id,
    guidance,
    value,
    defaultChecked = false,
    inputProps,
  } = props;


  return (
    <>
      <div className={styles.container}>
        <input
          type="checkbox"
          id={`${id}`}
          value={value}
          defaultChecked={defaultChecked}
          { ...inputProps }
        />
        <label htmlFor={`${id}`}>{ label }</label>
      </div>
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </>
  );
});
