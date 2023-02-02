import { Property } from "csstype";

export interface SelectTheme {
  arrowColor: {
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
    focused: {
      hover: "var(--lhds-color-ui-500)",
      standard: "var(--lhds-color-ui-500)",
    },
    closed: {
      hover: "var(--lhds-color-ui-500)",
      standard: "var(--lhds-color-ui-500)",
    },
  },
  clearButtonColor: {
    hover: "var(--lhds-color-ui-600)",
    standard: "var(--lhds-color-ui-500)",
  },
  input: {
    backgroundColor: "var(--swui-field-bg-enabled)",
    border: `1px solid var(--swui-select-border-color)`,
    borderColor: "var(--swui-field-border-color)",
    borderColorFocused: "var(--swui-field-border-color-hover)",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    warningBackgroundColor: "var(--swui-state-alert-light-color)",
    errorBackgroundColor: "var(--swui-state-error-light-color)",
    successBackgroundColor: "var(--swui-state-success-light-color)",
    warningBorderColor: "var(--swui-state-alert-color)",
    errorBorderColor: "var(--swui-state-error-color)",
    successBorderColor: "var(--swui-state-success-color)",
    boxShadowFocused: "var(--swui-field-focus-shadow)",
    fontFamily: "var(--swui-font-primary)",
    fontSize: "var(--swui-font-size-inputs)",
    height: "32px",
    minHeight: "32px",
    placeholderColor: "var(--swui-field-text-color)",
    textColor: "var(--swui-field-text-color)",
    borderRadius: "var(--swui-field-border-radius)",
  },
  loadingIndicator: {
    textColor: "var(--swui-field-text-color)",
  },
  groupHeading: {
    fontSize: "var(--swui-font-size-smaller)",
    lineHeight: "var(--swui-line-height-smaller)",
    fontWeight: "var(--swui-font-weight-text-bold)",
    color: "var(--lhds-color-ui-600)",
    letterSpacing: "0.1rem",
  },
  menu: {
    activeBackgroundColor: "var(--lhds-color-blue-100)",
    activeTextColor: "var(--swui-field-text-color)",
    selectedItemActiveBackgroundColor: "var(--lhds-color-blue-500)",
    selectedItemActiveTextColor: "var(--lhds-color-blue-50)",
    disabledTextColor: "var(--lhds-color-ui-600)",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    textColor: "var(--swui-field-text-color)",
    backgroundColor: "var(--swui-field-bg-enabled)",
    hoverTextColor: "var(--swui-field-text-color)",
    hoverBackgroundColor: "var(--lhds-color-blue-200)",
    selectedItemTextColor: "var(--lhds-color-blue-500)",
    selectedItemIconColor: "var(--lhds-color-blue-500)",
    selectedItemHoverTextColor: "var(--swui-field-text-color)",
    selectedItemHoverIconColor: "var(--swui-field-text-color)",
    selectedItemBackgroundColor: "var(--lhds-color-blue-50)",
    selectedItemHoverBackgroundColor: "var(--lhds-color-blue-50)",
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
    textColor: "var(--lhds-color-blue-50)",
    removeButtonBackgroundColor: "transparent",
    removeButtonTextColor: "var(--swui-white)",
    removeButtonHoverBackgroundColor: "var(--swui-primary-action-color-hover)",
    removeButtonHoverTextColor: "var(--swui-white)",
  },
};
