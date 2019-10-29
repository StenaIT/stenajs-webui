import { WhiteSpaceProperty } from "csstype";

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
    selectedItemHoverBackgroundColor: string;
    selectedItemActiveTextColor: string;
    selectedItemActiveBackgroundColor: string;
    zIndex: number;
    width?: string;
    whiteSpace?: WhiteSpaceProperty;
  };
  menuPortal: {
    zIndex: number;
  };
  multiSelect: {
    backgroundColor: string;
    color: string;
    removeButtonBackgroundColor: string;
    removeButtonTextColor: string;
    removeButtonHoverBackgroundColor: string;
    removeButtonHoverTextColor: string;
  };
}

export const defaultSelectTheme: SelectTheme = {
  arrowColor: {
    focused: {
      hover: "primaryText",
      standard: "separator"
    },
    closed: {
      hover: "primaryTet",
      standard: "separator"
    }
  },
  clearButtonColor: {
    hover: "primaryText",
    standard: "separator"
  },
  input: {
    backgroundColor: "white",
    border: `1px solid inputBorder`,
    borderFocused: `1px solid inputBorderFocused`,
    borderColor: "inputBorder",
    borderColorFocused: "inputBorderFocused",
    disabledBackgroundColor: "disabledBackground",
    fontFamily: "primary",
    fontSize: "normal",
    height: "32px",
    minHeight: "32px",
    placeholderColor: "separator",
    textColor: "primaryText",
    borderRadius: "4px"
  },
  loadingIndicator: {
    textColor: "primaryText"
  },
  menu: {
    activeBackgroundColor: "#F2F3F5",
    activeTextColor: "primaryText",
    selectedItemActiveBackgroundColor: "#F2F3F5",
    selectedItemActiveTextColor: "primaryText",
    disabledTextColor: "disabledText",
    disabledBackgroundColor: "disabledBackground",
    textColor: "primaryText",
    backgroundColor: "white",
    hoverTextColor: "primaryText",
    hoverBackgroundColor: "#F2F3F5",
    selectedItemTextColor: "primaryText",
    selectedItemHoverTextColor: "primaryText",
    selectedItemBackgroundColor: "white",
    selectedItemHoverBackgroundColor: "#F2F3F5",
    zIndex: 1
  },
  menuPortal: {
    zIndex: 1
  },
  multiSelect: {
    backgroundColor: "#B9D8DF",
    color: "primaryText",
    removeButtonBackgroundColor: "#B9D8DF",
    removeButtonTextColor: "primaryText",
    removeButtonHoverBackgroundColor: "primaryBgDark",
    removeButtonHoverTextColor: "white"
  }
};

export const selectThemeDark: SelectTheme = {
  arrowColor: {
    focused: {
      hover: "white",
      standard: "separator"
    },
    closed: {
      hover: "white",
      standard: "separator"
    }
  },
  clearButtonColor: {
    standard: "separator",
    hover: "white"
  },
  input: {
    backgroundColor: "#4a5d73",
    border: "1px solid transparent",
    borderFocused: `1px solid #92a3b5`,
    borderColor: "transparent",
    borderColorFocused: "#92a3b5",
    disabledBackgroundColor: "disabledBackground",
    fontFamily: "primary",
    fontSize: "normal",
    height: "32px",
    minHeight: "32px",
    placeholderColor: "white",
    textColor: "white",
    borderRadius: "4px"
  },
  loadingIndicator: {
    textColor: "white"
  },
  menu: {
    activeBackgroundColor: "#6F7E90",
    activeTextColor: "white",
    selectedItemActiveBackgroundColor: "#6F7E90",
    selectedItemActiveTextColor: "white",
    disabledTextColor: "disabledText",
    disabledBackgroundColor: "disabledBackground",
    backgroundColor: "#4a5d73",
    textColor: "white",
    hoverTextColor: "white",
    hoverBackgroundColor: "#6F7E90",
    selectedItemTextColor: "white",
    selectedItemHoverTextColor: "white",
    selectedItemBackgroundColor: "#4a5d73",
    selectedItemHoverBackgroundColor: "#6F7E90",
    zIndex: 1
  },
  menuPortal: {
    zIndex: 1
  },
  multiSelect: {
    backgroundColor: "#B9D8DF",
    color: "primaryText",
    removeButtonBackgroundColor: "#B9D8DF",
    removeButtonTextColor: "primaryText",
    removeButtonHoverBackgroundColor: "primaryBgDark",
    removeButtonHoverTextColor: "white"
  }
};
