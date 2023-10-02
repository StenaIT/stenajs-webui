import { Indent, Space, Text } from "@stenajs-webui/core";
import {
  Icon,
  stenaArrowRight,
  stenaExclamationTriangle,
} from "@stenajs-webui/elements";
import { EntityCrudStatus, ModifiedFieldItemState } from "@stenajs-webui/redux";
import { cssColor } from "@stenajs-webui/theme";
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
      <Text
        color={isEditable ? "var(--swui-primary-action-color)" : undefined}
        variant={modifiedField?.modified ? "bold" : undefined}
      >
        {value}
      </Text>
      {modifiedField?.newValue !== undefined && (
        <>
          <Indent>
            <Icon icon={stenaArrowRight} size={12} />
          </Indent>
          <Text color={"var(--swui-primary-action-color)"} variant={"bold"}>
            {modifiedField.newValue}
          </Text>
        </>
      )}
      {hasRightIcon && <Space />}
      {showEmptyFieldWarning ? (
        <Tooltip label={warningOnEmpty!} zIndex={100}>
          <Icon
            icon={stenaExclamationTriangle}
            color={cssColor("--lhds-color-orange-600")}
            size={14}
          />
        </Tooltip>
      ) : (
        <CrudStatusIndicator crudStatus={crudStatus} />
      )}
    </>
  );
};
