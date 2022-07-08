import { faJedi } from "@fortawesome/free-solid-svg-icons/faJedi";
import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonSize, ButtonVariant } from "./common/ButtonCommon";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { FlatButton } from "./FlatButton";
import { Icon } from "../icon/Icon";
import { Story } from "@storybook/react";
import { stenaCheck } from "../../../icons/ui/IconsUi";

const buttonSizes: Array<ButtonSize> = ["small", "medium", "large"];

export default {
  title: "elements/Buttons",
  component: PrimaryButton,
  subcomponents: { SecondaryButton, FlatButton },
};

export const Demo: Story<PrimaryButtonProps> = (props) => (
  <PrimaryButton {...props} />
);
Demo.args = {
  label: "Action",
};

export const Overview = () => (
  <>
    {[
      { ButtonVariant: PrimaryButton, label: "PrimaryButton" },
      { ButtonVariant: SecondaryButton, label: "SecondaryButton" },
      { ButtonVariant: FlatButton, label: "FlatButton" },
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
                <Text>Disabled</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Icon only</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Disabled icon</Text>
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
              <th style={{ textAlign: "start" }}>
                <Text>Loading</Text>
              </th>
              <th style={{ textAlign: "start" }}>
                <Text>Success</Text>
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
                  <ButtonVariant size={size} label={"Submit"} />
                </td>
                <td>
                  <ButtonVariant size={size} label={"Submit"} disabled />
                </td>
                <td>
                  <ButtonVariant size={size} leftIcon={faJedi} />
                </td>
                <td>
                  <ButtonVariant size={size} leftIcon={faJedi} disabled />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    leftIcon={faJedi}
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    rightIcon={faJedi}
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    leftIcon={stenaCheck}
                    rightIcon={faJedi}
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
    {[
      { ButtonVariant: PrimaryButton, label: "PrimaryButton" },
      { ButtonVariant: SecondaryButton, label: "SecondaryButton" },
      { ButtonVariant: FlatButton, label: "FlatButton" },
    ].map(({ label, ButtonVariant }) => (
      <Column>
        <Text size={"large"}>{label}</Text>
        <Space />
        {(["normal", "danger", "success"] as Array<ButtonVariant>).map(
          (variant) => (
            <Column>
              <Text size={"large"}>{variant}</Text>
              <Space />
              <Row alignItems={"flex-start"} indent spacing>
                <Indent>
                  <ButtonVariant
                    variant={variant}
                    label={"Submit"}
                    leftIcon={stenaCheck}
                  />
                </Indent>
                <Indent>
                  <ButtonVariant
                    variant={variant}
                    label={"Disabled"}
                    leftIcon={stenaCheck}
                    disabled
                  />
                </Indent>
              </Row>
            </Column>
          )
        )}
        <Space num={8} />
      </Column>
    ))}
  </>
);

export const FlatButtonInverted = () => (
  <Row background={"#2e4662"} spacing={2} indent={2}>
    <FlatButton inverted label={"Submit"} />
    <Space num={2} />
    <FlatButton inverted label={"Disabled"} disabled />
  </Row>
);

export const WithGenericContentToRight = () => (
  <>
    {[
      { ButtonVariant: PrimaryButton, label: "PrimaryButton" },
      { ButtonVariant: SecondaryButton, label: "SecondaryButton" },
      { ButtonVariant: FlatButton, label: "FlatButton" },
    ].map(({ ButtonVariant, label }) => (
      <Column spacing>
        <Text size={"large"}>{label}</Text>
        <Space />
        <Row alignItems={"flex-start"}>
          <ButtonVariant
            size={"large"}
            label={"Submit"}
            right={
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
            }
          />
        </Row>
      </Column>
    ))}
  </>
);

export const WithResponsiveWidth = () => (
  <Column spacing>
    <Text>Resize viewport to see button with width 100%</Text>
    <Space />
    <Row>
      <PrimaryButton width={["100%", "auto"]} label={"Button content"} />
    </Row>
  </Column>
);
