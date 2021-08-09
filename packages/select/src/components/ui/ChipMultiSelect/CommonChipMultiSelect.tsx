import { Column, Row, Space, Spacing } from "@stenajs-webui/core";
import { Chip, FlatButton } from "@stenajs-webui/elements";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import * as React from "react";
import { PropsWithChildren } from "react";

export interface CommonChipMultiSelectSelectValue {
  label: string;
  value: string;
}

export interface CommonChipMultiSelectProps<TValue>
  extends ValueAndOnValueChangeProps<TValue> {
  noneSelectedLabel?: string;
}

export function CommonChipMultiSelect<
  TValue extends CommonChipMultiSelectSelectValue
>({
  value,
  onValueChange,
  noneSelectedLabel = "None",
  children,
}: PropsWithChildren<CommonChipMultiSelectProps<Array<TValue>>>) {
  return (
    <Column>
      <Row flexWrap={"wrap"}>
        {value?.map((v) => (
          <Row key={v.value}>
            <Spacing num={0.5}>
              <Chip
                label={v.label}
                onClickRemove={() =>
                  onValueChange?.(
                    value?.filter((f) => f.value !== v.value) ?? []
                  )
                }
              />
            </Spacing>
            <Space />
          </Row>
        ))}
        {value?.length ? (
          <Spacing num={0.5}>
            <FlatButton
              size={"small"}
              label={"Clear"}
              onClick={() => onValueChange?.([])}
            />
          </Spacing>
        ) : (
          <Spacing num={0.5}>
            <Chip variant={"secondary"} label={noneSelectedLabel} />
          </Spacing>
        )}
      </Row>
      <Space num={0.5} />
      {children}
    </Column>
  );
}
