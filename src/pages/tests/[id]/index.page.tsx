/* --- lib ---------------------------------------------------------------------------------------------------------- */
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

/* --- api ---------------------------------------------------------------------------------------------------------- */
import { testApi } from "../../../apis/TestApi";
import { Endpoint } from "../../../apis/endpoints";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestTakeResponse } from "../../../apis/responses/tests/TestTakeResponse";

const TestTakingPage: React.FC = () => {

  const router = useRouter();

  /* --- テストデータ取得 ---------------------------------------------------------------------------------------------- */
  const testId = parseInt(router.query.id as string, 10);
  const url = testId ? Endpoint.Test.take(testId) : null;
  const { data: test, error } = useSWR<TestTakeResponse>(url, testApi.testTake);
  const isLoading = !test && !error;
  const isError = error;

  return (
    <div>
      {test && <div>{test.numberOfQuestions}</div>}
    </div>
  )
}

export default TestTakingPage;
