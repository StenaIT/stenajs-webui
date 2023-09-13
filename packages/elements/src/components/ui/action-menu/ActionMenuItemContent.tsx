import {
  Column,
  DivProps,
  Indent,
  Row,
  Space,
  Spacing,
} from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, ReactNode } from "react";

import { useActionMenuLogic } from "./UseActionMenuLogic";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  MenuButtonContent,
  MenuButtonContentProps,
} from "../buttons/menu-button/MenuButtonContent";

export interface ActionMenuItemContentProps
  extends DivProps,
    MenuButtonContentProps {
  leftIcon?: IconDefinition;
  disabled?: boolean;
  right?: ReactNode;
  bottom?: ReactNode;
  fullWidthBottomContent?: boolean;
}

export const ActionMenuItemContent = forwardRef<
  HTMLDivElement,
  ActionMenuItemContentProps
>(function ActionMenuItemContent(
  {
    leftIcon,
    right,
    label,
    disabled,
    bottom,
    fullWidthBottomContent,
    ...props
  },
  ref
) {
  const { onKeyDown, innerRef } = useActionMenuLogic(props, ref);

  return (
    <>
      <Column
        {...props}
        minHeight={"var(--swui-default-item-height)"}
        justifyContent={"center"}
        indent={2}
        ref={innerRef}
        onKeyDown={onKeyDown}
        aria-disabled={disabled}
      >
        <Row justifyContent={"space-between"} alignItems={"center"}>
          <MenuButtonContent label={label} leftIcon={leftIcon} />
          {right && (
            <>
              <Space />
              {right}
            </>
          )}
        </Row>

        {bottom && (
          <>
            <Space />
            <Row>
              {!fullWidthBottomContent && leftIcon && <Indent num={2} />}
              <Row alignItems={"center"} width={"100%"}>
                {bottom}
              </Row>
            </Row>
          </>
        )}
      </Column>
      <Spacing />
    </>
  );
});
