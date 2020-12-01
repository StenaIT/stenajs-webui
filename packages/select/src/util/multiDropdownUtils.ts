import { differenceWith, intersectionWith, isEqual, uniqWith } from "lodash";
import {
  ActionMeta,
  GroupedOptionsType,
  GroupType,
  OptionsType,
  ValueType,
} from "react-select";
import { OnChange, OnChangeValue } from "../components/ui/GroupedMultiSelect";
import { DropdownOption } from "../components/ui/GroupedMultiSelectTypes";

export type InternalDropdownOption<TData> =
  | InternalChildOption<TData>
  | InternalParentDropdownOption<TData>;

interface InternalChildOption<TData> {
  data: TData;
  label: string;
  value: string;
}

interface InternalParentDropdownOption<TData> {
  data: TData;
  label: string;
  value: string;
  internalOptions: OptionsType<DropdownOption<TData>>;
}

interface SelectActionMeta<TData> extends ActionMeta<DropdownOption<TData>> {
  option?: InternalDropdownOption<TData>;
  action: "select-option" | "deselect-option";
}

interface RemoveActionMeta<TData> extends ActionMeta<DropdownOption<TData>> {
  removedValue?: InternalDropdownOption<TData>;
  action: "remove-value" | "pop-value";
}

interface ClearActionMeta extends ActionMeta<any> {
  action: "clear";
}

interface RestActionMeta extends ActionMeta<any> {
  action: "set-value" | "create-option";
}

export type Meta<TData> =
  | ClearActionMeta
  | SelectActionMeta<TData>
  | RemoveActionMeta<TData>
  | RestActionMeta;

const removeGroupedOptions = <TData>(
  removedValue: InternalParentDropdownOption<TData>,
  selectedInternalOptions: OptionsType<InternalDropdownOption<TData>>
): OptionsType<InternalDropdownOption<TData>> =>
  differenceWith(
    selectedInternalOptions,
    [...removedValue.internalOptions, removedValue],
    isEqual
  ).map(convertInternalOptionToDropdownOption);

const removeInternalOptions = <TData>(
  selectedInternalOption: InternalDropdownOption<TData>
): boolean => !("internalOptions" in selectedInternalOption);

const removeOptionHeaders = <TData>(
  selectedInternalOptions: OptionsType<InternalDropdownOption<TData>>
): OptionsType<InternalDropdownOption<TData>> =>
  selectedInternalOptions
    .filter(removeInternalOptions)
    .map(convertInternalOptionToDropdownOption);

export const createOnChange = <TData>(onChange: OnChange<TData>) => (
  incomingSelectedInternalOptions: ValueType<InternalDropdownOption<TData>>,
  meta: Meta<TData>
) => {
  const selectedInternalOptions = (() => {
    if (!incomingSelectedInternalOptions) {
      return [];
    } else if ("length" in incomingSelectedInternalOptions) {
      return incomingSelectedInternalOptions;
    } else {
      return [incomingSelectedInternalOptions];
    }
  })();

  switch (meta.action) {
    case "select-option":
      if (meta.option && "internalOptions" in meta.option) {
        const selectedOptions: OnChangeValue<TData> = uniqWith(
          selectedInternalOptions.reduce<OptionsType<DropdownOption<TData>>>(
            (previousValue, currentValue) => {
              if ("internalOptions" in currentValue) {
                return [...previousValue, ...currentValue.internalOptions];
              } else {
                return [
                  ...previousValue,
                  convertInternalOptionToDropdownOption(currentValue),
                ];
              }
            },
            []
          ),
          isEqual
        );

        onChange(selectedOptions, meta);
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions), meta);
      }
      break;
    case "deselect-option":
      if (meta.option && "internalOptions" in meta.option) {
        onChange(
          removeGroupedOptions(
            meta.option,
            removeOptionHeaders(selectedInternalOptions)
          ),
          meta
        );
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions), meta);
      }
      break;
    case "remove-value":
    case "pop-value":
      if (meta.removedValue && "internalOptions" in meta.removedValue) {
        onChange(
          removeGroupedOptions(
            meta.removedValue,
            removeOptionHeaders(selectedInternalOptions)
          ),
          meta
        );
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions), meta);
      }
      break;
    case "set-value":
      onChange(
        selectedInternalOptions.map(convertInternalOptionToDropdownOption),
        meta
      );
      break;
    case "clear":
      onChange(
        selectedInternalOptions.map(convertInternalOptionToDropdownOption),
        meta
      );
      break;
    case "create-option":
      onChange(
        selectedInternalOptions.map(convertInternalOptionToDropdownOption),
        meta
      );
      break;
    default:
      break;
  }
};

export const convertGroupedDropdownOptionsToInternalOptions = <TData>(
  options: GroupedOptionsType<DropdownOption<TData>>
): InternalDropdownOption<TData>[] => {
  return options.reduce<InternalDropdownOption<TData>[]>(
    (previousValue, currentValue) => {
      return [
        ...previousValue,
        convertGroupedDropdownOptionToInternalOption(currentValue),
        ...currentValue.options.map(convertDropdownOptionToInternalOption),
      ];
    },
    []
  );
};

export const convertValueToInternalValue = <TData>(
  options: GroupedOptionsType<DropdownOption<TData>>,
  values: OptionsType<DropdownOption<TData>> | undefined
): InternalDropdownOption<TData>[] => {
  if (!values) {
    return [];
  }
  const selectedOptions: InternalDropdownOption<TData>[] = [];
  options.forEach((option) => {
    if (allOptionsExists(option.options, values)) {
      selectedOptions.push(
        convertGroupedDropdownOptionToInternalOption(option)
      );
    }
    selectedOptions.push(
      ...intersectionWith(option.options, values, isEqual).map((option) =>
        convertDropdownOptionToInternalOption(option)
      )
    );
  });
  return selectedOptions;
};

export const allOptionsExists = <TData>(
  options: OptionsType<DropdownOption<TData>>,
  selectedValues: OptionsType<DropdownOption<TData>> | undefined
): boolean => {
  if (!selectedValues) {
    return false;
  }

  return (
    intersectionWith(options, selectedValues, isEqual).length === options.length
  );
};

export const convertDropdownOptionToInternalOption = <TData>(
  option: DropdownOption<TData>
): InternalDropdownOption<TData> => ({
  data: option.data,
  label: option.label,
  value: option.value,
});

export const convertGroupedDropdownOptionToInternalOption = <TData>(
  option: GroupType<DropdownOption<TData>>
): InternalDropdownOption<TData> => ({
  data: option.label,
  label: option.label,
  value: option.label,
  internalOptions: option.options,
});

export const convertInternalOptionToDropdownOption = <TData>(
  option: InternalDropdownOption<TData>
): DropdownOption<TData> => ({
  data: option.data,
  label: option.label,
  value: option.value,
});
