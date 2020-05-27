import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Icon, InputSpinner } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { CrudStatus } from "@stenajs-webui/redux";

interface Props {
  crudStatus?: CrudStatus;
}

export const hasIndicatorContent = (status: CrudStatus): boolean => {
  const { loading, creating, deleting, updating, hasError } = status;
  return Boolean(loading || creating || deleting || updating || hasError);
};

export const CrudStatusIndicator: React.FC<Props> = ({ crudStatus }) => {
  if (!crudStatus || !hasIndicatorContent(crudStatus)) {
    return null;
  }

  const {
    errorMessage,
    hasError,
    loading,
    creating,
    deleting,
    updating
  } = crudStatus;

  if (loading || creating || deleting || updating) {
    return <InputSpinner color={"var(--lhds-color-ui-500)"} />;
  }

  if (hasError) {
    const icon = (
      <Icon
        icon={faExclamationTriangle}
        color={"var(--lhds-color-orange-600)"}
        size={14}
      />
    );
    return (
      <>
        {errorMessage ? (
          <Tooltip label={errorMessage} zIndex={100}>
            {icon}
          </Tooltip>
        ) : (
          icon
        )}
      </>
    );
  }
  return null;
};
