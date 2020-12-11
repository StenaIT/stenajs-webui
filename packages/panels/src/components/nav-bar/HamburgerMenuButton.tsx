import * as React from "react";
import cx from "classnames";
import styles from "./HamburgerMenu.module.css";
import { DivProps } from "@stenajs-webui/core";
import { NavBarVariant } from "./NavBar";
import { ClassNames } from "@emotion/core";
import { ReactComponent as HamburgerBarsSvg } from "./hamburger-bars.svg";
import { ReactComponent as HamburgerCloseSvg } from "./hamburger-close.svg";

export interface Props extends Omit<DivProps, "onClick"> {
  variant?: NavBarVariant;
  isOpen?: boolean;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const HamburgerMenuButton: React.FC<Props> = ({
  variant = "standard",
  isOpen = false,
  className,
  style,
  onClick,
  ...divProps
}) => {
  console.log(className);
  return (
    <div
      className={cx(
        styles.hamburgerMenu,
        styles[variant],
        className && styles[className]
      )}
      {...divProps}
    >
      <button onClick={onClick}>
        <ClassNames>
          {() =>
            isOpen ? (
              <HamburgerCloseSvg className={styles.hamburgerBars} />
            ) : (
              <HamburgerBarsSvg className={styles.hamburgerBars} />
            )
          }
        </ClassNames>
      </button>
    </div>
  );
};
