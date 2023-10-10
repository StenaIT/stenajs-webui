import * as React from "react";
import styles from "./SidebarMenuCloseButtonRow.module.css";
import { ButtonElementProps, Column, Row, Space } from "@stenajs-webui/core";
import { FlatButton, StenaFlag, stenaTimes } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";

export interface SidebarMenuCloseButtonRowProps extends ButtonElementProps {}

export const SidebarMenuCloseButtonRow: React.FC<
  SidebarMenuCloseButtonRowProps
> = ({ onClick }) => {
  return (
    <Column
      top={0}
      position={"sticky"}
      background={cssColor("--lhds-color-ui-50")}
    >
      <Space />
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        flex={1}
        indent={1}
        minHeight={"48px"}
      >
        <FlatButton
          leftIcon={stenaTimes}
          onClick={onClick}
          variant={"danger"}
        />
        <StenaFlag className={styles.stenaFlag} />
      </Row>
    </Column>
  );
};
