import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Indent, Row, Space, StandardText } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { TextInput } from "@stenajs-webui/forms";
import {
  EntityCrudStatusAction,
  EntityCrudStatusActions,
  EntityCrudStatusState,
  ModifiedFieldAction,
  ModifiedFieldActions,
  ModifiedFieldState
} from "@stenajs-webui/redux";

import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { Dispatch, KeyboardEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import { tableBorder, tableRowHeight } from "../../../../../config/TableConfig";
import {
  useGridCell,
  UseGridCellOptions
} from "../../../../grid-cell/hooks/UseGridCell";
import {
  CrudStatusIndicator,
  hasIndicatorContent
} from "../../components/CrudStatusIndicator";

interface Props {
  value?: string;
  entityId: string;
  isEditable?: boolean;
  rowIndent?: boolean;
  allowedInputType: UseGridCellOptions<string>["allowedInputType"];
  modifiedFieldsState: ModifiedFieldState;
  modifiedFieldsActions: ModifiedFieldActions;
  crudStatusState: EntityCrudStatusState;
  crudStatusActions: EntityCrudStatusActions;
  dispatch: Dispatch<ModifiedFieldAction | EntityCrudStatusAction>;
  rowIndex: number;
  colIndex: number;
  numRows: number;
  numCols: number;
  warningOnEmpty?: string;
}

export const EditableTextCellWithCrudAndModified = function EditableTextCellWithCrudAndModified({
  allowedInputType,
  value = "",
  entityId,
  isEditable,
  rowIndent,
  crudStatusActions,
  crudStatusState,
  modifiedFieldsActions,
  modifiedFieldsState,
  colIndex,
  rowIndex,
  numCols,
  numRows,
  warningOnEmpty
}: Props) {
  const enableGridCell = true;

  const dispatch = useDispatch();

  const modifiedField = modifiedFieldsState.entities[entityId];
  const crudStatus = crudStatusState.entities[entityId];

  const onChangeHandler = useCallback(
    (newValue: string | undefined = "") => {
      if (newValue === value) {
        dispatch(modifiedFieldsActions.clearEntity(entityId));
      } else {
        dispatch(
          modifiedFieldsActions.setEntity({
            id: entityId,
            originalValue: value,
            newValue,
            modified: true
          })
        );
      }
    },
    [dispatch, entityId, modifiedFieldsActions, value]
  );

  const {
    isEditing,
    stopEditing,
    editorValue,
    setEditorValue,
    stopEditingAndRevert,
    stopEditingAndMove,
    lastKeyEvent,
    requiredProps: { onKeyDown, ...requiredProps }
  } = useGridCell(value, {
    rowIndex,
    colIndex,
    numCols,
    numRows,
    tableId: "serviceManningMatrixTable",
    onChange: onChangeHandler,
    isEditable,
    allowedInputType
  });

  const onKeyDownHandler = useCallback<KeyboardEventHandler>(
    ev => {
      if (ev.key === "Delete") {
        dispatch(modifiedFieldsActions.clearEntity(entityId));
        dispatch(
          crudStatusActions.setEntityFields(entityId, {
            hasError: false,
            errorMessage: undefined
          })
        );
      } else {
        onKeyDown(ev);
      }
    },
    [onKeyDown, entityId, dispatch, modifiedFieldsActions, crudStatusActions]
  );

  return (
    <Row
      height={tableRowHeight}
      width={"100%"}
      borderBottom={tableBorder}
      hoverBackground={"var(--lhds-color-ui-100)"}
      alignItems={"center"}
    >
      {rowIndent && <Indent num={rowIndent} />}
      <Row
        width={"100%"}
        height={"100%"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        border={"1px solid transparent"}
        borderRadius={enableGridCell ? "4px" : undefined}
        focusBorder={
          enableGridCell && !isEditing
            ? "1px solid var(--primary-action-color)"
            : undefined
        }
        hoverBorder={
          enableGridCell && !isEditing
            ? "var(--lhds-color-ui-300) solid 1px;"
            : undefined
        }
        onKeyDown={onKeyDownHandler}
        {...(enableGridCell ? requiredProps : undefined)}
      >
        <Indent row alignItems={"center"}>
          {isEditing ? (
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
            <>
              <StandardText
                color={isEditable ? "var(--primary-action-color)" : undefined}
                fontWeight={modifiedField?.modified ? "bold" : undefined}
              >
                {value}
              </StandardText>
              {modifiedField?.newValue !== undefined && (
                <>
                  <Indent>
                    <Icon icon={faArrowRight} size={12} />
                  </Indent>
                  <StandardText
                    color={"var(--primary-action-color)"}
                    fontWeight={"bold"}
                  >
                    {modifiedField.newValue}
                  </StandardText>
                </>
              )}
              {crudStatus && hasIndicatorContent(crudStatus) && (
                <Space num={2} />
              )}
              {warningOnEmpty &&
              modifiedField?.modified &&
              modifiedField?.newValue === "" ? (
                <Tooltip label={warningOnEmpty} zIndex={100}>
                  <Icon
                    icon={faExclamationTriangle}
                    color={"var(--lhds-color-orange-600)"}
                    size={14}
                  />
                </Tooltip>
              ) : (
                <CrudStatusIndicator crudStatus={crudStatus} />
              )}
            </>
          )}
        </Indent>
      </Row>
      {rowIndent && <Indent num={rowIndent} />}
    </Row>
  );
};
