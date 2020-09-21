import * as React from "react";
import { useMemo, useState } from "react";
import { createStandardDateRangePresets } from "./PresetFactory";
import { Column, Row, Space, StandardText } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { CalendarPreset } from "./CalendarPreset";

interface Props {
  onClickPreset: (preset: CalendarPreset) => void;
}

export const PresetPicker: React.FC<Props> = ({ onClickPreset }) => {
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
          leftIcon={faAngleLeft}
          disabled={pageIndex === 0}
          onClick={() => setPageIndex(pageIndex - 1)}
        />
        <StandardText>{currentPage.label}</StandardText>
        <FlatButton
          size={"small"}
          leftIcon={faAngleRight}
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
