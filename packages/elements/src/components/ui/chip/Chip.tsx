import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import {
  Box,
  Clickable,
  Indent,
  Row,
  SmallText,
  useBoolean,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { Nest } from "@stenajs-webui/core";
import { Icon } from "../icon/Icon";
import { ChipTheme, defaultChipTheme } from "./ChipTheme";

export interface ChipProps {
  label: string;
  onClickLabel?: () => void;
  onClickRemove?: () => void;
  theme?: ChipTheme;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onClickLabel,
  onClickRemove,
  theme = defaultChipTheme
}) => {
  const [labelHovering, setLabelHovering, setLabelNotHovering] = useBoolean(
    false
  );
  const [iconHovering, setIconHovering, setIconNotHovering] = useBoolean(false);

  const { colors } = useThemeFields(
    {
      colors: {
        background: theme.background,
        backgroundHover: theme.backgroundHover,
        iconColor: theme.iconColor,
        iconColorHover: theme.iconColorHover,
        removeIconBackgroundHover: theme.removeIconBackgroundHover,
        textColor: theme.textColor,
        textColorHover: theme.textColorHover
      }
    },
    [theme]
  );

  return (
    <Box display={"inline-block"}>
      <Row
        role={"button"}
        background={
          onClickLabel && labelHovering
            ? colors.backgroundHover
            : colors.background
        }
        borderRadius={theme.borderRadius}
        height={theme.height}
        alignItems={"center"}
        overflow={"hidden"}
      >
        <Nest
          nest={!!onClickLabel}
          render={children => (
            <Clickable onClick={onClickLabel}>{children}</Clickable>
          )}
        >
          <Indent
            height={theme.height}
            justifyContent={"center"}
            onMouseEnter={setLabelHovering}
            onMouseLeave={setLabelNotHovering}
          >
            <SmallText
              lineHeight={theme.height}
              color={
                onClickLabel && labelHovering
                  ? colors.textColorHover
                  : colors.textColor
              }
            >
              {label}
            </SmallText>
          </Indent>
        </Nest>
        {onClickRemove && (
          <Clickable onClick={onClickRemove} disableOpacityOnClick>
            <Box
              borderRadius={theme.borderRadius}
              background={
                (labelHovering && onClickLabel) || iconHovering
                  ? colors.backgroundHover
                  : colors.background
              }
              height={theme.height}
              alignItems={"center"}
              justifyContent={"center"}
              onMouseEnter={setIconHovering}
              onMouseLeave={setIconNotHovering}
            >
              <Indent num={0.5}>
                <Icon
                  icon={faTimes}
                  size={10}
                  color={
                    iconHovering ? colors.iconColorHover : colors.iconColor
                  }
                />
              </Indent>
            </Box>
          </Clickable>
        )}
      </Row>
    </Box>
  );
};
