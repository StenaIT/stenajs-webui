import * as React from "react";
import { useContext } from "react";
import { IndicatorProps } from "react-select/src/components/indicators";
import { FlatButton } from "@stenajs-webui/elements";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { VariantContext } from "../../util/VariantContext";

export const ClearIndicator: React.FC<IndicatorProps<any>> = ({
  innerProps: { onMouseDown }
}) => {
  const variant = useContext(VariantContext);

  return (
    <FlatButton
      inverted={variant === "dark"}
      size={"small"}
      leftIcon={faTimes}
      onClick={() => onMouseDown(undefined)}
    />
  );
};
