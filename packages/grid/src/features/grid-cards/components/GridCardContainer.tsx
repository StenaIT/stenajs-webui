import * as React from "react";
import styles from "./GridCardContainer.module.css";
import { Card, CardBody, CardHeader } from "@stenajs-webui/elements";
import { Heading, Space } from "@stenajs-webui/core";

export interface GridCardContainerProps {
  //   top?: ReactNode;
  //   width?: BoxProps["width"];
  //   variant?: ActionMenuVariant;
  //   shadow?: BoxProps["shadow"];
  //   trapFocus?: boolean;
  //   children?: ReactNode;
}

export const GridCardContainer: React.FC<GridCardContainerProps> = (
  {
    //   top,
    //   children,
    //   width,
    //   shadow,
    //   variant = "standard",
    //   trapFocus,
  }
) => {
  return (
    <div className={styles.standard}>
      <Card>
      <CardHeader text={"Overview"} />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <span>Lorem ipsavablasfasofofa</span>
      </CardBody>
    </Card>
    </div>
  );
};
