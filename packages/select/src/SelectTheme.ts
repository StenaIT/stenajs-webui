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
    borderFocused: string;
    borderColor: string;
    borderColorFocused: string;
    borderRadius: string;
    disabledBackgroundColor: string;
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
    border: `1px solid var(--swui-field-border-color)`,
    borderFocused: `1px solid var(--swui-field-border-color-hover)`,
    borderColor: "var(--swui-field-border-color)",
    borderColorFocused: "var(--swui-field-border-color-hover)",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    boxShadowFocused: "var(--swui-field-focus-shadow)",
    fontFamily: "var(--swui-font-primary)",
    fontSize: "var(--swui-font-size-inputs)",
    height: "32px",
    minHeight: "32px",
    placeholderColor: "var(--swui-field-border-color-disabled)",
    textColor: "var(--swui-field-text-color)",
    borderRadius: "var(--swui-field-border-radius)",
  },
  loadingIndicator: {
    textColor: "var(--swui-field-text-color)",
  },
  menu: {
    activeBackgroundColor: "var(--lhds-color-blue-100)",
    activeTextColor: "var(--swui-field-text-color)",
    selectedItemActiveBackgroundColor: "var(--lhds-color-blue-500)",
    selectedItemActiveTextColor: "var(--lhds-color-blue-50)",
    disabledTextColor: "var(--swui-field-text-color-disabled)",
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

export const selectThemeDark: SelectTheme = {
  arrowColor: {
    focused: {
      hover: "white",
      standard: "var(--lhds-color-ui-500)",
    },
    closed: {
      hover: "white",
      standard: "var(--lhds-color-ui-500)",
    },
  },
  clearButtonColor: {
    standard: "var(--lhds-color-ui-400)",
    hover: "white",
  },
  input: {
    backgroundColor: "#4a5d73",
    border: "1px solid transparent",
    borderFocused: `1px solid #92a3b5`,
    borderColor: "transparent",
    borderColorFocused: "#92a3b5",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    boxShadowFocused: "var(--swui-field-focus-shadow)",
    fontFamily: "var(--swui-font-primary)",
    fontSize: "var(--swui-font-size-inputs)",
    height: "32px",
    minHeight: "32px",
    placeholderColor: "white",
    textColor: "white",
    borderRadius: "4px",
  },
  loadingIndicator: {
    textColor: "white",
  },
  menu: {
    activeBackgroundColor: "#6F7E90",
    activeTextColor: "white",
    selectedItemActiveBackgroundColor: "#6F7E90",
    selectedItemActiveTextColor: "white",
    disabledTextColor: "var(--swui-text-disabled-color)",
    disabledBackgroundColor: "var(--swui-field-bg-disabled)",
    backgroundColor: "#4a5d73",
    textColor: "white",
    hoverTextColor: "white",
    hoverBackgroundColor: "#6F7E90",
    selectedItemTextColor: "white",
    selectedItemIconColor: "white",
    selectedItemHoverTextColor: "white",
    selectedItemHoverIconColor: "white",
    selectedItemBackgroundColor: "#4a5d73",
    selectedItemHoverBackgroundColor: "#6F7E90",
    zIndex: 1,
    width: "auto",
    minWidth: "100%",
    whiteSpace: "nowrap",
  },
  menuPortal: {
    zIndex: 1,
  },
  multiSelect: {
    backgroundColor: "#B9D8DF",
    textColor: "var(--lhds-color-ui-700)",
    removeButtonBackgroundColor: "#B9D8DF",
    removeButtonTextColor: "var(--lhds-color-ui-700)",
    removeButtonHoverBackgroundColor: "#226F81",
    removeButtonHoverTextColor: "white",
  },
};
