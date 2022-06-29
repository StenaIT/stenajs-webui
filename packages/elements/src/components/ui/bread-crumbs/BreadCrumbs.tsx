import { Indent, Row } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { Children, ReactNode } from "react";
import { stenaArrowRight } from "../../../icons/ui/IconsUi";
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
                    icon={stenaArrowRight}
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
