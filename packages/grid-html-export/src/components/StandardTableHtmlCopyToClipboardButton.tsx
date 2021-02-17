import * as React from "react";
import { useCallback, useState } from "react";
import { StandardTableProps } from "@stenajs-webui/grid";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as clipboard from "clipboard-polyfill";
import { CustomCellFormatters } from "../transformers/ConfigTransformer";
import { renderHtmlForStandardTable } from "../util/HtmlRenderer";

interface StandardTableHtmlExportButtonProps<
  TItem,
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
}

export const StandardTableHtmlCopyToClipboardButton = function StandardTableHtmlExportButton<
  TItem,
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
}: StandardTableHtmlExportButtonProps<TItem, TColumnKey, TColumnGroupKey>) {
  const [contentCopied, setContentCopied] = useState<boolean>(false);
  const onClickExportHtml = useCallback(async () => {
    let htmlToCopy: string | null = "";

    if (items && items.length) {
      htmlToCopy = await renderHtmlForStandardTable(config, items, formatters);
    }

    if (renderContent) {
      htmlToCopy = renderContent(htmlToCopy);
    }
    if (htmlToCopy) {
      const item = new clipboard.ClipboardItem({
        "text/html": new Blob([htmlToCopy], { type: "text/html" }),
      });

      await clipboard.write([item]);
      setContentCopied(true);
    }
  }, [config, items, formatters]);

  return (
    <FlatButton
      size={size}
      onClick={onClickExportHtml}
      disabled={!items || !items.length}
      label={contentCopied ? labelAfterCopy : label}
    />
  );
};
