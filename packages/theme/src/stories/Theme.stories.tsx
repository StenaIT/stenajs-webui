import * as React from "react";
import { LhdsColor } from "../types/LhdsColor";
import { cssColor } from "../util/CssColor";
import { Column, Row, Text } from "@stenajs-webui/core";

export default {
  title: "theme/Colors",
};

const allColors: Array<LhdsColor> = [
  "--lhds-color-blue-50",
  "--lhds-color-blue-100",
  "--lhds-color-blue-200",
  "--lhds-color-blue-300",
  "--lhds-color-blue-400",
  "--lhds-color-blue-500",
  "--lhds-color-blue-600",
  "--lhds-color-blue-700",
  "--lhds-color-blue-800",
  "--lhds-color-blue-900",
  "--lhds-color-green-50",
  "--lhds-color-green-100",
  "--lhds-color-green-200",
  "--lhds-color-green-300",
  "--lhds-color-green-400",
  "--lhds-color-green-500",
  "--lhds-color-green-600",
  "--lhds-color-green-700",
  "--lhds-color-green-800",
  "--lhds-color-green-900",
  "--lhds-color-orange-50",
  "--lhds-color-orange-100",
  "--lhds-color-orange-200",
  "--lhds-color-orange-300",
  "--lhds-color-orange-400",
  "--lhds-color-orange-500",
  "--lhds-color-orange-600",
  "--lhds-color-orange-700",
  "--lhds-color-orange-800",
  "--lhds-color-orange-900",
  "--lhds-color-red-50",
  "--lhds-color-red-100",
  "--lhds-color-red-200",
  "--lhds-color-red-300",
  "--lhds-color-red-400",
  "--lhds-color-red-500",
  "--lhds-color-red-600",
  "--lhds-color-red-700",
  "--lhds-color-red-800",
  "--lhds-color-red-900",
  "--lhds-color-turquoise-50",
  "--lhds-color-turquoise-100",
  "--lhds-color-turquoise-200",
  "--lhds-color-turquoise-300",
  "--lhds-color-turquoise-400",
  "--lhds-color-turquoise-500",
  "--lhds-color-turquoise-600",
  "--lhds-color-turquoise-700",
  "--lhds-color-turquoise-800",
  "--lhds-color-turquoise-900",
  "--lhds-color-ui-50",
  "--lhds-color-ui-100",
  "--lhds-color-ui-200",
  "--lhds-color-ui-300",
  "--lhds-color-ui-400",
  "--lhds-color-ui-500",
  "--lhds-color-ui-600",
  "--lhds-color-ui-700",
  "--lhds-color-ui-800",
  "--lhds-color-ui-900",
];

export const Overview = () => {
  return (
    <Column>
      {allColors.map((color) => (
        <Row flex={1}>
          <Row width={"200px"}>
            <Text>{color}</Text>
          </Row>
          <Row background={cssColor(color)} spacing flex={1} />
        </Row>
      ))}
    </Column>
  );
};
