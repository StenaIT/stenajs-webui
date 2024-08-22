import { Indent, Row, Space, Text } from "@stenajs-webui/core";
import {
  Icon,
  stenaArrowRight,
  stenaExclamationTriangle,
} from "@stenajs-webui/elements";
import { TextInput } from "@stenajs-webui/forms";
import {
  EntityCrudStatusRedux,
  ModifiedFieldRedux,
} from "@stenajs-webui/redux";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { KeyboardEventHandler, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultTableRowHeight,
  tableBorder,
} from "../../../../config/TableConfig";
import {
  useGridCell,
  UseGridCellOptions,
} from "../../../grid-cell/hooks/UseGridCell";
import {
  CrudStatusIndicator,
  hasIndicatorContent,
} from "../CrudStatusIndicator";

interface Props<TStoreState> {
  value?: string;
  entityId: string;
  isEditable?: boolean;
  rowIndent?: boolean;
  allowedInputType: UseGridCellOptions<string>["allowedInputType"];
  modifiedFieldsRedux: ModifiedFieldRedux<TStoreState>;
  crudStatusRedux: EntityCrudStatusRedux<TStoreState>;
  rowIndex: number;
  colIndex: number;
  numRows: number;
  numCols: number;
  warningOnEmpty?: string;
}

export const EditableTextCellWithCrudAndModified =
  function EditableTextCellWithCrudAndModified<TStoreState>({
    allowedInputType,
    value = "",
    entityId,
    isEditable,
    rowIndent,
    crudStatusRedux,
    modifiedFieldsRedux,
    colIndex,
    rowIndex,
    numCols,
    numRows,
    warningOnEmpty,
  }: Props<TStoreState>) {
    const enableGridCell = true;

    const dispatch = useDispatch();

    const modifiedFieldsState = useSelector(
      modifiedFieldsRedux.selectors.getState
    );
    const crudStatusState = useSelector(crudStatusRedux.selectors.getState);

    const modifiedField = modifiedFieldsState.entities[entityId];
    const crudStatus = crudStatusState.entities[entityId];

    const onChangeHandler = useCallback(
      (newValue: string | undefined = "") => {
        if (newValue === value) {
          dispatch(modifiedFieldsRedux.actions.clearEntity(entityId));
        } else {
          dispatch(
            modifiedFieldsRedux.actions.setEntity({
              id: entityId,
              originalValue: value,
              newValue,
              modified: true,
            })
          );
        }
      },
      [dispatch, entityId, modifiedFieldsRedux.actions, value]
    );

    const {
      isEditing,
      stopEditing,
      editorValue,
      setEditorValue,
      stopEditingAndRevert,
      stopEditingAndMove,
      lastKeyEvent,
      requiredProps: { onKeyDown, ...requiredProps },
    } = useGridCell(value, {
      rowIndex,
      colIndex,
      numCols,
      numRows,
      tableId: "serviceManningMatrixTable",
      onChange: onChangeHandler,
      isEditable,
      allowedInputType,
    });

    const onKeyDownHandler = useCallback<KeyboardEventHandler>(
      (ev) => {
        if (ev.key === "Delete") {
          dispatch(modifiedFieldsRedux.actions.clearEntity(entityId));
          dispatch(
            crudStatusRedux.actions.setEntityFields(entityId, {
              hasError: false,
              errorMessage: undefined,
            })
          );
        } else {
          onKeyDown(ev);
        }
      },
      [
        onKeyDown,
        entityId,
        dispatch,
        modifiedFieldsRedux.actions,
        crudStatusRedux.actions,
      ]
    );

    return (
      <Row
        height={defaultTableRowHeight}
        width={"100%"}
        borderBottom={tableBorder}
        hoverBackground={"var(--ui7)"}
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
            enableGridCell && !isEditing ? "var(--ui5) solid 1px;" : undefined
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
                <Text
                  color={isEditable ? "var(--primary-action-color)" : undefined}
                  variant={modifiedField?.modified ? "bold" : undefined}
                >
                  {value}
                </Text>
                {modifiedField?.newValue !== undefined && (
                  <>
                    <Indent>
                      <Icon icon={stenaArrowRight} size={12} />
                    </Indent>
                    <Text
                      color={"var(--primary-action-color)"}
                      variant={"bold"}
                    >
                      {modifiedField.newValue}
                    </Text>
                  </>
                )}
                {crudStatus && hasIndicatorContent(crudStatus) && (
                  <Space num={2} />
                )}
                {warningOnEmpty &&
                modifiedField?.modified &&
                modifiedField?.newValue === "" ? (
                  <Tooltip label={warningOnEmpty}>
                    <Icon
                      icon={stenaExclamationTriangle}
                      color={"var(--ui-alert1)"}
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
