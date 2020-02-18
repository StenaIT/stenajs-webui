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
import { DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";
import { faTimes } from "@fortawesome/pro-light-svg-icons/faTimes";

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
      className={DRAGGABLE_HANDLE_CLASSNAME}
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
