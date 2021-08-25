import * as React from "react";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { useGroupConfigsAndIdsForRows } from "../context/GroupConfigsAndIdsForRowsContext";
import { booleanOrNumberToNumber } from "@stenajs-webui/core";

interface ColsProps {}

export const ColGroups: React.FC<ColsProps> = () => {
  const config = useStandardTableConfig();
  const groupConfigsAndIds = useGroupConfigsAndIdsForRows();

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
      {groupConfigsAndIds.map(({ groupConfig, groupId }) => (
        <colgroup key={groupId}>
          {groupConfig.columnOrder.map((columnId) => (
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
