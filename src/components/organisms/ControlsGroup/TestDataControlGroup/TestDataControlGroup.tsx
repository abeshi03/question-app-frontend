/* --- libs ---------------------------------------------------------------------------------------------------------- */
import React, { FC } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./TestDataControlGroup.module.scss";
import { UnpackNestedValue, useForm } from "react-hook-form";

/* --- pageSettings --------------------------------------------------------------------------------------------------- */
import { TestDataInputValues } from "../../../../pages/tests/add/pageSettings";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";
import { InputField } from "../../../molecules/controlls/InputField/InputField";
import { SelectableCategories } from "../../../molecules/controlls/SelectableCategories/SelectableCategories";

/* --- validations --------------------------------------------------------------------------------------------------- */
import {
  categoriesIdsErrorMessages,
  testDataValidations,
  testNameErrorMessages,
  timeLimitHoursErrorMessages,
  timeLimitSecondsErrorMessages
} from "../../../../validations/testDataValidations";


type Props = {
  className?: string;
  submitFunction: (inputValue: UnpackNestedValue<TestDataInputValues>) => Promise<void>;
}


export const TestDataControlGroup: FC<Props> = (props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<TestDataInputValues>();
  const { className, submitFunction } = props;

  return (
    <form className={`${className} ${styles.testDataControlGroup}`} onSubmit={handleSubmit(submitFunction)}>
      <InputField
        className={styles.input}
        type="text"
        required={testDataValidations.name.required}
        label="ใในใๅ"
        inputProps={register("name", {
          required: testDataValidations.name.required,
          minLength: testDataValidations.name.minLength,
          maxLength: testDataValidations.name.maxLength
        })}
      />
      { errors.name && testNameErrorMessages(errors.name) }

      <InputLabel label="ๅถ้ๆ้" required={true}/>
      <div className={styles.timeLimit}>
        <InputField
          type="number"
          defaultValue={0}
          required={false}
          inputProps={register("timeLimit__hours", {
            required: testDataValidations.timeLimit__hours.required,
            min: testDataValidations.timeLimit__hours.min,
            max: testDataValidations.timeLimit__hours.max
          })}
        />
        <span className={styles.timeLimit__unit}>ๅ</span>

        <InputField
          type="number"
          defaultValue={0}
          required={false}
          inputProps={register("timeLimit__seconds", {
            required: testDataValidations.timeLimit__seconds.required,
            min: testDataValidations.timeLimit__seconds.min,
            max: testDataValidations.timeLimit__seconds.max
          })}
        />
        <spanใclassName={styles.timeLimit__unit}>็ง</span>
      </div>
      { errors.timeLimit__hours && timeLimitHoursErrorMessages(errors.timeLimit__hours) }
      { errors.timeLimit__seconds && timeLimitSecondsErrorMessages(errors.timeLimit__seconds) }

      <>
        <SelectableCategories
          required={testDataValidations.categoriesIds.required}
          errors={errors.categoriesIds}
          inputProps={register("categoriesIds", {
            required: testDataValidations.categoriesIds.required,
            validate: testDataValidations.categoriesIds.checkMaxArrayLength
          })}
        />
        { errors.categoriesIds && categoriesIdsErrorMessages(errors.categoriesIds) }
      </>

      <button className={styles.submitButton} type="submit">้ไฟก</button>
    </form>
  )
}
