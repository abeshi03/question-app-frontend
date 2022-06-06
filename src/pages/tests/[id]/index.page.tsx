/* --- lib ---------------------------------------------------------------------------------------------------------- */
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

/* --- asset --------------------------------------------------------------------------------------------------------- */
import styles from "./testTakingPage.module.scss";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { testApi } from "../../../apis/TestApi";
import { Endpoint } from "../../../apis/endpoints";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestTakeResponse } from "../../../apis/responses/tests/TestTakeResponse";

/* --- component ----------------------------------------------------------------------------------------------------- */
import { Button } from "../../../components/atoms/Button/Button";
import { CountDownTimer } from "./CountDownTimer";

/* --- pageSettings -------------------------------------------------------------------------------------------------- */
import { TestStep, testStep } from "./pageSettings"

const TestTakingPage: React.FC = () => {

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<TestStep>(testStep.guidance);

  const goToQuestionStep = useCallback(() => {
    setActiveStep(testStep.questions);
  },[])

  /* --- テストデータ取得 ---------------------------------------------------------------------------------------------- */
  const testId = parseInt(router.query.id as string, 10);
  const url = testId ? Endpoint.Test.take(testId) : null;
  const { data: test, error } = useSWR<TestTakeResponse>(url, testApi.testTake);
  const isLoading = !test && !error;

  /* --- タイマー ----------------------------------------------------------------------------------------------------- */
  const formattedTimeLimit = (timeLimit: { minutes: number; seconds: number; }) => {
    if (timeLimit.seconds === 0 && timeLimit.minutes === 0) {
      return `${timeLimit.minutes}分`;
    }
    if (timeLimit.minutes === 0) return `${timeLimit.seconds}秒`;
    if (timeLimit.seconds === 0) return `${timeLimit.minutes}分`;
    return `${timeLimit.minutes}分${timeLimit.seconds}秒`;
  }

  return (
    <div className={styles.testTakingPage}>
      {isLoading && <p>ローディング</p>}
      {error && <p>エラー</p>}
      {test &&
        <>
          {activeStep === testStep.guidance &&
            <div className={styles.guidanceStep}>
              <h2 className={styles.testName}>{test.name}</h2>
              <p className={styles.numberOfQuestions}>問題数: {test.numberOfQuestions}</p>
              <p className={styles.timeLimit}>制限時間: {formattedTimeLimit(test.timeLimit)}</p>
              <div className={styles.testPassingScore}>
                <span>合格基準: </span>
                <span className={styles.accentColor}>{test.testPassingScore}問</span>
                <span>正解で合格</span>
              </div>
              <Button
                className={styles.startButton}
                color="YELLOW"
                size="BIG"
                onClick={goToQuestionStep}
              >スタート</Button>
            </div>
          }

          {activeStep === testStep.questions &&
            <div className={styles.questionsStep}>
              <CountDownTimer timeLimit={test.timeLimit}/>
            </div>
          }
        </>
      }
    </div>
  )
}

export default TestTakingPage;

