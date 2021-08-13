import * as React from "react";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";
import { booleanOrNumberToNumber } from "@stenajs-webui/core";

interface ColsProps {}

export const ColGroups: React.FC<ColsProps> = () => {
  const config = useStandardTableConfig();
  const groupConfigs = useGroupConfigsForRows();

  const hasExtraColGroup =
    config.enableExpandCollapse || config.showRowCheckbox;

  const rowIndent = booleanOrNumberToNumber(config.rowIndent);

  return (
    <>
      {rowIndent ? (
        <colgroup>
          <col
            style={{ width: `calc(var(--swui-metrics-indent) * ${rowIndent})` }}
          />
        </colgroup>
      ) : null}
      {hasExtraColGroup && (
        <colgroup>
          {config.enableExpandCollapse && (
            <col style={{ width: "var(--swui-expand-cell-width)" }} />
          )}
          {config.showRowCheckbox && (
            <col style={{ width: "var(--swui-checkbox-cell-width)" }} />
          )}
        </colgroup>
      )}
      {groupConfigs.map((group) => (
        <colgroup>
          {group.columnOrder.map((columnId) => (
            <col
              style={{
                width: config.columns[columnId].width,
                minWidth: config.columns[columnId].minWidth,
              }}
            />
          ))}
        </colgroup>
      ))}
      {rowIndent ? (
        <colgroup>
          <col
            style={{ width: `calc(var(--swui-metrics-indent) * ${rowIndent})` }}
          />
        </colgroup>
      ) : null}
    </>
  );
};
