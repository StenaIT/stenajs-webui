import {
  ButtonSize,
  ButtonVariant,
  FlatButtonLink,
  Icon,
  PrimaryButtonLink,
  SecondaryButtonLink,
} from "@stenajs-webui/elements";
import {
  Column,
  Indent,
  LargeText,
  Row,
  Space,
  StandardText,
} from "@stenajs-webui/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import * as React from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";

const buttonSizes: Array<ButtonSize> = ["small", "normal", "large"];

export default {
  title: "elements/ButtonLinks",
};

export const Overview = () => (
  <>
    {[
      { ButtonVariant: PrimaryButtonLink, label: "PrimaryButtonLink" },
      { ButtonVariant: SecondaryButtonLink, label: "SecondaryButtonLink" },
      { ButtonVariant: FlatButtonLink, label: "FlatButtonLink" },
    ].map(({ label, ButtonVariant }) => (
      <Column alignItems={"flex-start"}>
        <LargeText>{label}</LargeText>
        <Space />
        <table cellPadding={"8px"}>
          <thead>
            <tr>
              <th style={{ textAlign: "start" }}>
                <StandardText>Size</StandardText>
              </th>
              <th style={{ textAlign: "start" }}>
                <StandardText>Standard</StandardText>
              </th>
              <th style={{ textAlign: "start" }}>
                <StandardText>Icon only</StandardText>
              </th>
              <th style={{ textAlign: "start" }}>
                <StandardText>Left icon</StandardText>
              </th>
              <th style={{ textAlign: "start" }}>
                <StandardText>Right icon</StandardText>
              </th>
              <th style={{ textAlign: "start" }}>
                <StandardText>Both icons</StandardText>
              </th>
            </tr>
          </thead>
          <tbody>
            {buttonSizes.map((size) => (
              <tr>
                <td>
                  <StandardText>{size}</StandardText>
                </td>
                <td>
                  <div style={{ display: "inline-block" }}>
                    <ButtonVariant
                      size={size}
                      label={"google.com"}
                      href={"https://google.com"}
                      target={"_blank"}
                    />
                  </div>
                </td>
                <td>
                  <div style={{ display: "inline-block" }}>
                    <ButtonVariant size={size} leftIcon={faGoogle} />
                  </div>
                </td>
                <td>
                  <div style={{ display: "inline-block" }}>
                    <ButtonVariant
                      size={size}
                      label={"google.com"}
                      href={"https://google.com"}
                      target={"_blank"}
                      leftIcon={faGoogle}
                    />
                  </div>
                </td>
                <td>
                  <div style={{ display: "inline-block" }}>
                    <ButtonVariant
                      size={size}
                      label={"google.com"}
                      href={"https://google.com"}
                      target={"_blank"}
                      rightIcon={faGoogle}
                    />
                  </div>
                </td>
                <td>
                  <div style={{ display: "inline-block" }}>
                    <ButtonVariant
                      size={size}
                      label={"google.com"}
                      href={"https://google.com"}
                      target={"_blank"}
                      leftIcon={faCheck}
                      rightIcon={faGoogle}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Space num={8} />
      </Column>
    ))}
  </>
);

export const Variants = () => (
  <>
    {(["normal", "danger", "success"] as Array<ButtonVariant>).map(
      (variant) => (
        <Column>
          <LargeText>{variant}</LargeText>
          <Space />
          <Row alignItems={"flex-start"} indent spacing>
            {buttonSizes.map((size) => (
              <Indent>
                <PrimaryButtonLink
                  key={size}
                  size={size}
                  variant={variant}
                  label={"google.com"}
                  href={"https://google.com"}
                  target={"_blank"}
                />
              </Indent>
            ))}
          </Row>
        </Column>
      )
    )}
  </>
);

export const WithGenericContentToRight = () => (
  <>
    {[
      { ButtonVariant: PrimaryButtonLink, label: "PrimaryButtonLink" },
      { ButtonVariant: SecondaryButtonLink, label: "SecondaryButtonLink" },
      { ButtonVariant: FlatButtonLink, label: "FlatButtonLink" },
    ].map(({ ButtonVariant, label }) => (
      <Column spacing>
        <LargeText>{label}</LargeText>
        <Space />
        <Row alignItems={"flex-start"}>
          <ButtonVariant
            size={"large"}
            label={"google.com"}
            href={"https://google.com"}
            target={"_blank"}
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
      </Column>
    ))}
  </>
);
