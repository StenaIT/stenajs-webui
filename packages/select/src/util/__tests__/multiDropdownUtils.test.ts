import {
  GroupedOptionsType,
  GroupType,
  OptionsType,
  ValueType
} from "react-select/lib/types";
import { DropdownOption } from "../..";
import {
  allOptionsExists,
  convertDropdownOptionToInternalOption,
  convertGroupedDropdownOptionsToInternalOptions,
  convertGroupedDropdownOptionToInternalOption,
  convertInternalOptionToDropdownOption,
  convertValueToInternalValue,
  createOnChange,
  InternalDropdownOption,
  Meta
} from "../multiDropdownUtils";

describe("multiDropdownUtils", () => {
  describe("createOnChange", () => {
    describe("select-option", () => {
      describe("when clicking option", () => {
        it("works", () => {
          const onChange = jest.fn();
          const options: GroupedOptionsType<DropdownOption<string>> = [
            {
              label: "CA",
              value: "CA",
              options: [
                {
                  value: "Mattias",
                  label: "Mattias",
                  data: "Mattias data"
                }
              ]
            },
            {
              label: "Freight",
              value: "Freight",
              options: [
                {
                  value: "Johan",
                  label: "Johan",
                  data: "Johan data"
                },
                {
                  value: "Dennis the menace",
                  label: "Dennis the menace",
                  data: "Dennis data"
                }
              ]
            }
          ];
          const newOnChange = createOnChange(onChange);
          const meta: Meta<string> = {
            action: "select-option",
            option: options[0].options[0]
          };
          const selectedOptions: OptionsType<
            InternalDropdownOption<string>
          > = convertGroupedDropdownOptionsToInternalOptions(options);

          newOnChange([selectedOptions[1], selectedOptions[3]], meta);
          const expected: ValueType<DropdownOption<string>> = [
            convertDropdownOptionToInternalOption(options[0].options[0]),
            convertDropdownOptionToInternalOption(options[1].options[0])
          ];
          expect(onChange).toHaveBeenCalledWith(expected, meta);
        });
      });

      describe("when clicking optionsHeader", () => {
        describe("when no sub option is in selected", () => {
          it("works", () => {
            const onChange = jest.fn();
            const options: GroupedOptionsType<DropdownOption<string>> = [
              {
                label: "CA",
                value: "CA",
                options: [
                  {
                    value: "Mattias",
                    label: "Mattias",
                    data: "Mattias data"
                  }
                ]
              },
              {
                label: "Freight",
                value: "Freight",
                options: [
                  {
                    value: "Johan",
                    label: "Johan",
                    data: "Johan data"
                  },
                  {
                    value: "Dennis the menace",
                    label: "Dennis the menace",
                    data: "Dennis data"
                  }
                ]
              }
            ];
            const newOnChange = createOnChange(onChange);
            const selectedOptions: OptionsType<
              InternalDropdownOption<string>
            > = convertGroupedDropdownOptionsToInternalOptions(options);
            const meta: Meta<string> = {
              action: "select-option",
              option: selectedOptions[2]
            };

            newOnChange([selectedOptions[1], selectedOptions[2]], meta);
            const expected: ValueType<DropdownOption<string>> = [
              options[0].options[0],
              ...options[1].options
            ];
            expect(onChange).toHaveBeenCalledWith(expected, meta);
          });
        });

        describe("when any sub option is in selected", () => {
          it("works", () => {
            const onChange = jest.fn();
            const options: GroupedOptionsType<DropdownOption<string>> = [
              {
                label: "CA",
                value: "CA",
                options: [
                  {
                    value: "Mattias",
                    label: "Mattias",
                    data: "Mattias data"
                  }
                ]
              },
              {
                label: "Freight",
                value: "Freight",
                options: [
                  {
                    value: "Johan",
                    label: "Johan",
                    data: "Johan data"
                  },
                  {
                    value: "Dennis the menace",
                    label: "Dennis the menace",
                    data: "Dennis data"
                  }
                ]
              }
            ];
            const newOnChange = createOnChange(onChange);
            const selectedOptions: OptionsType<
              InternalDropdownOption<string>
            > = convertGroupedDropdownOptionsToInternalOptions(options);
            const meta: Meta<string> = {
              action: "select-option",
              option: selectedOptions[2]
            };

            newOnChange(
              [selectedOptions[1], selectedOptions[2], selectedOptions[3]],
              meta
            );
            const expected: ValueType<DropdownOption<string>> = [
              options[0].options[0],
              ...options[1].options
            ];
            expect(onChange).toHaveBeenCalledWith(expected, meta);
          });
        });

        describe("when all sub options is in selected", () => {
          it("works", () => {
            const onChange = jest.fn();
            const options: GroupedOptionsType<DropdownOption<string>> = [
              {
                label: "CA",
                value: "CA",
                options: [
                  {
                    value: "Mattias",
                    label: "Mattias",
                    data: "Mattias data"
                  }
                ]
              },
              {
                label: "Freight",
                value: "Freight",
                options: [
                  {
                    value: "Johan",
                    label: "Johan",
                    data: "Johan data"
                  },
                  {
                    value: "Dennis the menace",
                    label: "Dennis the menace",
                    data: "Dennis data"
                  }
                ]
              }
            ];
            const newOnChange = createOnChange(onChange);
            const selectedOptions: OptionsType<
              InternalDropdownOption<string>
            > = convertGroupedDropdownOptionsToInternalOptions(options);
            const meta: Meta<string> = {
              action: "select-option",
              option: selectedOptions[2]
            };

            newOnChange(
              [
                selectedOptions[1],
                selectedOptions[2],
                selectedOptions[3],
                selectedOptions[4]
              ],
              meta
            );
            const expected: ValueType<DropdownOption<string>> = [
              options[0].options[0],
              ...options[1].options
            ];
            expect(onChange).toHaveBeenCalledWith(expected, meta);
          });
        });
      });
    });

    describe("deselect-option", () => {
      describe("when clicking option", () => {
        describe("when option is in a selected group", () => {
          it("works", () => {
            const onChange = jest.fn();
            const options: GroupedOptionsType<DropdownOption<string>> = [
              {
                label: "CA",
                value: "CA",
                options: [
                  {
                    value: "Mattias",
                    label: "Mattias",
                    data: "Mattias data"
                  }
                ]
              },
              {
                label: "Freight",
                value: "Freight",
                options: [
                  {
                    value: "Johan",
                    label: "Johan",
                    data: "Johan data"
                  },
                  {
                    value: "Dennis the menace",
                    label: "Dennis the menace",
                    data: "Dennis data"
                  }
                ]
              }
            ];
            const newOnChange = createOnChange(onChange);
            const meta: Meta<string> = {
              action: "deselect-option",
              option: options[1].options[0]
            };
            const selectedOptions: OptionsType<
              InternalDropdownOption<string>
            > = convertGroupedDropdownOptionsToInternalOptions(options);

            newOnChange([selectedOptions[2], selectedOptions[4]], meta);
            const expected: ValueType<DropdownOption<string>> = [
              convertDropdownOptionToInternalOption(options[1].options[1])
            ];
            expect(onChange).toHaveBeenCalledWith(expected, meta);
          });
        });

        describe("when option is not in a selected group", () => {
          it("works", () => {
            const onChange = jest.fn();
            const options: GroupedOptionsType<DropdownOption<string>> = [
              {
                label: "CA",
                value: "CA",
                options: [
                  {
                    value: "Mattias",
                    label: "Mattias",
                    data: "Mattias data"
                  }
                ]
              },
              {
                label: "Freight",
                value: "Freight",
                options: [
                  {
                    value: "Johan",
                    label: "Johan",
                    data: "Johan data"
                  },
                  {
                    value: "Dennis the menace",
                    label: "Dennis the menace",
                    data: "Dennis data"
                  }
                ]
              }
            ];
            const newOnChange = createOnChange(onChange);
            const meta: Meta<string> = {
              action: "deselect-option",
              option: options[0].options[0]
            };
            const selectedOptions: OptionsType<
              InternalDropdownOption<string>
            > = convertGroupedDropdownOptionsToInternalOptions(options);

            newOnChange([selectedOptions[3]], meta);
            const expected: ValueType<DropdownOption<string>> = [
              convertDropdownOptionToInternalOption(options[1].options[0])
            ];
            expect(onChange).toHaveBeenCalledWith(expected, meta);
          });
        });
      });

      describe("when clicking optionsHeader", () => {
        it("works", () => {
          const onChange = jest.fn();
          const options: GroupedOptionsType<DropdownOption<string>> = [
            {
              label: "CA",
              value: "CA",
              options: [
                {
                  value: "Mattias",
                  label: "Mattias",
                  data: "Mattias data"
                }
              ]
            },
            {
              label: "Freight",
              value: "Freight",
              options: [
                {
                  value: "Johan",
                  label: "Johan",
                  data: "Johan data"
                },
                {
                  value: "Dennis the menace",
                  label: "Dennis the menace",
                  data: "Dennis data"
                }
              ]
            }
          ];
          const newOnChange = createOnChange(onChange);
          const selectedOptions: OptionsType<
            InternalDropdownOption<string>
          > = convertGroupedDropdownOptionsToInternalOptions(options);
          const meta: Meta<string> = {
            action: "deselect-option",
            option: selectedOptions[2]
          };

          newOnChange(
            [
              selectedOptions[1],
              selectedOptions[2],
              selectedOptions[3],
              selectedOptions[4]
            ],
            meta
          );
          const expected: ValueType<DropdownOption<string>> = [
            options[0].options[0]
          ];
          expect(onChange).toHaveBeenCalledWith(expected, meta);
        });
      });
    });
  });

  describe("convertDropdownOptionsToInternalOptions", () => {
    it("works", () => {
      const input: GroupedOptionsType<DropdownOption<string>> = [
        {
          label: "CA",
          value: "CA",
          options: [
            {
              value: "Mattias",
              label: "Mattias",
              data: "Mattias data"
            }
          ]
        },
        {
          label: "Freight",
          value: "Freight",
          options: [
            {
              value: "Johan",
              label: "Johan",
              data: "Johan data"
            },
            {
              value: "Dennis the menace",
              label: "Dennis the menace",
              data: "Dennis data"
            }
          ]
        }
      ];
      let expected: InternalDropdownOption<string>[] = [
        {
          value: "CA",
          label: "CA",
          data: "CA",
          internalOptions: input[0].options
        },
        {
          value: "Mattias",
          label: "Mattias",
          data: "Mattias data"
        },
        {
          value: "Freight",
          label: "Freight",
          data: "Freight",
          internalOptions: input[1].options
        },
        {
          value: "Johan",
          label: "Johan",
          data: "Johan data"
        },
        {
          value: "Dennis the menace",
          label: "Dennis the menace",
          data: "Dennis data"
        }
      ];

      expect(convertGroupedDropdownOptionsToInternalOptions(input)).toEqual(
        expected
      );
    });
  });

  describe("convertValueToInternalValue", () => {
    const groupOptions: GroupedOptionsType<DropdownOption<string>> = [
      {
        label: "CA",
        value: "CA",
        options: [
          {
            value: "Mattias",
            label: "Mattias",
            data: "Mattias data"
          }
        ]
      },
      {
        label: "Freight",
        value: "Freight",
        options: [
          {
            value: "Johan",
            label: "Johan",
            data: "Johan data"
          },
          {
            value: "Dennis the menace",
            label: "Dennis the menace",
            data: "Dennis data"
          }
        ]
      }
    ];

    describe("when value is undefined", () => {
      it("returns empty array", () => {
        expect(convertValueToInternalValue(groupOptions, undefined)).toEqual(
          []
        );
      });
    });

    describe("when all sub options are selected", () => {
      it("adds group header", () => {
        const selected = [...groupOptions[1].options];
        const expected: InternalDropdownOption<string>[] = [
          {
            value: "Freight",
            label: "Freight",
            data: "Freight",
            internalOptions: groupOptions[1].options
          },
          {
            value: "Johan",
            label: "Johan",
            data: "Johan data"
          },
          {
            value: "Dennis the menace",
            label: "Dennis the menace",
            data: "Dennis data"
          }
        ];
        expect(convertValueToInternalValue(groupOptions, selected)).toEqual(
          expected
        );
      });
    });

    describe("when not all sub options are selected", () => {
      it("does not add group header", () => {
        const selected = [groupOptions[1].options[0]];
        const expected: InternalDropdownOption<string>[] = [
          {
            value: "Johan",
            label: "Johan",
            data: "Johan data"
          }
        ];
        expect(convertValueToInternalValue(groupOptions, selected)).toEqual(
          expected
        );
      });
    });
  });

  describe("allOptionsExists", () => {
    describe("when no value", () => {
      it("returns false", () => {
        expect(allOptionsExists([], undefined)).toBe(false);
      });
    });

    describe("when some exists in value", () => {
      it("returns false", () => {
        const selectedOption = {
          value: "value 1",
          label: "label 1",
          data: "data 1"
        };
        const notSelectedOption = {
          value: "value 2",
          label: "label 2",
          data: "data 2"
        };
        expect(
          allOptionsExists(
            [selectedOption, notSelectedOption],
            [selectedOption]
          )
        ).toBe(false);
      });
    });

    describe("when all exists in value", () => {
      it("returns false", () => {
        const selectedOption = {
          value: "value 1",
          label: "label 1",
          data: "data 1"
        };
        const selectedOption2 = {
          value: "value 2",
          label: "label 2",
          data: "data 2"
        };
        expect(
          allOptionsExists(
            [selectedOption, selectedOption2],
            [selectedOption, selectedOption2]
          )
        ).toBe(true);
      });
    });
  });

  describe("convert dropdown option to internal option", () => {
    it("works", () => {
      const option: DropdownOption<string> = {
        data: "data",
        label: "label",
        value: "string"
      };

      const internalOption: InternalDropdownOption<string> = {
        data: "data",
        label: "label",
        value: "string"
      };

      expect(convertDropdownOptionToInternalOption(option)).toEqual(
        internalOption
      );
    });
  });

  describe("convert grouped dropdown option to internal option", () => {
    it("works", () => {
      const options = [
        {
          data: "data 1",
          label: "label 1",
          value: "string 1"
        }
      ];
      const option: GroupType<DropdownOption<string>> = {
        label: "label",
        value: "string",
        options
      };

      const internalOption: InternalDropdownOption<string> = {
        data: "label",
        label: "label",
        value: "label",
        internalOptions: options
      };

      expect(convertGroupedDropdownOptionToInternalOption(option)).toEqual(
        internalOption
      );
    });
  });

  describe("convert internal option to dropdown option", () => {
    it("works", () => {
      const option: DropdownOption<string> = {
        data: "data",
        label: "label",
        value: "string"
      };

      const internalOption: InternalDropdownOption<string> = {
        data: "data",
        label: "label",
        value: "string",
        internalOptions: []
      };

      expect(convertInternalOptionToDropdownOption(internalOption)).toEqual(
        option
      );
    });
  });
});
