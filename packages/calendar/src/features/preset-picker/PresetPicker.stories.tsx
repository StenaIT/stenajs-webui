import * as React from "react";
import { PresetPicker } from "@stenajs-webui/calendar";

export default {
  title: "calendar/Pickers/PresetPicker",
};

export const Standard = () => (
  <div style={{ display: "inline-block" }}>
    <PresetPicker onClickPreset={() => {}} />
  </div>
);
