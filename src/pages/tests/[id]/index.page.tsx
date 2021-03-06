/* --- lib ---------------------------------------------------------------------------------------------------------- */
import React, { useCallback, useState } from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { QuestionType, questionType, TestQuestionOption } from "../../../businessRules/TestQuestion";

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
import {
  Answer,
  TestInputValues,
  TestStep,
  testStep
} from "./pageSettings"

/* --- validations --------------------------------------------------------------------------------------------------- */
import {
  numberInputtingErrorMessages,
  testTakeValidations,
  singleOptionErrorMessage,
  singleOrMultipleOptionsErrorMessage
} from "../../../validations/testTakeValidations";

/* --- utility ------------------------------------------------------------------------------------------------------- */
import { scrollToTop } from "../../../utility/scrollToTop";
import { isNotUndefined } from "../../../utility/typeGuard/isNotUndefined";


const TestTakingPage: NextPage = () => {

  const router = useRouter();

  /* --- ???????????? ----------------------------------------------------------------------------------------------------- */
  const formattedTimeLimit = (timeLimit: { minutes: number; seconds: number; }) => {
    if (timeLimit.seconds === 0 && timeLimit.minutes === 0) {
      return `${timeLimit.minutes}???`;
    }
    if (timeLimit.minutes === 0) return `${timeLimit.seconds}???`;
    if (timeLimit.seconds === 0) return `${timeLimit.minutes}???`;
    return `${timeLimit.minutes}???${timeLimit.seconds}???`;
  }

  /* --- ???????????? ----------------------------------------------------------------------------------------------------- */
  const { register, handleSubmit, formState: { errors } } = useForm<TestInputValues>();
  const [ activeStep, setActiveStep ] = useState<TestStep>(testStep.guidance);


  /*???-- ??????????????????  ------------------------------------------------------------------------------------------------- */
  const testId = router.query.id ? String(router.query.id) : null;
  const { data: test, error } = useSWR<TestTakeResponse>(testId, testApi.testTake);
  const isLoading = !test && !error;

  const goToQuestionStep = useCallback(() => {
    setActiveStep(testStep.questions);
    scrollToTop();
  },[])

  /*???-- ????????????  ---------------------------------------------------------------------------------------------------- */
  const [ answers, setAnswers ] = useState<Answer[]>([]);

  const savedAnswers: SubmitHandler<TestInputValues> = async (inputValue): Promise<void> => {
    try {
      setAnswers(inputValue.answers);
      setActiveStep(testStep.selfCheck);
      scrollToTop();
    } catch (error: unknown) {

      console.log(error);
      alert("????????????????????????????????????");
    }
  }

  /*???-- ????????????  ---------------------------------------------------------------------------------------------------- */
  const getAnswerOptionText = (answerOptionId: string, options?: TestQuestionOption[]) => {
    if (!options) return undefined;

    return options.find((option) => {
      return option.id === Number(answerOptionId)
    })?.text
  }

  const returnToQuestionStep = useCallback(() => {
    setActiveStep(testStep.questions)
    scrollToTop();
  }, []);

  const [isPassed, setIsPassed] = useState(false);

  const getQuestionType = (
    numberAnswer?: number,
    optionAnswerId?: string,
    optionAnswerIds?: string[]
  ): QuestionType => {
    if (isNotUndefined(numberAnswer)) return "NUMBER_INPUTTING";
    if (isNotUndefined(optionAnswerId)) return "SINGLE_OPTION";
    if (isNotUndefined(optionAnswerIds)) return "SINGLE_OR_MULTIPLE_OPTIONS";
    throw new error;
  }

  const getQuestionAnswer = (
    numberAnswer?: number,
    optionAnswerId?: string,
    optionAnswerIds?: string[]
  ) => {
    if (isNotUndefined(numberAnswer)) return String(numberAnswer);
    if (isNotUndefined(optionAnswerId)) return optionAnswerId;
    if (isNotUndefined(optionAnswerIds)) return optionAnswerIds;
    throw new error;
  }

  const submitTestData = async (): Promise<void> => {

    if (!testId || !test) {
      console.log("nothing testId or test")
      return;
    }

    try {
      const isPassed: boolean = (await testApi.submitAnswer({
        testId,
        answers: answers.map((answer, index) => ({
          questionId: test.questions[index].id,
          payload: getQuestionAnswer(answer.numberAnswer, answer.optionAnswerId, answer.optionAnswerIds),
          type: getQuestionType(answer.numberAnswer, answer.optionAnswerId, answer.optionAnswerIds)
        }))
      })).isPassed;
      setIsPassed(isPassed);
      setActiveStep(testStep.result);
    } catch (error: unknown) {

      console.log(error);
      alert("???????????????")
    }
  }

  return (
    <div className={styles.testTakingPage}>
      {isLoading && <p>??????????????????</p>}
      {error && <p>?????????</p>}
      {test &&
        <>
          {/*?????????????????? --------------------------------------------------------------------------- */}
          {activeStep == testStep.guidance &&
            <div className={styles.guidanceStep}>
              <h2 className={styles.testName}>{test.name}</h2>
              <p className={styles.numberOfQuestions}>?????????: {test.numberOfQuestions}</p>
              <p className={styles.timeLimit}>????????????: {formattedTimeLimit(test.timeLimit)}</p>
              <div className={styles.testPassingScore}>
                <span>????????????: </span>
                <span className={styles.accentColor}>{test.testPassingScore}???</span>
                <span>???????????????</span>
              </div>
              <Button
                className={styles.startButton}
                color="YELLOW"
                size="BIG"
                onClick={goToQuestionStep}
              >????????????</Button>
            </div>
          }

          {/* ???????????? --------------------------------------------------------------------------- */}
          {activeStep === testStep.questions &&
            <div className={styles.questionsStep}>
              <CountDownTimer timeLimit={test.timeLimit}/>
              <form className={styles.questionsForm} onSubmit={handleSubmit(savedAnswers)} id="questionForm">
                {test.questions.map((question, index) => (
                  <div className={styles.questionBox} key={question.id}>

                    <div>
                      <span className={styles.questionNumber}>Q{index + 1}</span>
                    </div>

                    <div>
                      {/*????????????* ----------------------------------------------------------------- */}
                      <span className={styles.questionText}>{question.text}</span>
                        {question.type === questionType.numberInputting &&
                          <>
                            <InputField
                              className={styles.inputField}
                              type="number"
                              required={false}
                              guidance="?????????????????????????????????"
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
                      {/* ???????????? * ----------------------------------------------------------------- */}
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

                      {/* ???????????? --------------------------------------------------------------------*/}
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
                            singleOrMultipleOptionsErrorMessage(errors.answers[index].optionAnswerIds)
                          }
                        </div>
                      }
                    </div>
                  </div>
                ))}
                <Button color="YELLOW" size="BIG" type="submit">???????????????</Button>
              </form>
            </div>
          }
          {/* ???????????? --------------------------------------------------------------------------- */}
          {activeStep == testStep.selfCheck &&
            <div className={styles.selfCheckStep}>
              <h2 className={styles.checkHeading}>??????</h2>
              <div className={styles.checkQuestionsFlow}>
                {test.questions.map((question, index) => (
                  <div className={styles.answerCard} key={question.id}>
                    <span className={styles.questionNumber}>Q{index + 1}</span>
                    <span className={styles.questionText}>{question.text}</span>

                    {question.type === questionType.numberInputting &&
                      <p className={styles.answer}>{answers[index].numberAnswer}</p>
                    }

                    {question.type === questionType.singleOption && question.options && answers[index].optionAnswerId &&
                      <p
                        className={styles.answer}
                      >{getAnswerOptionText(String(answers[index].optionAnswerId), question.options)}</p>
                    }

                    { question.type === questionType.singleOrMultipleOptions &&
                      question.options &&
                      answers[index].optionAnswerIds &&
                      answers[index].optionAnswerIds?.map((optionId) => (
                        <p className={styles.answer} key={optionId}>{getAnswerOptionText(optionId, question.options)}</p>
                      ))
                    }
                  </div>
                ))}
                <div className={styles.buttonGroup}>
                  <Button color="WHITE" size="BIG" onClick={returnToQuestionStep}>??????</Button>
                  <Button color="YELLOW" size="BIG" onClick={submitTestData}>???????????????</Button>
                </div>
              </div>
            </div>
          }

          {/* ???????????? --------------------------------------------------------------------------- */}
          {activeStep == testStep.result &&
            <div className={styles.resultStep}>
              <h2>???????????????</h2>
              <p>{ isPassed ? "??????" : "?????????" }</p>
            </div>
          }
        </>
      }
    </div>
  )
}

export default TestTakingPage;




