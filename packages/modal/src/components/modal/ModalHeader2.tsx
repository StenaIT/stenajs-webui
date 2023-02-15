import {
  BaseHeader,
  BaseHeaderProps,
  FlatButton,
  stenaTimes,
} from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import {
  DRAGGABLE_CANCEL_CLASSNAME,
  DRAGGABLE_HANDLE_CLASSNAME,
} from "./BaseModal";

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
  className,
  ...baseHeaderProps
}) => {
  return (
    <BaseHeader
      className={cx({ [DRAGGABLE_HANDLE_CLASSNAME]: draggable }, className)}
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
      textClassName={DRAGGABLE_CANCEL_CLASSNAME}
      {...baseHeaderProps}
    />
  );
};
