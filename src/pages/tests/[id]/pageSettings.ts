export const testStep = {
  guidance: "GUIDANCE",
  questions: "QUESTIONS",
  selfCheck: "SELF_CHECK",
  result: "RESULT",
} as const;

export type TestStep = typeof testStep[keyof typeof testStep];
