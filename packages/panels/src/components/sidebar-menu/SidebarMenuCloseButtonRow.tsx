import * as React from "react";
import styles from "./SidebarMenuCloseButtonRow.module.css";
import { ButtonElementProps, Row } from "@stenajs-webui/core";
import { FlatButton, StenaFlag, stenaTimes } from "@stenajs-webui/elements";

export interface SidebarMenuCloseButtonRowProps extends ButtonElementProps {}

export const SidebarMenuCloseButtonRow: React.FC<
  SidebarMenuCloseButtonRowProps
> = ({ onClick }) => {
  return (
    <Row
      justifyContent={"space-between"}
      alignItems={"center"}
      flex={1}
      indent={1}
    >
      <FlatButton leftIcon={stenaTimes} onClick={onClick} variant={"danger"} />
      <StenaFlag className={styles.stenaFlag} />
    </Row>
  );
};
