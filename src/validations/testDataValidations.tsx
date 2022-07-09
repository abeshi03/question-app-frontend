/* --- libs ---------------------------------------------------------------------------------------------------------- */
import React from "react";
import { FieldError } from "react-hook-form";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { ErrorMessage } from "../components/atoms/ErrorMessage/ErrorMessage";


export const testDataValidations = {

  name: {
    required: true,
    minLength: 1,
    maxLength: 60
  },

  timeLimit__hours: {
    required: true,
    min: 0,
    max: 60
  },

  timeLimit__seconds: {
    required: true,
    min: 0,
    max: 60
  },

  categoriesIds: {
    required: true,
    maxArrayLength: 5,
    checkMaxArrayLength: (categoriesIds: number[]) => {
      return categoriesIds.length <= testDataValidations.categoriesIds.maxArrayLength;
    }
  }
};


/* --- error message ------------------------------------------------------------------------------------------------- */
export const testNameErrorMessages = (error?: FieldError) => {
  if (!error) return;

  switch (error.type) {
    case "required":
      return <ErrorMessage message="タイトルは必須です" />

    case "minLength":
      return <ErrorMessage message={`タイトルは${testDataValidations.name.minLength}文字以上で入力してください`} />

    case "maxLength":
      return <ErrorMessage message={`タイトルは${testDataValidations.name.maxLength}文字以下で入力してください`} />
  }
};


export const timeLimitHoursErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="制限時間は必須です" />

    case "min":
      return <ErrorMessage message={`分は${testDataValidations.timeLimit__hours.min}〜${testDataValidations.timeLimit__hours.max}で入力してください`} />

    case "max":
      return <ErrorMessage message={`分は${testDataValidations.timeLimit__hours.min}〜${testDataValidations.timeLimit__hours.max}で入力してください`} />
  }
};

export const timeLimitSecondsErrorMessages = (error?: FieldError) => {
  if (!error) return;

  switch (error.type) {
    case "required":
      return <ErrorMessage message="制限時間は必須です" />

    case "min":
      return <ErrorMessage message={`秒は${testDataValidations.timeLimit__seconds.min}〜${testDataValidations.timeLimit__seconds.max}で入力してください`} />

    case "max":
      return <ErrorMessage message={`秒は${testDataValidations.timeLimit__seconds.min}〜${testDataValidations.timeLimit__seconds.max}で入力してください`} />
  }
};

export const categoriesIdsErrorMessages = (errors?: FieldError[] | FieldError) => {
  if (!errors) return;

  if (Array.isArray(errors)) return;

  switch (errors.type) {
    case "required":
      return <ErrorMessage message="カテゴリーは必須です" />

    case "validate":
      return <ErrorMessage message={`カテゴリーは${testDataValidations.categoriesIds.maxArrayLength}つ以下で選択してください`}  />
  }
};
