import { Column, Row, Space, Spacing } from "@stenajs-webui/core";
import { Chip, FlatButton } from "@stenajs-webui/elements";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import * as React from "react";
import { PropsWithChildren } from "react";

export interface ChipRowItem {
  label: string;
  value: string;
}

export interface ChipRowProps<TValue>
  extends ValueAndOnValueChangeProps<TValue> {
  noneSelectedLabel?: string;
}

export function ChipRow<TValue extends ChipRowItem>({
  value,
  onValueChange,
  noneSelectedLabel = "None",
  children,
}: PropsWithChildren<ChipRowProps<ReadonlyArray<TValue>>>) {
  return (
    <Column flex={1}>
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
