import * as React from "react";

import { stenaCombined } from "./Icons-misc";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Row, Text } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";
import _ from "lodash";

export default {
  title: "elements/Icons/misc",
};

const IconDemo: React.FC<{ icon: IconDefinition }> = ({ icon }) => {
  const sizes = [10, 12, 14, 16, 18, 20, 22, 24];
  const colors = [
    cssColor("--lhds-color-blue-600"),
    cssColor("--lhds-color-ui-800"),
    cssColor("--lhds-color-red-600"),
    cssColor("--lhds-color-green-600"),
  ];

  return (
    <>
      <Row>
        {sizes.map((size) => (
          <Box
            indent
            width={"50px"}
            height={"50px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text>{size}</Text>
          </Box>
        ))}
      </Row>

      {colors.map((color) => (
        <Row>
          {sizes.map((size) => (
            <Box
              indent
              width={"50px"}
              height={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Icon icon={icon} color={color} size={size} />
            </Box>
          ))}
        </Row>
      ))}
    </>
  );
};

export const Combined = () => <IconDemo icon={stenaCombined} />;
