import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Row, Text } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";

export const IconDemo: React.FC<{ icon: IconDefinition }> = ({ icon }) => {
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
        {sizes.map((size, key) => (
          <Box
            key={key}
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

      {colors.map((color, keyColor) => (
        <Row key={keyColor}>
          {sizes.map((size, keySize) => (
            <Box
              key={keyColor + "_" + keySize}
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
