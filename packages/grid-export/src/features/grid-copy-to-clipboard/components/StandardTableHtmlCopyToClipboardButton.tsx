import * as React from "react";
import { useCallback, useState } from "react";
import { StandardTableProps } from "@stenajs-webui/grid";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { copyContentToClipboard } from "../util/CopyContentToClipboard";
import { CustomCellFormatters } from "../../../common/CellFormatters";

export interface StandardTableHtmlCopyToClipboardButtonProps<
  TItem extends object,
  TColumnKey extends string,
  TColumnGroupKey extends string
> extends Pick<
      StandardTableProps<TItem, TColumnKey, TColumnGroupKey>,
      "config" | "items"
    >,
    Pick<FlatButtonProps, "size"> {
  formatters?: CustomCellFormatters<TItem, TColumnKey>;
  renderContent?: (content: string) => string | null;
  label?: string;
  labelAfterCopy?: string;
  numTimeToRevertLabel?: number;
}

export function StandardTableHtmlCopyToClipboardButton<
  TItem extends object,
  TColumnKey extends string,
  TColumnGroupKey extends string
>({
  config,
  renderContent,
  size,
  items,
  formatters,
  label = "Copy to clipboard",
  labelAfterCopy = "Content copied!",
  numTimeToRevertLabel = 2000,
}: StandardTableHtmlCopyToClipboardButtonProps<
  TItem,
  TColumnKey,
  TColumnGroupKey
>) {
  const [contentCopied, setContentCopied] = useState<boolean>(false);
  const onClickExportHtml = useCallback(async () => {
    await copyContentToClipboard(items, config, formatters, renderContent);

    setContentCopied(true);
    setTimeout(() => setContentCopied(false), numTimeToRevertLabel);
  }, [config, items, formatters, numTimeToRevertLabel, renderContent]);

  return (
    <FlatButton
      size={size}
      onClick={onClickExportHtml}
      disabled={!items || !items.length}
      label={contentCopied ? labelAfterCopy : label}
    />
  );
}
