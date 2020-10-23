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
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import * as React from "react";

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
              <th style={{ textAlign: "start" }}>
                <StandardText>Loading</StandardText>
              </th>
              <th style={{ textAlign: "start" }}>
                <StandardText>Success</StandardText>
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
                  <ButtonVariant size={size} label={"Submit"} />
                </td>
                <td>
                  <ButtonVariant size={size} leftIcon={faCoffee} />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    leftIcon={faCoffee}
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    rightIcon={faCoffee}
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    leftIcon={faCheck}
                    rightIcon={faCoffee}
                  />
                </td>
                <td>
                  <Row>
                    <ButtonVariant size={size} loading />
                    <Space />
                    <ButtonVariant
                      size={size}
                      loading
                      loadingLabel={"Loading"}
                    />
                  </Row>
                </td>
                <td>
                  <Row>
                    <ButtonVariant size={size} success />
                    <Space />
                    <ButtonVariant size={size} success successLabel={"Done"} />
                  </Row>
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
                  label={"Submit"}
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
      </Column>
    ))}
  </>
);
