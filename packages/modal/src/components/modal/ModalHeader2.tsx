import {
  BaseHeader,
  BaseHeaderProps,
  FlatButton,
  stenaTimes,
} from "@stenajs-webui/elements";
import * as React from "react";
import { DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";

export interface ModalHeaderProps2
  extends Omit<BaseHeaderProps, "contentRight"> {
  onRequestClose?: () => void;
  closeButtonClassName?: string;
  draggable?: boolean;
}

export const ModalHeader2: React.FC<ModalHeaderProps2> = ({
  onRequestClose,
  closeButtonClassName,
  draggable = false,
  ...baseHeaderProps
}) => {
  return (
    <BaseHeader
      className={DRAGGABLE_HANDLE_CLASSNAME}
      contentRight={
        onRequestClose && (
          <FlatButton
            className={closeButtonClassName}
            onClick={onRequestClose}
            aria-label={"Close"}
            leftIcon={stenaTimes}
          />
        )
      }
      {...baseHeaderProps}
    />
  );
};
