/* --- lib ---------------------------------------------------------------------------------------------------------- */
import React, { useCallback, useState } from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { questionType } from "../../../businessRules/TestQuestion";

/* --- asset --------------------------------------------------------------------------------------------------------- */
import styles from "./testTakingPage.module.scss";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { testApi } from "../../../apis/TestApi";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestTakeResponse } from "../../../apis/responses/tests/TestTakeResponse";

/* --- component ----------------------------------------------------------------------------------------------------- */
import { Button } from "../../../components/atoms/Button/Button";
import { CountDownTimer } from "./CountDownTimer";
import { InputField } from "../../../components/molecules/controlls/InputField/InputField";
import { RadioButton } from "../../../components/molecules/controlls/RadioButton/RadioButton";
import { Checkbox } from "../../../components/molecules/controlls/CheckBox/CheckBox";

/* --- pageSettings -------------------------------------------------------------------------------------------------- */
import { TestInputValues, TestStep, testStep } from "./pageSettings"

/* --- validations --------------------------------------------------------------------------------------------------- */
import {
  numberInputtingErrorMessages,
  testTakeValidations,
  singleOptionErrorMessage, singleOrMultipleOptionsErrorMessage
} from "../../../validations/testTakeValidations";


const TestTakingPage: NextPage = () => {

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<TestStep>(testStep.guidance);

  const goToQuestionStep = useCallback(() => {
    setActiveStep(testStep.questions);
  },[])

  /* --- テストデータ取得 ---------------------------------------------------------------------------------------------- */
  const testId = router.query.id ? String(router.query.id) : null;
  const { data: test, error } = useSWR<TestTakeResponse>(testId, testApi.testTake);
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

  /* --- フォーム ----------------------------------------------------------------------------------------------------- */
  const { register, handleSubmit, formState: { errors } } = useForm<TestInputValues>();
  const testSubmit: SubmitHandler<TestInputValues> = async (inputValue): Promise<void> => {
    console.log(inputValue.answers);
  }

  return (
    <div className={styles.testTakingPage}>
      {isLoading && <p>ローディング</p>}
      {error && <p>エラー</p>}
      {test &&
        <>
          {/*スタート画面 --------------------------------------------------------------------------- */}
          {activeStep == testStep.guidance &&
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

          {/* 問題画面 --------------------------------------------------------------------------- */}
          {activeStep === testStep.questions &&
            <div className={styles.questionsStep}>
              <CountDownTimer timeLimit={test.timeLimit}/>
              <form className={styles.questionsForm} onSubmit={handleSubmit(testSubmit)}>
                {test.questions.map((question, index) => (
                  <div className={styles.questionBox} key={question.id}>

                    <div>
                      <span className={styles.questionNumber}>Q{index + 1}</span>
                    </div>

                    <div>
                      {/*数字回答* ----------------------------------------------------------------- */}
                      <span className={styles.questionText}>{question.text}</span>
                        {question.type === questionType.numberInputting &&
                          <>
                            <InputField
                              className={styles.inputField}
                              type="number"
                              required={false}
                              guidance="数字で回答してください"
                              inputProps={register(`answers.${index}.numberAnswer`, {
                                required: testTakeValidations.numberInputting.required
                              })}
                            />
                            {
                              errors.answers &&
                              errors.answers[index] &&
                              numberInputtingErrorMessages(errors.answers[index].numberAnswer)
                            }
                          </>
                        }
                      {/* 単数回答 * ----------------------------------------------------------------- */}
                      {question.type === questionType.singleOption &&
                        <div className={styles.radioButtonGroup}>
                          {question.options?.map((option) => (
                            <RadioButton
                              key={option.id}
                              id={option.id}
                              label={option.text}
                              value={option.id}
                              inputProps={register(`answers.${index}.optionAnswerId`, {
                                required: testTakeValidations.singleOption.required
                              })}
                            />
                          ))}
                          {
                            errors.answers &&
                            errors.answers[index] &&
                            singleOptionErrorMessage(errors.answers[index].optionAnswerId)
                          }
                        </div>
                      }

                      {/* 複数回答 --------------------------------------------------------------------*/}
                      {question.type === questionType.singleOrMultipleOptions &&
                        <div className={styles.checkboxesGroup}>
                          {question.options?.map((option) => (
                            <Checkbox
                              key={option.id}
                              id={option.id}
                              label={option.text}
                              required={false}
                              value={option.id}
                              inputProps={register(`answers.${index}.optionAnswerIds`, {
                                required: testTakeValidations.singleOrMultipleOptions.required
                              })}
                            />
                          ))}
                          {
                            errors.answers &&
                            errors.answers[index] &&
                            singleOptionErrorMessage(errors.answers[index].optionAnswerIds)
                          }
                        </div>
                      }
                    </div>
                  </div>
                ))}
                <button type="submit">送信</button>
              </form>
            </div>
          }
        </>
      }
    </div>
  )
}

export default TestTakingPage;




