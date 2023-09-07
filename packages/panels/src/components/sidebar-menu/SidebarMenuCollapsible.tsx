import * as React from "react";
import { ReactNode, useState } from "react";
import { Box, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@stenajs-webui/elements";
import contentStyles from "./SidebarMenuContent.module.css";
import cx from "classnames";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cssColor } from "@stenajs-webui/theme";
import { SidebarMenuCollapsibleGroupBox } from "./SidebarMenuCollapsibleGroupBox";

export interface SidebarMenuCollapsibleProps {
  label: string;
  collapsed?: boolean;
  leftIcon?: IconDefinition;
  children?: ReactNode;
  className?: string;
  initialExpand?: boolean;
  indent?: number | boolean;
}

export const SidebarMenuCollapsible: React.FC<SidebarMenuCollapsibleProps> = ({
  children,
  label,
  leftIcon,
  className,
  initialExpand = false,
  indent,
}) => {
  const [expanded, setExpanded] = useState<boolean>(initialExpand);

  const innerClassName = cx(
    contentStyles.button,
    expanded ? contentStyles.selected : undefined,
    className
  );

  const innerStyle = {
    height: "var(--swui-sidebar-menu-item-height)",
  };

  return (
    <Box background={"var(--current-background-color)"}>
      <Box indent={1} width={"100%"}>
        <Box
          width={"100%"}
          borderRadius={"99rem"}
          overflow={"hidden"}
          justifyContent={"space-between"}
        >
          <button
            className={innerClassName}
            style={innerStyle}
            onClick={() => setExpanded(!expanded)}
          >
            <Row justifyContent={"space-between"}>
              <Row>
                {leftIcon ? (
                  <Box
                    width={"var(--swui-sidebar-menu-item-height)"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Icon
                      icon={leftIcon}
                      size={16}
                      color={"var(--current-text-color)"}
                      data-hover={true}
                    />
                  </Box>
                ) : (
                  <Indent num={1} />
                )}
                <Text variant={"bold"}>{label}</Text>
              </Row>
              <Row>
                <Icon
                  icon={expanded ? faChevronUp : faChevronDown}
                  size={12}
                  color={cssColor("--lhds-color-blue-600")}
                />
                <Indent />
              </Row>
            </Row>
          </button>
        </Box>
      </Box>

      {expanded && (
        <Indent>
          <Space />
          <SidebarMenuCollapsibleGroupBox indent={indent}>
            {children}
          </SidebarMenuCollapsibleGroupBox>
        </Indent>
      )}
    </Box>
  );
};
