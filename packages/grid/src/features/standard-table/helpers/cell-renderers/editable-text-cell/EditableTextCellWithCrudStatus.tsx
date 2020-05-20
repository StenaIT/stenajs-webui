import { Indent, Space, StandardText } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { EntityCrudStatus } from "@stenajs-webui/redux";
import { StandardTableCellRenderer } from "../../../config/StandardTableConfig";
import {
  CrudStatusIndicator,
  hasIndicatorContent
} from "../../components/CrudStatusIndicator";

export const createEditableTextCellWithCrudStatus = <TItemValue, TItem>(
  crudStatusProvider: (item: TItem) => EntityCrudStatus | undefined
): StandardTableCellRenderer<TItemValue, TItem> => (
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
    stopEditingAndMove
  }
) => {
  const crudStatus = crudStatusProvider(_item);
  return isEditing ? (
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
    <Indent row alignItems={"center"}>
      <StandardText color={"var(--swui-primary-action-color)"}>
        {label}
      </StandardText>
      {crudStatus && hasIndicatorContent(crudStatus) && <Space num={2} />}
      <CrudStatusIndicator crudStatus={crudStatus} />
    </Indent>
  );
};
