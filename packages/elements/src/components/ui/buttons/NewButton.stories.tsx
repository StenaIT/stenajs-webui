import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Column, Row } from "@stenajs-webui/core";
import {
  ButtonSize,
  NewButton,
  Icon,
  SecondaryButton
} from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

const buttonSizes: ButtonSize[] = ["small", "normal", "large"];

storiesOf("elements/Buttons/NewButton", module)
  .add("default", () => (
    <>
      {[NewButton, SecondaryButton].map(ButtonVariant => (
        <Column alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <Row key={size}>
              <ButtonVariant size={size} label={"Submit"} />
              <ButtonVariant size={size} label={"Submit"} disabled />
              <ButtonVariant size={size} leftIcon={faCoffee} />
              <ButtonVariant size={size} label={"Submit"} leftIcon={faCoffee} />
              <ButtonVariant
                size={size}
                label={"Submit"}
                rightIcon={faCoffee}
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                leftIcon={faCheck}
                rightIcon={faCoffee}
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
  .add("with generic content to right", () => (
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
