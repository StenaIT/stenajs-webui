import { stenaTimes } from "../../../icons/generated/CommonIcons";
import { FlatButton } from "./FlatButton";
import * as React from "react";
import { forwardRef } from "react";
import { BaseButtonProps } from "./common/BaseButton";

export interface CloseButtonProps extends BaseButtonProps {}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <FlatButton
        leftIcon={stenaTimes}
        variant={"danger"}
        ref={ref}
        aria-label={"Close"}
        {...props}
      />
    );
  },
);
