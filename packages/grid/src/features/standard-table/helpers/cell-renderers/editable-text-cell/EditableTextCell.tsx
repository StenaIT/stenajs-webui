import { Indent, Text, TextSize } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { StandardTableCellRenderer } from "../../../config/StandardTableColumnConfig";

export const createStandardEditableTextCell =
  <TItemValue, TItem>(
    textSize?: TextSize,
  ): StandardTableCellRenderer<TItemValue, TItem> =>
  ({
    label,
    gridCell: {
      editorValue,
      isEditing,
      setEditorValue,
      stopEditingAndRevert,
      lastKeyEvent,
      stopEditing,
      stopEditingAndMove,
    },
  }) =>
    isEditing ? (
      <TextInput
        onValueChange={setEditorValue}
        value={editorValue}
        onDone={stopEditing}
        onEsc={stopEditingAndRevert}
        autoFocus
        selectAllOnMount={!lastKeyEvent}
        onMove={stopEditingAndMove}
      />
    ) : (
      <Indent>
        <Text color={"var(--swui-primary-action-color)"} size={textSize}>
          {label}
        </Text>
      </Indent>
    );
