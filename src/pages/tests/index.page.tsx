/* --- lib ---------------------------------------------------------------------------------------------------------- */
import type { NextPage } from "next";
import useSWR from "swr"

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../../businessRules/Test";
/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./testsListPage.module.scss";

/* --- component ----------------------------------------------------------------------------------------------------- */
import { TestCard } from "../../components/organisms/TestCard/TestCard";

/* --- api ----------------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../../apis/endpoints";
import { testApi } from "../../apis/TestApi";

const TestsListPage: NextPage = () => {

  /* --- テスト一覧取得 ------------------------------------------------------------------------------------------------ */
  const { data: tests, error } = useSWR<Test[]>(Endpoint.Test.findList, testApi.findList);
  const isLoading = !tests && !error;
  const isError = error;
  const isNoTests = tests && tests.length === 0;

  return (
    <div className={styles.testsListPage}>
      <div className={styles.testCardsFlow}>
        {isLoading && <p>ローディング</p>}
        {isError && <p>エラー</p>}
        {isNoTests && <p>テストなし</p>}
        {tests && tests.map((test) => (
          <TestCard key={test.id} test={test}/>
        ))}
      </div>
    </div>
  )
}

export default TestsListPage;
