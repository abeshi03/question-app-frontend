/* --- libs ---------------------------------------------------------------------------------------------------------- */
import React from "react";
import { FieldError } from "react-hook-form";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { ErrorMessage } from "../components/atoms/ErrorMessage/ErrorMessage";



export const testTakeValidations = {

  numberInputting: {
    required: true
  },
  singleOption: {
    required: true
  },
  singleOrMultipleOptions: {
    required: true
  }
};


/* --- error message ------------------------------------------------------------------------------------------------- */
export const numberInputtingErrorMessages = (error?: FieldError) => {
  if (!error) return;

  switch (error.type) {
    case "required":
      return <ErrorMessage message="こちらの回答は必須です" />
  }
};

export const singleOptionErrorMessage = (error?: FieldError) => {
  if (!error) return;

  switch (error.type) {
    case "required":
      return <ErrorMessage message="回答を選択してください" />
  }
}
