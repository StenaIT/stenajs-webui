import {
  Box,
  Clickable,
  Column,
  Indent,
  Row,
  Space,
  Spacing,
  StandardText,
} from "@stenajs-webui/core";
import * as React from "react";

export default {
  title: "examples/Boxes/EventListCard",
};

export const EventListCard = () => {
  const list = ["Today", "Yesterday"];

  return (
    <div style={{ display: "inline-block" }}>
      <Box shadow={"box"}>
        <Column width={"450px"}>
          <Box background={"#eaeaea"}>
            <Spacing>
              <Indent>
                <StandardText>Events</StandardText>
              </Indent>
            </Spacing>
          </Box>

          {list.map((label) => (
            <Box background={"#fff"} spacing indent>
              <Row justifyContent={"space-between"}>
                <StandardText color={"#a8a8a8"}>{label}</StandardText>
              </Row>

              {list.map(() => (
                <>
                  <Space />
                  <Row alignItems={"center"}>
                    <Row alignItems={"center"}>
                      <Box
                        borderRadius={"5px"}
                        borderWidth={"0px"}
                        overflow={"hidden"}
                      >
                        <Box background={"#ffcbcd"}>
                          <Space />
                        </Box>
                      </Box>
                      <Space />
                    </Row>
                    <>
                      <Row flex={1} alignItems={"center"}>
                        <Clickable onClick={() => {}}>
                          <StandardText hoverUnderline>
                            Added new sailing
                          </StandardText>
                        </Clickable>
                      </Row>
                      <Row alignItems={"center"} justifyContent={"flex-end"}>
                        <StandardText>15 minutes ago</StandardText>
                      </Row>
                    </>
                  </Row>
                </>
              ))}
            </Box>
          ))}
          <Space />
        </Column>
      </Box>
    </div>
  );
};
