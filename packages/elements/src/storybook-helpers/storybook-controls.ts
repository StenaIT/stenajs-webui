export const colorListControl = {
  control: {
    type: "select",
    options: [
      "var(--lhds-color-blue-100)",
      "var(--lhds-color-blue-200)",
      "var(--lhds-color-blue-300)",
      "var(--lhds-color-blue-400)",
      "var(--lhds-color-blue-50)",
      "var(--lhds-color-blue-500)",
      "var(--lhds-color-blue-600)",
      "var(--lhds-color-blue-700)",
      "var(--lhds-color-blue-800)",
      "var(--lhds-color-blue-900)",

      "var(--lhds-color-green-100)",
      "var(--lhds-color-green-200)",
      "var(--lhds-color-green-300)",
      "var(--lhds-color-green-400)",
      "var(--lhds-color-green-50)",
      "var(--lhds-color-green-500)",
      "var(--lhds-color-green-600)",
      "var(--lhds-color-green-700)",
      "var(--lhds-color-green-800)",
      "var(--lhds-color-green-900)",

      "var(--lhds-color-orange-100)",
      "var(--lhds-color-orange-200)",
      "var(--lhds-color-orange-300)",
      "var(--lhds-color-orange-400)",
      "var(--lhds-color-orange-50)",
      "var(--lhds-color-orange-500)",
      "var(--lhds-color-orange-600)",
      "var(--lhds-color-orange-700)",
      "var(--lhds-color-orange-800)",
      "var(--lhds-color-orange-900)",

      "var(--lhds-color-red-100)",
      "var(--lhds-color-red-200)",
      "var(--lhds-color-red-300)",
      "var(--lhds-color-red-400)",
      "var(--lhds-color-red-50)",
      "var(--lhds-color-red-500)",
      "var(--lhds-color-red-600)",
      "var(--lhds-color-red-700)",
      "var(--lhds-color-red-800)",
      "var(--lhds-color-red-900)",

      "var(--lhds-color-turquoise-100)",
      "var(--lhds-color-turquoise-200)",
      "var(--lhds-color-turquoise-300)",
      "var(--lhds-color-turquoise-400)",
      "var(--lhds-color-turquoise-50)",
      "var(--lhds-color-turquoise-500)",
      "var(--lhds-color-turquoise-600)",
      "var(--lhds-color-turquoise-700)",
      "var(--lhds-color-turquoise-800)",
      "var(--lhds-color-turquoise-900)",

      "var(--lhds-color-ui-100)",
      "var(--lhds-color-ui-200)",
      "var(--lhds-color-ui-300)",
      "var(--lhds-color-ui-400)",
      "var(--lhds-color-ui-50)",
      "var(--lhds-color-ui-500)",
      "var(--lhds-color-ui-600)",
      "var(--lhds-color-ui-700)",
      "var(--lhds-color-ui-800)",
      "var(--lhds-color-ui-900)",
    ],
  },
};

export const shadowListControl = {
  control: {
    type: "select",
    options: [
      "var(--swui-shadow-modal)",
      "var(--swui-shadow-popover)",
      "var(--swui-shadow-box)",
    ],
  },
};

export const sizeControl = {
  control: { type: "range", min: 0, max: 100, step: 2 },
};

export const widthControl = {
  control: { type: "range", min: 1, max: 10, step: 1 },
};

export const spaceControl = {
  control: { type: "range", min: 1, max: 10, step: 1 },
};

export const disabledControl = {
  control: {
    disable: true,
  },
};

export const hideArg = {
  table: {
    disable: true,
  },
};
