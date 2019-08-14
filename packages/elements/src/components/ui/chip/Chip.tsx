import styled from "@emotion/styled";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import {
  Box,
  Clickable,
  Indent,
  Row,
  SmallText,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
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
  const { colors } = useThemeFields(
    {
      colors: {
        background: theme.background,
        backgroundHover: theme.backgroundHover,
        iconColor: theme.iconColor,
        iconColorHover: theme.iconColorHover,
        removeIconBackground: theme.removeIconBackground,
        removeIconBackgroundHover: theme.removeIconBackgroundHover
      }
    },
    [theme]
  );

  return (
    <Box display={"inline-block"}>
      <Row
        role={"button"}
        background={colors.background}
        borderRadius={theme.borderRadius}
        height={theme.height}
        alignItems={"center"}
        hoverBackground={onClickLabel ? colors.backgroundHover : undefined}
      >
        <Clickable onClick={onClickLabel}>
          <Indent height={theme.height} justifyContent={"center"}>
            <SmallText
              hoverUnderline={!!onClickLabel}
              lineHeight={theme.height}
            >
              {label}
            </SmallText>
          </Indent>
        </Clickable>
        {onClickRemove && (
          <Clickable onClick={onClickRemove}>
            <CloseWrapper
              iconColor={colors.iconColor}
              iconColorHover={colors.iconColorHover}
              background={colors.removeIconBackground}
              backgroundHover={colors.removeIconBackgroundHover}
              borderRadius={theme.borderRadius}
            >
              <Indent num={0.5}>
                <Icon icon={faTimes} size={10} />
              </Indent>
            </CloseWrapper>
          </Clickable>
        )}
      </Row>
    </Box>
  );
};

const CloseWrapper = styled(Box)<{
  iconColor: string;
  iconColorHover: string;
  background: string;
  backgroundHover: string;
  borderRadius: string;
}>`
  height: 24px;
  border-radius: ${({ borderRadius }) => borderRadius};
  justify-content: center;
  align-items: center;
  background: ${({ background }) => background};
  color: ${({ iconColor }) => iconColor};

  &:hover {
    background: ${({ backgroundHover }) => backgroundHover} !important;
    color: ${({ iconColorHover }) => iconColorHover} !important;

    svg {
      color: ${({ iconColorHover }) => iconColorHover} !important;
    }
  }
`;
