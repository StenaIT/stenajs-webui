import { Property } from "csstype";
import { cssColor } from "@stenajs-webui/theme";

export interface SelectTheme {
  arrowColor: {
    disabled: string;
    focused: {
      standard: string;
      hover: string;
    };
    closed: {
      standard: string;
      hover: string;
    };
  };
  clearButtonColor: {
    standard: string;
    hover: string;
  };
  input: {
    backgroundColor: string;
    border: string;
    borderColor: string;
    disabledBorderColor: string;
    borderColorFocused: string;
    borderRadius: string;
    disabledBackgroundColor: string;
    warningBackgroundColor: string;
    errorBackgroundColor: string;
    successBackgroundColor: string;
    warningBorderColor: string;
    errorBorderColor: string;
    successBorderColor: string;
    boxShadowFocused: string;
    fontFamily: string;
    fontSize: string;
    height?: string;
    minHeight?: string;
    placeholderColor: string;
    textColor: string;
  };
  loadingIndicator: {
    textColor: string;
  };
  menu: {
    disabledTextColor: string;
    disabledBackgroundColor: string;
    textColor: string;
    backgroundColor: string;
    hoverTextColor: string;
    hoverBackgroundColor: string;
    activeTextColor: string;
    activeBackgroundColor: string;
    minWidth?: string;
    selectedItemTextColor: string;
    selectedItemBackgroundColor: string;
    selectedItemHoverTextColor: string;
    selectedItemIconColor: string;
    selectedItemHoverIconColor: string;
    selectedItemHoverBackgroundColor: string;
    selectedItemActiveTextColor: string;
    selectedItemActiveBackgroundColor: string;
    zIndex: number;
    width?: string;
    whiteSpace?: Property.WhiteSpace;
  };
  groupHeading: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    color: string;
    letterSpacing: string;
  };
  menuPortal: {
    zIndex: number;
  };
  multiSelect: {
    backgroundColor: string;
    textColor: string;
    removeButtonBackgroundColor: string;
    removeButtonTextColor: string;
    removeButtonHoverBackgroundColor: string;
    removeButtonHoverTextColor: string;
  };
}

export const defaultSelectTheme: SelectTheme = {
  arrowColor: {
    disabled: cssColor("--silver-light"),
    focused: {
      hover: cssColor("--lhds-color-blue-600"),
      standard: cssColor("--lhds-color-blue-600"),
    },
    closed: {
      hover: cssColor("--lhds-color-blue-600"),
      standard: cssColor("--lhds-color-blue-600"),
    },
  },
  clearButtonColor: {
    hover: cssColor("--lhds-color-red-600"),
    standard: cssColor("--lhds-color-red-500"),
  },
  input: {
    backgroundColor: "var(--swui-field-bg-enabled)",
    border: `1px solid var(--swui-select-border-color)`,
    borderColor: "var(--swui-field-border-color)",
    borderColorFocused: "var(--swui-field-border-color-hover)",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    disabledBorderColor: "var(--swui-field-bg-disabled)",
    warningBackgroundColor: "var(--swui-state-alert-light-color)",
    warningBorderColor: "var(--swui-state-alert-light-color)",
    errorBackgroundColor: "var(--swui-state-error-light-color)",
    errorBorderColor: "var(--swui-state-error-light-color)",
    successBackgroundColor: "var(--swui-state-success-light-color)",
    successBorderColor: "var(--swui-state-success-light-color)",
    boxShadowFocused: "none",
    fontFamily: "var(--swui-font-primary)",
    fontSize: "var(--swui-font-size-inputs)",
    minHeight: "24px",
    placeholderColor: "var(--swui-field-text-color)",
    textColor: "var(--swui-field-text-color)",
    borderRadius: "var(--swui-field-border-radius)",
  },
  loadingIndicator: {
    textColor: "var(--swui-field-text-color)",
  },
  groupHeading: {
    fontSize: "var(--swui-font-size-small)",
    lineHeight: "var(--swui-line-height-smaller)",
    fontWeight: "var(--swui-font-weight-text-bold)",
    color: cssColor("--lhds-color-ui-600"),
    letterSpacing: "0.1rem",
  },
  menu: {
    activeBackgroundColor: cssColor("--lhds-color-blue-100"),
    activeTextColor: "var(--swui-field-text-color)",
    selectedItemActiveBackgroundColor: cssColor("--lhds-color-blue-500"),
    selectedItemActiveTextColor: cssColor("--lhds-color-blue-50"),
    disabledTextColor: "var(--swui-field-text-color-disabled)",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    textColor: "var(--swui-field-text-color)",
    backgroundColor: "var(--swui-field-bg-enabled)",
    hoverTextColor: "var(--swui-field-text-color)",
    hoverBackgroundColor: cssColor("--lhds-color-blue-200"),
    selectedItemTextColor: cssColor("--lhds-color-blue-500"),
    selectedItemIconColor: cssColor("--lhds-color-blue-500"),
    selectedItemHoverTextColor: "var(--swui-field-text-color)",
    selectedItemHoverIconColor: "var(--swui-field-text-color)",
    selectedItemBackgroundColor: cssColor("--lhds-color-blue-50"),
    selectedItemHoverBackgroundColor: cssColor("--lhds-color-blue-50"),
    zIndex: 1,
    width: "auto",
    minWidth: "100%",
    whiteSpace: "nowrap",
  },
  menuPortal: {
    zIndex: 1,
  },
  multiSelect: {
    backgroundColor: "var(--swui-primary-action-color)",
    textColor: cssColor("--lhds-color-blue-50"),
    removeButtonBackgroundColor: "transparent",
    removeButtonTextColor: "var(--swui-white)",
    removeButtonHoverBackgroundColor: "var(--swui-primary-action-color-hover)",
    removeButtonHoverTextColor: "var(--swui-white)",
  },
};
