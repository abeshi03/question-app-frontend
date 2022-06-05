/* --- lib ----------------------------------------------------------------------------------------------------------- */
import React, { memo, FC } from "react";

/* --- businessRule -------------------------------------------------------------------------------------------------- */
import { Test } from "../../../businessRules/Test";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./TestCard.module.scss";
import noImage from "../../../../public/noImage.png";

type Props = {
  test: Test
}

export const TestCard: FC<Props> = memo((props) => {
  const { test } = props;
  return (
    <div className={styles.testCard}>
      <div
        className={styles.img}
        style={{backgroundImage: `url(${test.thumbnailUri ?? noImage.src})`}}
      >
      </div>
      <div className={styles.name}>テスト名が入ります</div>
      <div className={styles.numberOfQuestions}>問題数: {test.numberOfQuestions}</div>
      <div className={styles.categoriesFlow}>
        {test.categories.map((category) => (
          <div key={category.id} className={styles.categoryBadge}>
            <div className={styles.categoryName}>{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
