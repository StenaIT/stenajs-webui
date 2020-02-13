import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Column, Row } from "@stenajs-webui/core";
import {
  ButtonSize,
  NewButton,
  SecondaryButton
} from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Icon } from "../../..";

const buttonSizes: ButtonSize[] = ["small", "normal", "large"];

storiesOf("elements/Buttons/NewButton", module)
  .add("default", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Column alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <Row key={size}>
              <ButtonVariant
                size={size}
                label={"Submit"}
                onClick={action("Button clicked")}
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                disabled
                onClick={action("Button clicked")}
              />
              <ButtonVariant
                size={size}
                leftIcon={faCoffee}
                onClick={action("Button clicked")}
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                leftIcon={faCoffee}
                onClick={action("Button clicked")}
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                rightIcon={faCoffee}
                onClick={action("Button clicked")}
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                leftIcon={faCheck}
                rightIcon={faCoffee}
                onClick={action("Button clicked")}
              />
            </Row>
          ))}
        </Column>
      ))}
    </>
  ))
  .add("with loading", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              loading={boolean("Loading", true)}
              onClick={action("Button clicked")}
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with loading label", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              loading={boolean("Loading", true)}
              loadingLabel={"Loading..."}
              onClick={action("Button clicked")}
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with success", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              success={boolean("Success", true)}
              onClick={action("Button clicked")}
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with success label", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              success={boolean("Success", true)}
              successLabel={"Done!"}
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with right content", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          <ButtonVariant
            size={"large"}
            label={"Submit"}
            right={
              <Row width={35} justifyContent={"flex-end"}>
                <Column
                  justifyContent={"center"}
                  alignItems={"center"}
                  background={"#fe2266"}
                  borderRadius={"50%"}
                  width={24}
                  height={24}
                >
                  <Icon icon={faCheck} color={"white"} />
                </Column>
              </Row>
            }
          />
        </Row>
      ))}
    </>
  ));
