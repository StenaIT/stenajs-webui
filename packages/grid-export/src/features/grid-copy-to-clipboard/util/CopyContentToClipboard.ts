import { renderHtmlForStandardTable } from "./HtmlRenderer";
import * as clipboard from "clipboard-polyfill";
import { StandardTableConfig } from "@stenajs-webui/grid/dist/features/standard-table/config/StandardTableConfig";
import { CustomCellFormatter } from "../transformers/ConfigTransformer";

export async function copyContentToClipboard<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  items: TItem[] | undefined,
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  formatters?:
    | Partial<Record<TColumnKey, CustomCellFormatter<TItem>>>
    | undefined,
  renderContent?: (content: string) => string | null
) {
  let htmlToCopy: string | null = "";

  if (items && items.length) {
    htmlToCopy = renderHtmlForStandardTable(config, items, formatters);
  }

  if (renderContent) {
    htmlToCopy = renderContent(htmlToCopy);
  }
  if (htmlToCopy) {
    const item = new clipboard.ClipboardItem({
      "text/html": new Blob([htmlToCopy], { type: "text/html" }),
    });

    await clipboard.write([item]);
  }
}
