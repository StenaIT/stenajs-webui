import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Clickable,
  Indent,
  Row,
  Space,
  Spacing,
  StandardText
} from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { StandardButton } from "../../../packages/elements/src/components/ui/buttons/StandardButton";

storiesOf("examples/Tables", module).add("Simple table", () => {
  const list = ["Donald Duck", "Daisy", "Howard the duck", "A duck"];

  const tdStyle = {
    borderBottom: "1px solid #f5f5f5",
    paddingTop: "10px",
    paddingBottom: "10px"
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
                    <StandardText fontWeight={"bold"}>Name</StandardText>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <StandardText fontWeight={"bold"}>Description</StandardText>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <StandardText fontWeight={"bold"}>Routes</StandardText>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <StandardText fontWeight={"bold"}>Event type</StandardText>
                  </Indent>
                </td>
                <td style={tdStyle}>
                  <Indent>
                    <StandardText fontWeight={"bold"}>Results</StandardText>
                  </Indent>
                </td>
                <td style={tdStyle} />
              </tr>

              {list.map(name => (
                <tr>
                  <td style={tdStyle}>
                    <Indent>
                      <Clickable disableFocusHighlight onClick={() => {}}>
                        <Row alignItems={"center"}>
                          <StandardText hoverUnderline>{name}</StandardText>
                          <Space num={2} />
                        </Row>
                      </Clickable>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <StandardText>A great duck.</StandardText>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <StandardText>GOFR, FRGO</StandardText>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <Row>
                        <StandardText>Boarded ship</StandardText>
                      </Row>
                    </Indent>
                  </td>
                  <td style={tdStyle}>
                    <Indent>
                      <Row>
                        <StandardText>Big success</StandardText>
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
            <StandardButton leftIcon={faPlus} />
          </Row>
        </Spacing>
      </Box>
    </div>
  );
});
