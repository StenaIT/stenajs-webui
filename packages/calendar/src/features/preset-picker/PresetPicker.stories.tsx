import * as React from "react";
import { PresetPicker } from "./PresetPicker";

export default {
  title: "calendar/Pickers/PresetPicker",
  component: PresetPicker,
};

export const Standard = () => (
  <div style={{ display: "inline-block" }}>
    <PresetPicker onClickPreset={() => {}} />
  </div>
);
