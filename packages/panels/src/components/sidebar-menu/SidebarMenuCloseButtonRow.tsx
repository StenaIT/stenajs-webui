import * as React from "react";
import styles from "./SidebarMenuCloseButtonRow.module.css";
import { ButtonElementProps, Column, Row, Space } from "@stenajs-webui/core";
import { CloseButton } from "@stenajs-webui/elements";
import stenaFlag from "@stenajs-webui/elements/src/icons/StenaFlag.svg";

import { cssColor } from "@stenajs-webui/theme";

export interface SidebarMenuCloseButtonRowProps extends ButtonElementProps {}

export const SidebarMenuCloseButtonRow: React.FC<
  SidebarMenuCloseButtonRowProps
> = ({ onClick }) => {
  return (
    <Column background={cssColor("--lhds-color-ui-50")}>
      <Space />
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        flex={1}
        indent={1}
        minHeight={"48px"}
      >
        <CloseButton onClick={onClick} />
        <img src={stenaFlag} className={styles.stenaFlag} />
      </Row>
    </Column>
  );
};
