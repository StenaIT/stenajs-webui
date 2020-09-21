import { isEqual, uniqWith } from "lodash";
import {
  ActionMeta,
  GroupedOptionsType,
  GroupType,
  OptionsType,
} from "react-select/src/types";
import {
  DropdownOption,
  OnChange,
  OnChangeValue,
} from "../components/ui/GroupedMultiSelect";

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

interface SelectActionMeta<TData> extends ActionMeta<any> {
  option: InternalDropdownOption<TData>;
  action: "select-option" | "deselect-option";
}

interface RemoveActionMeta<TData> extends ActionMeta<any> {
  removedValue: InternalDropdownOption<TData>;
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
): OptionsType<InternalDropdownOption<TData>> => {
  const removeSubOptions = (option: InternalDropdownOption<TData>) => {
    return !removedValue.internalOptions.find((internalOption) =>
      isEqual(internalOption, option)
    );
  };
  const removeOwn = (option: InternalDropdownOption<TData>) => {
    return !isEqual(option, removedValue);
  };
  return selectedInternalOptions
    .filter(removeSubOptions)
    .filter(removeOwn)
    .map(convertInternalOptionToDropdownOption);
};

export const findParentOption = <TData>(
  selectedInternalOptions: OptionsType<InternalDropdownOption<TData>>,
  meta: SelectActionMeta<TData>
): InternalDropdownOption<TData> | undefined =>
  selectedInternalOptions
    .filter((internalOption) => "internalOptions" in internalOption)
    .find((internalOption) => {
      return (
        "internalOptions" in internalOption &&
        internalOption.internalOptions.find((io) => isEqual(io, meta.option))
      );
    });

const removeOptionHeaders = <TData>(
  selectedInternalOptions: OptionsType<InternalDropdownOption<TData>>
): OptionsType<InternalDropdownOption<TData>> =>
  selectedInternalOptions
    .filter(
      (selectedInternalOption) => !("internalOptions" in selectedInternalOption)
    )
    .map(convertInternalOptionToDropdownOption);

export const createOnChange = <TData>(onChange: OnChange<TData>) => (
  selectedInternalOptions:
    | OptionsType<InternalDropdownOption<TData>>
    | undefined,
  meta: Meta<TData>
) => {
  switch (meta.action) {
    case "select-option":
      if ("internalOptions" in meta.option) {
        const selectedOptions: OnChangeValue<TData> = uniqWith(
          (selectedInternalOptions || []).reduce<
            OptionsType<DropdownOption<TData>>
          >((previousValue, currentValue) => {
            if ("internalOptions" in currentValue) {
              return [...previousValue, ...currentValue.internalOptions];
            } else {
              return [
                ...previousValue,
                convertInternalOptionToDropdownOption(currentValue),
              ];
            }
          }, []),
          isEqual
        );

        onChange(selectedOptions, meta);
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions || []), meta);
      }
      break;
    case "deselect-option":
      if ("internalOptions" in meta.option) {
        onChange(
          removeGroupedOptions(
            meta.option,
            removeOptionHeaders(selectedInternalOptions || [])
          ),
          meta
        );
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions || []), meta);
      }
      break;
    case "remove-value":
    case "pop-value":
      if ("internalOptions" in meta.removedValue) {
        onChange(
          removeGroupedOptions(
            meta.removedValue,
            removeOptionHeaders(selectedInternalOptions || [])
          ),
          meta
        );
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions || []), meta);
      }
      break;
    case "set-value":
      onChange(
        (selectedInternalOptions || []).map(
          convertInternalOptionToDropdownOption
        ),
        meta
      );
      break;
    case "clear":
      onChange(
        (selectedInternalOptions || []).map(
          convertInternalOptionToDropdownOption
        ),
        meta
      );
      break;
    case "create-option":
      onChange(
        (selectedInternalOptions || []).map(
          convertInternalOptionToDropdownOption
        ),
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
  value: OptionsType<DropdownOption<TData>> | undefined
): InternalDropdownOption<TData>[] => {
  if (!value) {
    return [];
  }
  const selectedOptions: InternalDropdownOption<TData>[] = [];
  options.forEach((option) => {
    if (allOptionsExists(option.options, value)) {
      selectedOptions.push(
        convertGroupedDropdownOptionToInternalOption(option)
      );
    }
    option.options.forEach((option) => {
      if (
        value.find((val) => {
          return isEqual(val, option);
        })
      ) {
        selectedOptions.push(convertDropdownOptionToInternalOption(option));
      }
    });
  });
  return selectedOptions;
};

export const allOptionsExists = <TData>(
  options: OptionsType<DropdownOption<TData>>,
  value: OptionsType<DropdownOption<TData>> | undefined
) => {
  if (!value) {
    return false;
  }
  return options.every((option) => {
    return value.find((val) => isEqual(option, val));
  });
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
