import { Box, Row, SeparatorLine, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { cssColor } from "@stenajs-webui/theme";

export interface PageHeaderProps {
  renderBreadCrumbs?: () => ReactNode;
  renderPageHeading?: () => ReactNode;
  renderTabs?: () => ReactNode;
  children?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  renderBreadCrumbs,
  renderPageHeading,
  renderTabs,
  children,
}) => {
  return (
    <Box shadow={"box"} background={cssColor("--lhds-color-ui-50")} gap={2}>
      <Box indent={3}>
        {renderBreadCrumbs && (
          <Row height={"32px"} alignItems={"center"}>
            <Row width={"64px"} />
            {renderBreadCrumbs()}
          </Row>
        )}
        {renderPageHeading?.()}
        {renderTabs?.()}
      </Box>
      {children && (
        <>
          {!renderTabs && renderBreadCrumbs && <Space />}
          <SeparatorLine />
          {children}
        </>
      )}
    </Box>
  );
};
