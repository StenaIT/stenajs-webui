import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy";
import { useTimeoutState } from "@stenajs-webui/core";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { useCallback } from "react";

export interface CopyToClipboardButtonProps<T> {
  value: T;
  tooltipLabel?: string;
  size?: FlatButtonProps["size"];
}

export function CopyToClipboardButton<T>({
  value,
  tooltipLabel = "Copied to clipboard!",
  size = "small",
}: CopyToClipboardButtonProps<T>) {
  const [visible, setVisible] = useTimeoutState(false, 2000);

  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(String(value));
    setVisible(true);
  }, [setVisible, value]);

  return (
    <Tooltip visible={visible} label={tooltipLabel}>
      <FlatButton size={size} onClick={onClick} leftIcon={faCopy} />
    </Tooltip>
  );
}
