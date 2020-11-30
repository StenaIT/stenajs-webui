import * as React from "react";
import { Column } from "./Column";
import { Space } from "../space/Space";
import { Box } from "../box/Box";

export default {
  title: "core/Layout/Column",
  component: Column,
};

export const Standard = () => (
  <div style={{ display: "table" }}>
    <Column>
      <div
        style={{
          backgroundColor: "red",
          width: "50px",
          height: "20px",
        }}
      />
      <Space />
      <div
        style={{
          backgroundColor: "red",
          width: "50px",
          height: "20px",
        }}
      />
      <Space />
      <div
        style={{
          backgroundColor: "red",
          width: "50px",
          height: "20px",
        }}
      />
    </Column>
  </div>
);

export const WithJustifyContentFlexStart = () => (
  <div style={{ display: "table" }}>
    <Box borderWidth={"1px"} borderColor={"primaryText"}>
      <Column justifyContent={"flex-start"} width={"150px"} height={"150px"}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Column>
    </Box>
  </div>
);

export const WithJustifyContentCenter = () => (
  <div style={{ display: "table" }}>
    <Box borderWidth={"1px"} borderColor={"primaryText"}>
      <Column justifyContent={"center"} width={"150px"} height={"150px"}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Column>
    </Box>
  </div>
);

export const WithJustifyContentFlexEnd = () => (
  <div style={{ display: "table" }}>
    <Box borderWidth={"1px"} borderColor={"primaryText"}>
      <Column justifyContent={"flex-end"} width={"150px"} height={"150px"}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Column>
    </Box>
  </div>
);

export const WithAlignItemsFlexStart = () => (
  <div style={{ display: "table" }}>
    <Box borderWidth={"1px"} borderColor={"primaryText"}>
      <Column alignItems={"flex-start"} width={"150px"} height={"150px"}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Column>
    </Box>
  </div>
);

export const WithAlignItemsCenter = () => (
  <div style={{ display: "table" }}>
    <Box borderWidth={"1px"} borderColor={"primaryText"}>
      <Column alignItems={"center"} width={"150px"} height={"150px"}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Column>
    </Box>
  </div>
);

export const WithAlignItemsFlexEnd = () => (
  <div style={{ display: "table" }}>
    <Box borderWidth={"1px"} borderColor={"primaryText"}>
      <Column alignItems={"flex-end"} width={"150px"} height={"150px"}>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px",
          }}
        />
      </Column>
    </Box>
  </div>
);
