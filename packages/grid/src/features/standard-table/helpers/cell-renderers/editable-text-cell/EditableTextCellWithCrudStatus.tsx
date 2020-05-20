import { Indent, Space, StandardText } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { EntityCrudStatus } from "@stenajs-webui/redux";
import * as React from "react";
import { ModifiedFieldItemState } from "../../../../../../../redux/src/features/modified-field-reducer/modified-field-redux";
import { StandardTableCellRenderer } from "../../../config/StandardTableConfig";
import {
  CrudStatusIndicator,
  hasIndicatorContent
} from "../../components/CrudStatusIndicator";
import { ModifiedField } from "../../components/ModifiedField";

export const createEditableTextCellWithCrudStatus = <TItemValue, TItem>(
  warningOnEmpty?: string | ((item: TItem) => string),
  crudStatusProvider?: (item: TItem) => EntityCrudStatus | undefined,
  modifiedFieldProvider?: (item: TItem) => ModifiedFieldItemState | undefined
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
  },
  { isEditable }
) => {
  const warnOnEmpty =
    typeof warningOnEmpty === "function" ? warningOnEmpty(_item) : undefined;
  const crudStatus = crudStatusProvider ? crudStatusProvider(_item) : undefined;
  const modifiedField = modifiedFieldProvider
    ? modifiedFieldProvider(_item)
    : undefined;
  const editable =
    typeof isEditable === "function" ? isEditable(_item) : isEditable;

  return isEditable && isEditing ? (
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
      <ModifiedField
        value={label}
        modifiedField={modifiedField}
        crudStatus={crudStatus}
        isEditable={editable}
        warningOnEmpty={warnOnEmpty}
      />

      <StandardText
        color={isEditable ? "var(--swui-primary-action-color)" : undefined}
      >
        {label}
      </StandardText>
      {crudStatus && hasIndicatorContent(crudStatus) && <Space num={2} />}
      <CrudStatusIndicator crudStatus={crudStatus} />
    </Indent>
  );
};
