import {
  Absolute,
  Box,
  Clickable,
  Column,
  ThemeColorField,
  useOnClickOutside,
  useThemeFields,
} from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { NavBarButton, NavBarButtonProps } from "./NavBarButton";

type RenderProp = (args: RenderPropArgs) => ReactNode;

interface RenderPropArgs {
  close: () => void;
}

interface NavBarMenuButtonProps extends Omit<NavBarButtonProps, "onClick"> {
  zIndex?: number;
  render?: RenderProp;
  maxHeightMenu?: string;
  top?: string;
  right?: string;
  left?: string;
  backgroundColor?: ThemeColorField | string;
  buttonContent?: ReactNode;
}

export const NavBarMenuButton: React.FC<NavBarMenuButtonProps> = ({
  maxHeightMenu = "600px",
  render,
  children,
  zIndex,
  top = "45px",
  right = "-10px",
  left,
  backgroundColor = "primaryBgLight",
  buttonContent,
  ...navBarButtonProps
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: backgroundColor,
      },
    },
    [backgroundColor]
  );
  const clickOutsideRef = useRef<any>();
  const close = useCallback(() => setMenuVisible(false), [setMenuVisible]);
  const open = useCallback(() => setMenuVisible(true), [setMenuVisible]);
  const args = useMemo<RenderPropArgs>(
    () => ({
      close,
    }),
    [close]
  );
  useOnClickOutside(clickOutsideRef, () => setMenuVisible(false));

  return (
    <Column
      justifyContent={"center"}
      position={"relative"}
      height={"100%"}
      innerRef={clickOutsideRef}
    >
      {buttonContent ? (
        <Clickable onClick={open}>{buttonContent}</Clickable>
      ) : (
        <NavBarButton {...navBarButtonProps} onClick={open} selected />
      )}
      {menuVisible && (
        <Absolute top={top} right={right} left={left} zIndex={zIndex}>
          <Box shadow={"modal"}>
            <Box background={colors.backgroundColor}>
              <div style={{ maxHeight: maxHeightMenu, overflowY: "auto" }}>
                {render && render(args)}
                {children}
              </div>
            </Box>
          </Box>
        </Absolute>
      )}
    </Column>
  );
};
