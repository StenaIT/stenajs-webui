import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Column, Row } from "@stenajs-webui/core";
import { NewButton, ButtonSize } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

const buttonSizes: ButtonSize[] = ["small", "normal", "large"];

storiesOf("elements/Buttons/NewButton", module)
  .add("default", () => (
    <Column alignItems={"flex-start"}>
      {buttonSizes.map(size => (
        <Row key={size}>
          <NewButton
            size={size}
            label={"Submit"}
            onClick={action("Button clicked")}
          />
          <NewButton
            size={size}
            label={"Submit"}
            disabled
            onClick={action("Button clicked")}
          />
          <NewButton
            size={size}
            leftIcon={faCoffee}
            onClick={action("Button clicked")}
          />
          <NewButton
            size={size}
            label={"Submit"}
            leftIcon={faCoffee}
            onClick={action("Button clicked")}
          />
          <NewButton
            size={size}
            label={"Submit"}
            rightIcon={faCoffee}
            onClick={action("Button clicked")}
          />
          <NewButton
            size={size}
            label={"Submit"}
            leftIcon={faCheck}
            rightIcon={faCoffee}
            onClick={action("Button clicked")}
          />
        </Row>
      ))}
    </Column>
  ))
  .add("with loading", () => (
    <NewButton label={"Submit"} loading onClick={action("Button clicked")} />
  ))
  .add("with loading label", () => (
    <NewButton
      label={"Submit"}
      loading
      loadingLabel={"Loading..."}
      onClick={action("Button clicked")}
    />
  ))
  .add("with success", () => (
    <NewButton label={"Submit"} success onClick={action("Button clicked")} />
  ))
  .add("with success label", () => (
    <NewButton label={"Submit"} success successLabel={"Done!"} />
  ));
