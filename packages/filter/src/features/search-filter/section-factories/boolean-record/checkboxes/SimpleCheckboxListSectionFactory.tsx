import {
  SearchFilterSectionChips,
  SearchFilterSectionOnClickRemoveOnChip,
  SearchFilterSectionRender,
  SetFormModelFields,
} from "../../../config/SearchFilterConfig";
import { Column, Row } from "@stenajs-webui/core";
import { CheckboxWithLabel } from "@stenajs-webui/forms";
import * as React from "react";
import { BooleanRecord, BooleanRecordData } from "../BooleanRecordTypes";

export const createSimpleCheckboxListSection = <TFormModel extends {}>(
  fieldProvider: (formModel: TFormModel) => BooleanRecord,
  fieldSetter: (
    setFormModelFields: SetFormModelFields<TFormModel>,
    record: BooleanRecord
  ) => void
): {
  chips: SearchFilterSectionChips<TFormModel>;
  onClickRemoveOnChip: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
  renderEditor: SearchFilterSectionRender<TFormModel, BooleanRecordData>;
} => ({
  chips: ({ formModel }) => {
    const record = fieldProvider(formModel);
    const routes = Object.keys(record);
    return routes
      .filter((route) => record[route])
      .map((r) => ({ value: r, label: r }));
  },
  onClickRemoveOnChip: ({ value, formModel, setFormModelFields }) => {
    const newRecord = { ...fieldProvider(formModel) } as BooleanRecord;
    delete newRecord[value];
    fieldSetter(setFormModelFields, newRecord);
  },
  renderEditor: ({ formModel, data, setFormModelFields }) => (
    <Column maxHeight={"400px"} overflowY={"auto"} flex={1}>
      {data?.map((d) => (
        <Row spacing={0.5} key={d.id}>
          <CheckboxWithLabel
            label={d.label}
            value={fieldProvider(formModel)[d.id]}
            onValueChange={(sel) =>
              fieldSetter(setFormModelFields, {
                ...fieldProvider(formModel),
                [d.id]: sel,
              })
            }
          />
        </Row>
      ))}
    </Column>
  ),
});
