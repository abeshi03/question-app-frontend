import React, {FC, useEffect, useState} from "react";
import styles from "./testTakingPage.module.scss";

type Props = {
  timeLimit: {
    minutes: number;
    seconds: number;
  };
}

export const CountDownTimer: FC<Props> = (props) => {
  const { timeLimit } = props;
  const [seconds, setSeconds] = useState(timeLimit.seconds);
  const [minutes, setMinutes] = useState(timeLimit.minutes);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return (
    <div className={styles.timer}>
      <span>残り時間</span>
      <span className={styles.accentColor}>{minutes}分{seconds}秒</span>
    </div>
  )
}
