/* --- lib ---------------------------------------------------------------------------------------------------------- */
import React, { memo, FC, ReactNode } from "react";
import Link from "next/link";

/* --- asset --------------------------------------------------------------------------------------------------------- */
import styles from "./button.module.scss";

/* --- type ---------------------------------------------------------------------------------------------------------- */
import { UrlObject } from "url";

type Props = {
  className?: string;
  color: "YELLOW" | "WHITE";
  size: "SMALL" | "BIG";
  path?: string | UrlObject;
  type?: "submit"
  children: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}


export const Button: FC<Props> = memo((props) => {
  const { className, color, path, children, size, style, onClick, type } = props;

  const ButtonColorModifierCSS_Class = (): string => {
    switch (color) {
      case "YELLOW": return styles.button__skyBlue;
      case "WHITE": return styles.button__white;
    }
  };

  const ButtonSizeModifierCSS_Class = (): string => {
    switch (size) {
      case "SMALL": return styles.small;
      case "BIG": return styles.big;
    }
  };


  return (
    <>
      {type ? (
        <button
          onClick={onClick}
          className={`${ButtonColorModifierCSS_Class()} ${ButtonSizeModifierCSS_Class()} ${styles.button} ${className}`}
          type={type}
        >
          { children }
        </button>
      ) : (
        path ? (
          <Link href={path}>
            <a className={styles.path} style={style}>
              <button
                onClick={onClick}
                className={`${ButtonColorModifierCSS_Class()} ${ButtonSizeModifierCSS_Class()} ${styles.button} ${className}`}
                type={type}
              >
                { children }
              </button>
            </a>
          </Link>
        ) : (
          <button
            onClick={onClick}
            className={`${ButtonColorModifierCSS_Class()} ${ButtonSizeModifierCSS_Class()} ${styles.button} ${className}`}
            type={type}
          >
            { children }
          </button>
        )
      ) }
    </>
  );
});
