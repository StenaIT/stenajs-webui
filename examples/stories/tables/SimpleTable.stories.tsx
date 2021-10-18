import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Clickable,
  Indent,
  Row,
  Space,
  Spacing,
  Text,
} from "@stenajs-webui/core";
import * as React from "react";
import { PrimaryButton } from "@stenajs-webui/elements";

export default {
  title: "examples/Tables/Simple",
};

export const SimpleTable = () => {
  const list = ["Donald Duck", "Daisy", "Howard the duck", "A duck"];

  const tdStyle = {
    borderBottom: "1px solid #f5f5f5",
    paddingTop: "10px",
    paddingBottom: "10px",
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Box shadow={"box"} background={"#fff"}>
        <Spacing>
          <table cellPadding={0} cellSpacing={0} style={{ width: "1200px" }}>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <Indent>
                    <Text variant={"bold"}>Name</Text>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <Text variant={"bold"}>Description</Text>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <Text variant={"bold"}>Routes</Text>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <Text variant={"bold"}>Event type</Text>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <Text variant={"bold"}>Results</Text>
                  </Indent>
                </td>
                <td style={tdStyle} />
              </tr>

              {list.map((name) => (
                <tr>
                  <td style={tdStyle}>
                    <Indent>
                      <Clickable disableFocusHighlight onClick={() => {}}>
                        <Row alignItems={"center"}>
                          <Text>{name}</Text>
                          <Space num={2} />
                        </Row>
                      </Clickable>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <Text>A great duck.</Text>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <Text>GOFR, FRGO</Text>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <Row>
                        <Text>Boarded ship</Text>
                      </Row>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <Row>
                        <Text>Big success</Text>
                      </Row>
                    </Indent>
                  </td>
                  <td style={tdStyle} />
                </tr>
              ))}
            </tbody>
          </table>
          <Space />
          <Row indent justifyContent={"flex-start"}>
            <PrimaryButton leftIcon={faPlus} />
          </Row>
        </Spacing>
      </Box>
    </div>
  );
};
