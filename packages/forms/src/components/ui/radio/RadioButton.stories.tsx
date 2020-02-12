import {
  defaultRadioButtonTheme,
  defaultRadioButtonThemeDark,
  RadioButton,
  RadioButtonWithLabel
} from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Column } from "../../../../../core/src/components/layout/column/Column";
import { Row } from "../../../../../core/src/components/layout/row/Row";
import { Space } from "../../../../../core/src/components/layout/space/Space";
import { HeaderText } from "../../../../../core/src/components/text/variants/HeaderText";
import { LargeText } from "../../../../../core/src/components/text/variants/LargeText";
import { StandardText } from "../../../../../core/src/components/text/variants/StandardText";

const RadioButtonOverview: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled(v => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <HeaderText>RadioButton</HeaderText>

      <Space num={2} />

      <LargeText fontWeight={"bold"}>Clickable and knobs</LargeText>

      <Space num={2} />

      <RadioButton
        value={knobs.boolean("Checked", false)}
        disabled={knobs.boolean("Disabled", false)}
      />

      <Space num={2} />

      <RadioButton
        size={"small"}
        value={knobs.boolean("Checked", false)}
        disabled={knobs.boolean("Disabled", false)}
      />

      <Space num={8} />

      <LargeText fontWeight={"bold"}>Transitions</LargeText>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <StandardText>Checked on/off</StandardText>
          <RadioButton value={isEnabled} />

          <Space num={2} />

          <StandardText>Disabled, checked on/off</StandardText>
          <RadioButton value={isEnabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <StandardText>Checked, disabled on/off</StandardText>
          <RadioButton value disabled={isEnabled} />

          <Space num={2} />

          <StandardText>Not checked, disabled on/off</StandardText>
          <RadioButton disabled={isEnabled} />
        </Column>
      </Row>
    </Column>
  );
};

storiesOf("forms/RadioButton", module)
  .add("Overview", () => <RadioButtonOverview />)
  .add("standard", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  ))
  .add("with DOM name", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
      name={knobs.text("Name", "agree")}
    />
  ))
  .add("checked and disabled", () => <RadioButton value={true} disabled />)
  .add("not checked and disabled", () => <RadioButton value={false} disabled />)
  .add("with dark theme", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      theme={defaultRadioButtonThemeDark}
    />
  ))
  .add("with custom theme", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      theme={{
        ...defaultRadioButtonTheme,
        iconColorNotChecked: "magenta",
        iconColor: "darkgreen",
        iconSize: 40
      }}
    />
  ));

storiesOf("forms/RadioButton/RadioButtonWithLabel", module)
  .add("standard", () => (
    <RadioButtonWithLabel
      label={"Add cake"}
      value={knobs.boolean("Checked", false)}
    />
  ))
  .add("with custom theme", () => (
    <RadioButtonWithLabel
      label={"Add cake"}
      value={knobs.boolean("Checked", false)}
      textColor="lightblue"
      textSize={"40px"}
      theme={{
        ...defaultRadioButtonTheme,
        iconColor: "pink",
        iconSize: 40
      }}
    />
  ));
