import { Indent, Row } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { Children, ReactNode } from "react";
import { StenaArrowRight } from "../../../icons/ui/Icons-ui";
import { Icon } from "../icon/Icon";

export interface BreadCrumbsProps {
  children?: ReactNode;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ children }) => {
  return (
    <Row alignItems={"center"}>
      {Children.map(children, (child, index) => (
        <>
          {child && (
            <>
              {index > 0 && (
                <Indent num={2}>
                  <Icon
                    icon={StenaArrowRight}
                    size={8}
                    color={cssColor("--lhds-color-ui-700")}
                  />
                </Indent>
              )}
              {child}
            </>
          )}
        </>
      ))}
    </Row>
  );
};
