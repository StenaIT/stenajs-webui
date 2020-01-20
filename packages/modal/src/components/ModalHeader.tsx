import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import {
  Box,
  Clickable,
  Row,
  StandardText,
  useThemeFields
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode, useMemo } from "react";

interface Props {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
}

export const ModalHeader: React.FC<Props> = ({
  onRequestClose,
  header,
  headerText
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        borderBottom: "separator"
      }
    },
    []
  );

  const borderBottom = useMemo(() => `1px solid ${colors.borderBottom}`, [
    colors.borderBottom
  ]);

  return (
    <Row
      indent={2}
      height={"56px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      borderBottom={borderBottom}
      className="handle"
    >
      {headerText && (
        <StandardText fontWeight={"bold"} fontSize={"16px"}>
          {headerText}
        </StandardText>
      )}
      {header}
      <Clickable onClick={onRequestClose}>
        <Box spacing indent>
          <Icon icon={faTimes} size={16} />
        </Box>
      </Clickable>
    </Row>
  );
};
