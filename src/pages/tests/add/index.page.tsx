/* --- libs ---------------------------------------------------------------------------------------------------------- */
import type { NextPage } from "next";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

/* --- pageSettings -------------------------------------------------------------------------------------------------- */
import { TestDataInputValues } from "./pageSettings";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./TestAddingPage.module.scss";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { TestDataControlGroup } from "../../../components/organisms/ControlsGroup/TestDataControlGroup/TestDataControlGroup";

const TestAddingPage: NextPage = () => {

  const submit: SubmitHandler<TestDataInputValues> = useCallback( async (inputValues) => {
    console.log(inputValues)
    // console.log(Number(inputValues.timeLimit__hours) * 60 + Number(inputValues.timeLimit__seconds))
  }, [])

  return (
    <div className={styles.testAddingPage}>
      <h1 className={styles.heading}>テスト追加</h1>
      <TestDataControlGroup
         className={styles.testDataControlGroup}
         submitFunction={submit}
      />
    </div>
  )
}

export default TestAddingPage;
