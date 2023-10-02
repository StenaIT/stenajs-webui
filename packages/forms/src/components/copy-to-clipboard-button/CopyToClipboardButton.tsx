import { useTimeoutState } from "@stenajs-webui/core";
import {
  FlatButton,
  FlatButtonProps,
  stenaCopy,
} from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { useCallback } from "react";

export interface CopyToClipboardButtonProps {
  value?: string;
  tooltipLabel?: string;
  size?: FlatButtonProps["size"];
}

export function CopyToClipboardButton({
  value,
  tooltipLabel = "Copied to clipboard!",
  size = "small",
}: CopyToClipboardButtonProps) {
  const [visible, setVisible] = useTimeoutState(false, 2000);

  const onClick = useCallback(async () => {
    if (value != null) {
      await navigator.clipboard.writeText(value);
      setVisible(true);
    }
  }, [setVisible, value]);

  return (
    <Tooltip visible={visible} label={tooltipLabel}>
      <FlatButton
        size={size}
        onClick={onClick}
        leftIcon={stenaCopy}
        disabled={value == null}
      />
    </Tooltip>
  );
}
