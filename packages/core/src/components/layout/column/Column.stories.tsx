import { Box, Column, Space } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("core/Layout/Column", module)
  .addDecorator(withInfo({ propTables: false }))
  .add("standard", () => (
    <div style={{ display: "table" }}>
      <Column>
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px"
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px"
          }}
        />
        <Space />
        <div
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "20px"
          }}
        />
      </Column>
    </div>
  ))
  .add("with justifyContent=flex-start", () => (
    <div style={{ display: "table" }}>
      <Box borderWidth={"1px"} borderColor={"primaryText"}>
        <Column justifyContent={"flex-start"} width={"150px"} height={"150px"}>
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
        </Column>
      </Box>
    </div>
  ))
  .add("with justifyContent=center", () => (
    <div style={{ display: "table" }}>
      <Box borderWidth={"1px"} borderColor={"primaryText"}>
        <Column justifyContent={"center"} width={"150px"} height={"150px"}>
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
        </Column>
      </Box>
    </div>
  ))
  .add("with justifyContent=flex-end", () => (
    <div style={{ display: "table" }}>
      <Box borderWidth={"1px"} borderColor={"primaryText"}>
        <Column justifyContent={"flex-end"} width={"150px"} height={"150px"}>
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
        </Column>
      </Box>
    </div>
  ))
  .add("with alignItems=flex-start", () => (
    <div style={{ display: "table" }}>
      <Box borderWidth={"1px"} borderColor={"primaryText"}>
        <Column alignItems={"flex-start"} width={"150px"} height={"150px"}>
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
        </Column>
      </Box>
    </div>
  ))
  .add("with alignItems=center", () => (
    <div style={{ display: "table" }}>
      <Box borderWidth={"1px"} borderColor={"primaryText"}>
        <Column alignItems={"center"} width={"150px"} height={"150px"}>
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
        </Column>
      </Box>
    </div>
  ))
  .add("with alignItems=flex-end", () => (
    <div style={{ display: "table" }}>
      <Box borderWidth={"1px"} borderColor={"primaryText"}>
        <Column alignItems={"flex-end"} width={"150px"} height={"150px"}>
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
          <Space />
          <div
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "20px"
            }}
          />
        </Column>
      </Box>
    </div>
  ));
