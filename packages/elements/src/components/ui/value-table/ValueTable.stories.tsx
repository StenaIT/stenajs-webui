import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { cssColor } from "@stenajs-webui/theme";
import { Story } from "@storybook/react";
import * as React from "react";
import { Icon } from "../icon/Icon";
import { ValueTable, ValueTableProps, ValueTableVariant } from "./ValueTable";
import { ValueTableItem } from "./ValueTableItem";
import { Heading, Spacing } from "@stenajs-webui/core";
import { Cardy } from "../cardy/Cardy";
import { CardyBody } from "../cardy/CardyBody";

export default {
  title: "elements/ValueTable",
  component: ValueTable,
  subcomponents: {
    ValueTableItem,
  },
};

export const Overview: Story<ValueTableProps> = (props) => (
  <ValueTable {...props}>
    <ValueTableItem label={"E-mail"} value={"user@example.com"} />
    <ValueTableItem label={"First name"} value={"Donald"} />
    <ValueTableItem label={"Last name"} value={"Duck"} />
    <ValueTableItem label={"Age"} value={42} />
    <ValueTableItem label={"Parents (undefined)"} value={undefined} />
    <ValueTableItem label={"Is duck (true)"} value={true} />
    <ValueTableItem label={"Is human (false)"} value={false} />
    <ValueTableItem
      label={"Drinks"}
      value={
        <Icon
          icon={faCoffee}
          size={14}
          color={cssColor("--lhds-color-orange-300")}
        />
      }
    />
  </ValueTable>
);

export const HeaderAndFooter = () => (
  <ValueTable header={"Duck information"} footer={"Last updated: 2 hours ago"}>
    <ValueTableItem label={"E-mail"} value={"user@example.com"} />
    <ValueTableItem label={"First name"} value={"Donald"} />
    <ValueTableItem label={"Last name"} value={"Duck"} />
    <ValueTableItem label={"Age"} value={42} />
    <ValueTableItem label={"Parents (undefined)"} value={undefined} />
    <ValueTableItem label={"Is duck (true)"} value={true} />
    <ValueTableItem label={"Is human (false)"} value={false} />
    <ValueTableItem
      label={"Drinks"}
      value={
        <Icon
          icon={faCoffee}
          size={14}
          color={cssColor("--lhds-color-orange-300")}
        />
      }
    />
  </ValueTable>
);

export const InsideCardy: Story<ValueTableProps> = (props) => (
  <Cardy>
    <CardyBody>
      <ValueTable {...props} disableBorder>
        <ValueTableItem label={"E-mail"} value={"user@example.com"} />
        <ValueTableItem label={"First name"} value={"Donald"} />
        <ValueTableItem label={"Last name"} value={"Duck"} />
        <ValueTableItem label={"Age"} value={42} />
        <ValueTableItem label={"Parents (undefined)"} value={undefined} />
        <ValueTableItem label={"Is duck (true)"} value={true} />
        <ValueTableItem label={"Is human (false)"} value={false} />
        <ValueTableItem
          label={"Drinks"}
          value={
            <Icon
              icon={faCoffee}
              size={14}
              color={cssColor("--lhds-color-orange-300")}
            />
          }
        />
      </ValueTable>
    </CardyBody>
  </Cardy>
);

export const AlignValueRight: Story<ValueTableProps> = (props) => (
  <ValueTable {...props}>
    <ValueTableItem
      label={"E-mail"}
      value={"user@example.com"}
      alignValue={"flex-end"}
    />
    <ValueTableItem
      label={"First name"}
      value={"Donald"}
      alignValue={"flex-end"}
    />
    <ValueTableItem
      label={"Last name"}
      value={"Duck"}
      alignValue={"flex-end"}
    />
    <ValueTableItem label={"Age"} value={42} alignValue={"flex-end"} />
    <ValueTableItem
      label={"Parents (undefined)"}
      value={undefined}
      alignValue={"flex-end"}
    />
    <ValueTableItem
      label={"Is duck (true)"}
      value={true}
      alignValue={"flex-end"}
    />
    <ValueTableItem
      label={"Is human (false)"}
      value={false}
      alignValue={"flex-end"}
    />
    <ValueTableItem
      label={"Drinks"}
      value={
        <Icon
          icon={faCoffee}
          size={14}
          color={cssColor("--lhds-color-orange-300")}
        />
      }
      alignValue={"flex-end"}
    />
  </ValueTable>
);

export const Variants = () => {
  const variants: Array<ValueTableVariant> = [
    "relaxed",
    "standard",
    "condensed",
    "compact",
  ];

  return variants.map((variant) => (
    <>
      <Heading>{variant}</Heading>
      <Spacing />
      <ValueTable variant={variant}>
        <ValueTableItem label={"E-mail"} value={"user@example.com"} />
        <ValueTableItem label={"First name"} value={"Donald"} />
        <ValueTableItem label={"Last name"} value={"Duck"} />
        <ValueTableItem label={"Age"} value={42} />
        <ValueTableItem label={"Parents (undefined)"} value={undefined} />
        <ValueTableItem label={"Is duck (true)"} value={true} />
        <ValueTableItem label={"Is human (false)"} value={false} />
        <ValueTableItem
          label={"Drinks"}
          value={
            <Icon
              icon={faCoffee}
              size={14}
              color={cssColor("--lhds-color-orange-300")}
            />
          }
        />
      </ValueTable>
      <Spacing num={2} />
    </>
  ));
};
