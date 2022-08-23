import * as React from "react";
import { GridCard } from "../components/GridCard";
import { GridCardContainer } from "../components/GridCardContainer";

export default {
  title: "grid/Cards",
};

export const Overview = () => {
  return <GridCardContainer>
    <GridCard></GridCard>
    <GridCard></GridCard>
    <GridCard></GridCard>
    <GridCard></GridCard>
    <GridCard></GridCard>
    <GridCard></GridCard>
    <GridCard></GridCard>
  </GridCardContainer>;
};
