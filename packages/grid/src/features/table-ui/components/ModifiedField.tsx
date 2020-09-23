import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Indent, Space, StandardText } from "@stenajs-webui/core";
import { Icon, stenaArrowRight } from "@stenajs-webui/elements";
import { EntityCrudStatus, ModifiedFieldItemState } from "@stenajs-webui/redux";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import {
  CrudStatusIndicator,
  hasIndicatorContent,
} from "./CrudStatusIndicator";

interface Props {
  warningOnEmpty?: string;
  isEditable?: boolean;
  value?: string;
  crudStatus?: EntityCrudStatus;
  modifiedField?: ModifiedFieldItemState;
}

export const ModifiedField: React.FC<Props> = ({
  isEditable,
  warningOnEmpty,
  value,
  modifiedField,
  crudStatus,
}) => {
  const showEmptyFieldWarning =
    warningOnEmpty && modifiedField?.modified && modifiedField?.newValue === "";

  const hasCrudIndicator = crudStatus && hasIndicatorContent(crudStatus);

  const hasRightIcon = showEmptyFieldWarning || hasCrudIndicator;

  return (
    <>
      <StandardText
        color={isEditable ? "var(--swui-primary-action-color)" : undefined}
        fontWeight={modifiedField?.modified ? "bold" : undefined}
      >
        {value}
      </StandardText>
      {modifiedField?.newValue !== undefined && (
        <>
          <Indent>
            <Icon icon={stenaArrowRight} size={12} />
          </Indent>
          <StandardText
            color={"var(--swui-primary-action-color)"}
            fontWeight={"bold"}
          >
            {modifiedField.newValue}
          </StandardText>
        </>
      )}
      {hasRightIcon && <Space />}
      {showEmptyFieldWarning ? (
        <Tooltip label={warningOnEmpty!} zIndex={100}>
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
  );
};
