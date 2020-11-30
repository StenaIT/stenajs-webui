import { Absolute, Row } from "@stenajs-webui/core";
import * as React from "react";
import { Badge, BadgeProps } from "./Badge";

export interface WithBadgeProps extends BadgeProps {
  top?: string;
  left?: string;
  hideBadge?: boolean;
}

export const WithBadge: React.FC<WithBadgeProps> = ({
  children,
  top = "10px",
  left = "-5px",
  hideBadge = false,
  ...badgeProps
}) => {
  return (
    <Row>
      {children}
      <div style={{ position: "relative" }}>
        {!hideBadge ? (
          <Absolute top={top} left={left}>
            <Badge {...badgeProps} />
          </Absolute>
        ) : null}
      </div>
    </Row>
  );
};
