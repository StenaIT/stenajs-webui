import {
  Icon,
  InputSpinner,
  stenaExclamationTriangle,
} from "@stenajs-webui/elements";
import { CrudStatus } from "@stenajs-webui/redux";
import { cssColor } from "@stenajs-webui/theme";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";

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

  const { errorMessage, hasError, loading, creating, deleting, updating } =
    crudStatus;

  if (loading || creating || deleting || updating) {
    return <InputSpinner color={cssColor("--lhds-color-ui-500")} />;
  }

  if (hasError) {
    const icon = (
      <Icon
        icon={stenaExclamationTriangle}
        color={cssColor("--lhds-color-orange-600")}
        size={14}
      />
    );
    return (
      <>
        {errorMessage ? <Tooltip label={errorMessage}>{icon}</Tooltip> : icon}
      </>
    );
  }
  return null;
};
