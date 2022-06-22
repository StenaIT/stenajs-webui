import { Box, Row, SeparatorLine, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

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
    <Box shadow={"box"}>
      <Box indent={3}>
        {renderBreadCrumbs && <Row spacing={1.25}>{renderBreadCrumbs()}</Row>}
        {renderPageHeading?.()}
        {renderTabs?.()}
      </Box>
      {children && (
        <>
          {!renderTabs && <Space />}
          <SeparatorLine />
          {children}
        </>
      )}
    </Box>
  );
};
