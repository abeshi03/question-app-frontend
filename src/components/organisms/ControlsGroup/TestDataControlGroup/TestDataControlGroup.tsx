/* --- libs ---------------------------------------------------------------------------------------------------------- */
import { FC } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./TestDataControlGroup.module.scss";
import { UnpackNestedValue, useForm } from "react-hook-form";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { InputField } from "../../../molecules/controlls/InputField/InputField";
import { TestDataInputValues } from "../../../../pages/tests/add/pageSettings";

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
        type="text"
        required={true}
        label="テスト名"
        inputProps={register("name", {
          required: true,
          minLength: 1,
          maxLength: 60
        })}
      />
      { errors.name && <p>エラーだと</p> }
      <button　type="submit">送信</button>
    </form>
  )
}
