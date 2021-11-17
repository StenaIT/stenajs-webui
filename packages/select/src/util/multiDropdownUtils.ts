import { differenceWith, intersectionWith, isEqual, uniqWith } from "lodash";
import { ActionMeta, GroupBase, OnChangeValue, Options } from "react-select";
import { OnChange } from "../components/ui/GroupedMultiSelect";
import { DropdownOption } from "../components/ui/GroupedMultiSelectTypes";

export type GroupedOptionsType<TOption> = ReadonlyArray<
  GroupBase<TOption> & { value: string }
>;

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
  internalOptions: Options<DropdownOption<TData>>;
}

const removeGroupedOptionsType = <TData>(
  removedValue: InternalParentDropdownOption<TData>,
  selectedInternalOptions: Options<InternalDropdownOption<TData>>
): Options<InternalDropdownOption<TData>> =>
  differenceWith(
    selectedInternalOptions,
    [...removedValue.internalOptions, removedValue],
    isEqual
  ).map(convertInternalOptionToDropdownOption);

const removeInternalOptions = <TData>(
  selectedInternalOption: InternalDropdownOption<TData>
): boolean => !("internalOptions" in selectedInternalOption);

const removeOptionHeaders = <TData>(
  selectedInternalOptions: Options<InternalDropdownOption<TData>>
): Options<InternalDropdownOption<TData>> =>
  selectedInternalOptions
    .filter(removeInternalOptions)
    .map(convertInternalOptionToDropdownOption);

export const createOnChange = <TData>(onChange: OnChange<TData>) => (
  selectedInternalOptions: OnChangeValue<InternalDropdownOption<TData>, true>,
  meta: ActionMeta<InternalDropdownOption<TData>>
) => {
  switch (meta.action) {
    case "select-option":
      if (meta.option && "internalOptions" in meta.option) {
        const selectedOptions: OnChangeValue<
          InternalDropdownOption<TData>,
          true
        > = uniqWith(
          selectedInternalOptions.reduce<Options<DropdownOption<TData>>>(
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
          removeGroupedOptionsType(
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
          removeGroupedOptionsType(
            meta.removedValue,
            removeOptionHeaders(selectedInternalOptions)
          ),
          meta
        );
      } else {
        onChange(removeOptionHeaders(selectedInternalOptions), meta);
      }
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
  values: Options<DropdownOption<TData>> | undefined
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
  options: Options<DropdownOption<TData>>,
  selectedValues: Options<DropdownOption<TData>> | undefined
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

// TODO: can this be done `any` other way
export const convertGroupedDropdownOptionToInternalOption = <TData>(
  option: GroupBase<DropdownOption<TData>>
): InternalDropdownOption<TData> => ({
  data: option.label as any,
  label: option.label as any,
  value: option.label as any,
  internalOptions: option.options,
});

export const convertInternalOptionToDropdownOption = <TData>(
  option: InternalDropdownOption<TData>
): DropdownOption<TData> => ({
  data: option.data,
  label: option.label,
  value: option.value,
});
