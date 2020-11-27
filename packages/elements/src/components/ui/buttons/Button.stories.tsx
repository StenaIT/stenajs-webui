import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonSize, ButtonVariant } from "./common/ButtonCommon";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { FlatButton } from "./FlatButton";
import { Icon } from "../icon/Icon";
import { Story } from "@storybook/react";

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
                  <ButtonVariant size={size} leftIcon={faCoffee} />
                </td>
                <td>
                  <ButtonVariant size={size} leftIcon={faCoffee} disabled />
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
          <Text size={"large"}>{variant}</Text>
          <Space />
          <Row alignItems={"flex-start"} indent spacing>
            {buttonSizes.map((size) => (
              <Indent>
                <PrimaryButton
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
    {(["normal", "danger", "success"] as Array<ButtonVariant>).map(
      (variant) => (
        <Column>
          <Text size={"large"}>{variant} (disabled)</Text>
          <Space />
          <Row alignItems={"flex-start"} indent spacing>
            {buttonSizes.map((size) => (
              <Indent>
                <PrimaryButton
                  key={size}
                  size={size}
                  variant={variant}
                  label={"Submit"}
                  disabled
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
