import * as React from "react";
import { useContext } from "react";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { Chip } from "@stenajs-webui/elements";
import { Space } from "@stenajs-webui/core";
import { VariantContext } from "../../util/VariantContext";

export const MultiValue: React.FC<MultiValueProps<any>> = ({
  removeProps,
  children
}) => {
  const variant = useContext(VariantContext);

  return (
    <>
      <Chip
        variant={variant === "dark" ? "passive" : "primary"}
        label={children as string}
        onClickRemove={() => removeProps.onClick(undefined)}
      />
      <Space num={0.5} />
    </>
  );
};
