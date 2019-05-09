import { WhiteSpaceProperty } from "csstype";
import { defaultTheme } from "@stenajs-webui/core";

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
    fontFamily: string;
    fontSize: string;
    height: string;
    minHeight: string;
    placeholderColor: string;
    textColor: string;
  };
  loadingIndicator: {
    textColor: string;
  };
  menu: {
    disabledTextColor: string;
    disabledBackgroundColor: string | undefined;
    textColor: string;
    backgroundColor: string;
    hoverTextColor: string;
    hoverBackgroundColor: string;
    minWidth?: string;
    selectedItemTextColor: string;
    selectedItemBackgroundColor: string;
    zIndex: number;
    width?: string;
    whiteSpace?: WhiteSpaceProperty;
  };
  menuPortal: {
    zIndex: number;
  };
  multiSelect: {
    backgroundColor: string;
    removeButtonBackgroundColor: string;
    removeButtonTextColor: string;
    removeButtonHoverBackgroundColor: string;
    removeButtonHoverTextColor: string;
  };
}

export const defaultSelectTheme: SelectTheme = {
  arrowColor: {
    focused: {
      hover: defaultTheme.colors.primaryText,
      standard: defaultTheme.colors.separator
    },
    closed: {
      hover: defaultTheme.colors.primaryText,
      standard: defaultTheme.colors.separator
    }
  },
  clearButtonColor: {
    hover: defaultTheme.colors.primaryText,
    standard: defaultTheme.colors.separator
  },
  input: {
    backgroundColor: defaultTheme.colors.white,
    border: `1px solid ${defaultTheme.colors.inputBorder}`,
    borderFocused: `1px solid ${defaultTheme.colors.inputBorderFocused}`,
    borderColor: defaultTheme.colors.inputBorder,
    borderColorFocused: defaultTheme.colors.inputBorderFocused,
    disabledBackgroundColor: defaultTheme.colors.disabledBackground,
    fontFamily: defaultTheme.fonts.primary,
    fontSize: defaultTheme.fontSizes.normal,
    height: "34px",
    minHeight: "34px",
    placeholderColor: defaultTheme.colors.separator,
    textColor: defaultTheme.colors.primaryText,
    borderRadius: "4px"
  },
  loadingIndicator: {
    textColor: defaultTheme.colors.primaryText
  },
  menu: {
    disabledTextColor: defaultTheme.colors.disabledText,
    disabledBackgroundColor: undefined,
    textColor: defaultTheme.colors.primaryText,
    backgroundColor: defaultTheme.colors.white,
    hoverTextColor: defaultTheme.colors.primaryText,
    hoverBackgroundColor: "#F2F3F5",
    selectedItemTextColor: defaultTheme.colors.primaryText,
    selectedItemBackgroundColor: "#B9D8DF",
    zIndex: 1
  },
  menuPortal: {
    zIndex: 1
  },
  multiSelect: {
    backgroundColor: "#B9D8DF",
    removeButtonBackgroundColor: "#B9D8DF",
    removeButtonTextColor: defaultTheme.colors.primaryText,
    removeButtonHoverBackgroundColor: defaultTheme.colors.primaryBgDark,
    removeButtonHoverTextColor: defaultTheme.colors.white
  }
};

export const selectThemeDark: SelectTheme = {
  arrowColor: {
    focused: {
      hover: defaultTheme.colors.white,
      standard: defaultTheme.colors.separator
    },
    closed: {
      hover: defaultTheme.colors.white,
      standard: defaultTheme.colors.separator
    }
  },
  clearButtonColor: {
    standard: defaultTheme.colors.separator,
    hover: defaultTheme.colors.white
  },
  input: {
    backgroundColor: "#4a5d73",
    border: "1px solid transparent",
    borderFocused: `1px solid #92a3b5`,
    borderColor: "transparent",
    borderColorFocused: "#92a3b5",
    disabledBackgroundColor: defaultTheme.colors.disabledBackground,
    fontFamily: defaultTheme.fonts.primary,
    fontSize: defaultTheme.fontSizes.normal,
    height: "34px",
    minHeight: "34px",
    placeholderColor: defaultTheme.colors.white,
    textColor: defaultTheme.colors.white,
    borderRadius: "4px"
  },
  loadingIndicator: {
    textColor: defaultTheme.colors.white
  },
  menu: {
    disabledTextColor: defaultTheme.colors.disabledText,
    disabledBackgroundColor: undefined,
    backgroundColor: "#4a5d73",
    textColor: defaultTheme.colors.white,
    hoverTextColor: defaultTheme.colors.white,
    hoverBackgroundColor: "#6F7E90",
    selectedItemTextColor: "#226F81",
    selectedItemBackgroundColor: "#B9D8DF",
    zIndex: 1
  },
  menuPortal: {
    zIndex: 1
  },
  multiSelect: {
    backgroundColor: "#B9D8DF",
    removeButtonBackgroundColor: "#B9D8DF",
    removeButtonTextColor: defaultTheme.colors.primaryText,
    removeButtonHoverBackgroundColor: defaultTheme.colors.primaryBgDark,
    removeButtonHoverTextColor: defaultTheme.colors.white
  }
};
