import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Column, Row } from "@stenajs-webui/core";
import {
  ButtonSize,
  Icon,
  PrimaryButton,
  SecondaryButton
} from "@stenajs-webui/elements";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

const buttonSizes: ButtonSize[] = ["small", "normal", "large"];

storiesOf("elements/Buttons/PrimaryButton", module)
  .add("default", () => (
    <>
      {[PrimaryButton, SecondaryButton].map(ButtonVariant => (
        <Column alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <Row key={size}>
              <ButtonVariant size={size} label={"Submit"} indent spacing />
              <ButtonVariant
                size={size}
                label={"Submit"}
                disabled
                indent
                spacing
              />
              <ButtonVariant size={size} leftIcon={faCoffee} indent spacing />
              <ButtonVariant
                size={size}
                label={"Submit"}
                leftIcon={faCoffee}
                indent
                spacing
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                rightIcon={faCoffee}
                indent
                spacing
              />
              <ButtonVariant
                size={size}
                label={"Submit"}
                leftIcon={faCheck}
                rightIcon={faCoffee}
                indent
                spacing
              />
            </Row>
          ))}
        </Column>
      ))}
    </>
  ))
  .add("with loading", () => (
    <>
      {[PrimaryButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              loading={boolean("Loading", true)}
              indent
              spacing
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with loading label", () => (
    <>
      {[PrimaryButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              loading={boolean("Loading", true)}
              loadingLabel={"Loading..."}
              indent
              spacing
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with success", () => (
    <>
      {[PrimaryButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              success={boolean("Success", true)}
              indent
              spacing
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with success label", () => (
    <>
      {[PrimaryButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          {buttonSizes.map(size => (
            <ButtonVariant
              key={size}
              size={size}
              label={"Submit"}
              success={boolean("Success", true)}
              successLabel={"Done!"}
              indent
              spacing
            />
          ))}
        </Row>
      ))}
    </>
  ))
  .add("with generic content to right", () => (
    <>
      {[PrimaryButton, SecondaryButton].map(ButtonVariant => (
        <Row alignItems={"flex-start"}>
          <ButtonVariant
            indent
            spacing
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
