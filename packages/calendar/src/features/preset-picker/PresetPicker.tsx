import * as React from "react";
import { useMemo, useState } from "react";
import { createStandardDateRangePresets } from "./PresetFactory";
import { Column, Row, Space, Text } from "@stenajs-webui/core";
import {
  FlatButton,
  PrimaryButton,
  stenaAngleLeft,
  stenaAngleRight,
} from "@stenajs-webui/elements";
import { CalendarPreset } from "./CalendarPreset";

export interface PresetPickerProps {
  onClickPreset: (preset: CalendarPreset) => void;
}

export const PresetPicker: React.FC<PresetPickerProps> = ({
  onClickPreset,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = useMemo(() => createStandardDateRangePresets(new Date()), []);

  const currentPage = pages[pageIndex] ?? pages[0];

  return (
    <Column>
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"200px"}
      >
        <FlatButton
          size={"small"}
          leftIcon={stenaAngleLeft}
          disabled={pageIndex === 0}
          onClick={() => setPageIndex(pageIndex - 1)}
        />
        <Text>{currentPage.label}</Text>
        <FlatButton
          size={"small"}
          leftIcon={stenaAngleRight}
          disabled={pageIndex === pages.length - 1}
          onClick={() => setPageIndex(pageIndex + 1)}
        />
      </Row>
      <Space />
      <Column alignItems={"center"}>
        {currentPage.presets.map((preset) => (
          <React.Fragment key={preset.label}>
            <PrimaryButton
              label={preset.label}
              onClick={() => onClickPreset(preset)}
            />
            <Space />
          </React.Fragment>
        ))}
      </Column>
    </Column>
  );
};
