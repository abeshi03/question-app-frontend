/* --- libs ---------------------------------------------------------------------------------------------------------- */
import { FC } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./TestDataControlGroup.module.scss";
import { UnpackNestedValue, useForm } from "react-hook-form";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { InputField } from "../../../molecules/controlls/InputField/InputField";
import { TestDataInputValues } from "../../../../pages/tests/add/pageSettings";

/* --- validations --------------------------------------------------------------------------------------------------- */
import {
  testDataValidations,
  testNameErrorMessages,
  timeLimitHoursErrorMessages, timeLimitSecondsErrorMessages
} from "../../../../validations/testDataValidations";

type Props = {
  className?: string;
  submitFunction: (inputValue: UnpackNestedValue<TestDataInputValues>) => Promise<void>;
}


export const TestDataControlGroup: FC<Props> = (props) => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<TestDataInputValues>();
  const { className, submitFunction } = props;

  return (
    <form className={`${className} ${styles.testDataControlGroup}`} onSubmit={handleSubmit(submitFunction)}>
      <InputField
        className={styles.input}
        type="text"
        required={testDataValidations.name.required}
        label="テスト名"
        inputProps={register("name", {
          required: testDataValidations.name.required,
          minLength: testDataValidations.name.minLength,
          maxLength: testDataValidations.name.maxLength
        })}
      />
      { errors.name && testNameErrorMessages(errors.name) }

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
        <span className={styles.timeLimit__unit}>分</span>

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
        <span　className={styles.timeLimit__unit}>秒</span>
      </div>
      { errors.timeLimit__hours && timeLimitHoursErrorMessages(errors.timeLimit__hours) }
      { errors.timeLimit__seconds && timeLimitSecondsErrorMessages(errors.timeLimit__seconds) }

      <button className={styles.submitButton} type="submit">送信</button>
    </form>
  )
}
