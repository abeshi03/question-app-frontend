import type {NextPage} from "next";
import React from "react";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";

type Tests = {
  questions: {
    answerNumber?: number;
    answerString?: string;
  }[]
}

const array = [
  {
    answerNumber: 5,
    answerString: "ほげ"
  },
  {
    answerNumber: 6,
    answerString: "ふげ"
  },
  {
    answerNumber: 2,
    answerString: "げ"
  },
]

const FormPage: NextPage = () => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<Tests>({
    defaultValues: {
      questions: array.map((test) => ({
        answerString: test.answerString,
        answerNumber: test.answerNumber
      }))
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questions",
  });
  const testSubmit: SubmitHandler<Tests> = async (inputValue): Promise<void> => {
    console.log(inputValue.questions);
  }

  return (
    <>
      <h1>フォーム</h1>
      <form onSubmit={handleSubmit(testSubmit)}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <input
              {...register(`questions.${index}.answerNumber` as const)}
            />
            <input
              {...register(`questions.${index}.answerString` as const)}
            />
          </React.Fragment>
        ))}
        <button type="submit">ボタン</button>
      </form>
    </>
  )
}

export default FormPage;
