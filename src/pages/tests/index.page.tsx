/* --- lib ---------------------------------------------------------------------------------------------------------- */
import type { NextPage } from "next";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./testsListPage.module.scss";

/* --- component ----------------------------------------------------------------------------------------------------- */
import { TestCard } from "../../components/organisms/TestCard/TestCard";

const TestsListPage: NextPage = () => {
  return (
    <div className={styles.testsListPage}>
      <div className={styles.testCardsFlow}>
      </div>
    </div>
  )
}

export default TestsListPage;
