export const BASE_URL = "http://localhost:5000";

export namespace Endpoint {
  export namespace Test {

    export const findList = `${BASE_URL}/tests`;

    export function take(testId: string) {
      return `${BASE_URL}/tests/${testId}/take`;
    }

    export function submitAnswer(testId: string) {
      return `${BASE_URL}/tests/${testId}/submit`
    }
  }
}
