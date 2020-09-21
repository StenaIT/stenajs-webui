import { Box, Column, Space } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import * as React from "react";

export default {
  title: "core/Layout/Column",
  decorators: [withInfo({ propTables: false })],
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

Standard.storyName = "standard";

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

WithJustifyContentFlexStart.storyName = "with justifyContent=flex-start";

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

WithJustifyContentCenter.storyName = "with justifyContent=center";

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

WithJustifyContentFlexEnd.storyName = "with justifyContent=flex-end";

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

WithAlignItemsFlexStart.storyName = "with alignItems=flex-start";

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

WithAlignItemsCenter.storyName = "with alignItems=center";

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

WithAlignItemsFlexEnd.storyName = "with alignItems=flex-end";
