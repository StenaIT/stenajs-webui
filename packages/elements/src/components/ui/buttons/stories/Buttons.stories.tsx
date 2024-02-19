import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonSize, ButtonVariant } from "../common/ButtonCommon";
import { PrimaryButton, PrimaryButtonProps } from "../PrimaryButton";
import { SecondaryButton } from "../SecondaryButton";
import { FlatButton } from "../FlatButton";
import { Icon } from "../../icon/Icon";
import { StoryFn } from "@storybook/react";
import { stenaCheck } from "../../../../icons/generated/CommonIcons";
import {
  stenaArrowRight,
  stenaArrowShortRight,
} from "../../../../icons/generated/ArrowIcons";

const buttonSizes: Array<ButtonSize> = ["small", "medium", "large", "larger"];

export default {
  title: "elements/Buttons",
  component: PrimaryButton,
  subcomponents: { SecondaryButton, FlatButton },
};

export const Demo: StoryFn<PrimaryButtonProps> = (props) => (
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
                  <ButtonVariant size={size} leftIcon={stenaArrowRight} />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    leftIcon={stenaArrowRight}
                    disabled
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    leftIcon={stenaArrowRight}
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    rightIcon={stenaArrowShortRight}
                  />
                </td>
                <td>
                  <ButtonVariant
                    size={size}
                    label={"Submit"}
                    leftIcon={stenaCheck}
                    rightIcon={stenaArrowShortRight}
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
        {(
          ["normal", "danger", "success", "passive"] as Array<ButtonVariant>
        ).map((variant) => (
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
        ))}
        <Space num={8} />
      </Column>
    ))}
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
