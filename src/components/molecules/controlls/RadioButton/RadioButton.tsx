/* --- libs --------------------------------------------------------------------------------------------------------- */
import React, { memo, FC } from "react";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./RadioButton.module.scss";

type RadioButton = {
  id: string | number;
  label: string;
  value: string | number;
  className?: string;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}

export const RadioButton: FC<RadioButton> = memo((props) => {
  const { id, label, value, inputProps, className } = props;
  return (
    <>
      <label htmlFor={`${id}`} className={styles.label}>
        <input
          { ...inputProps }
          id={`${id}`}
          className={`${className} ${styles.radioButton}`}
          type="radio"
          value={value}
        />
        <span className={styles.outside}>
          <span className={styles.inside}></span>
        </span>{label}
      </label>
      {/*<label htmlFor={`${id}`} className={styles.radioButton}>*/}
      {/*  <input*/}
      {/*    { ...inputProps }*/}
      {/*    id={`${id}`}*/}
      {/*    className={`${className} ${styles.radioButton}`}*/}
      {/*    type="radio"*/}
      {/*    value={value}*/}
      {/*  />*/}
      {/*  <span>{label}</span>*/}
      {/*</label>*/}
    </>
  );
});
