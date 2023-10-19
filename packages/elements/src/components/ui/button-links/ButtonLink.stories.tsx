import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { ButtonSize, ButtonVariant } from "../buttons/common/ButtonCommon";
import { PrimaryButtonLink } from "./PrimaryButtonLink";
import { SecondaryButtonLink } from "./SecondaryButtonLink";
import { FlatButtonLink } from "./FlatButtonLink";
import { Icon } from "../icon/Icon";
import { stenaCheck } from "../../../icons/generated/CommonIcons";

const buttonSizes: Array<ButtonSize> = ["small", "medium", "large"];

export default {
  title: "elements/ButtonLinks",
  component: PrimaryButtonLink,
  subcomponents: { SecondaryButtonLink, FlatButtonLink },
};

export const Overview = () => (
  <>
    {[
      { ButtonVariant: PrimaryButtonLink, label: "PrimaryButtonLink" },
      { ButtonVariant: SecondaryButtonLink, label: "SecondaryButtonLink" },
      { ButtonVariant: FlatButtonLink, label: "FlatButtonLink" },
    ].map(({ label, ButtonVariant }) => (
      <Column alignItems={"flex-start"}>
        <Text size={"large"}>{label}</Text>
        <Space />
        <table cellPadding={"8px"}>
          <thead>
            <tr>
              <th style={{ textAlign: "start" }}>
                <Text>Size</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Standard</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Icon only</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Left icon</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Right icon</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Both icons</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {buttonSizes.map((size) => (
              <tr>
                <td>
                  <Text>{size}</Text>
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
                      leftIcon={stenaCheck}
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
          <Text size={"large"}>{variant}</Text>
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
        <Text size={"large"}>{label}</Text>
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
                  <Icon icon={stenaCheck} color={"white"} />
                </Column>
              </Row>
            }
          />
        </Row>
      </Column>
    ))}
  </>
);
