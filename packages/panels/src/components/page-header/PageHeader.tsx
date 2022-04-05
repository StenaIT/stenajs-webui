import { Box, BoxProps, Row, SeparatorLine } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

export interface PageHeaderProps {
  renderBreadCrumbs?: () => ReactNode;
  renderPageHeading?: () => ReactNode;
  renderTabs?: () => ReactNode;
}

export const PageHeaderRow: React.FC<BoxProps> = (props) => (
  <Row indent={3} spacing {...props} />
);

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
          <SeparatorLine />
          {children}
        </>
      )}
    </Box>
  );
};
