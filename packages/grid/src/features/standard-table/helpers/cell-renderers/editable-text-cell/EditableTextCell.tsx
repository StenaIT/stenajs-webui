import { Indent, StandardText } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { StandardTableCellRenderer } from "../../../config/StandardTableConfig";

export const createStandardEditableTextCell = <
  TItemValue,
  TItem
>(): StandardTableCellRenderer<TItemValue, TItem> => (
  label,
  _itemValue,
  _item,
  {
    editorValue,
    isEditing,
    setEditorValue,
    stopEditingAndRevert,
    lastKeyEvent,
    stopEditing,
    stopEditingAndMove,
  }
) =>
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
      <StandardText color={"var(--swui-primary-action-color)"}>
        {label}
      </StandardText>
    </Indent>
  );
