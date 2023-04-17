import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Column, Row, Txt } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";
import { PrimaryButton } from "../../components/ui/buttons/PrimaryButton";
import { SecondaryButton } from "../../components/ui/buttons/SecondaryButton";
import { FlatButton } from "../../components/ui/buttons/FlatButton";
import { Tag } from "../../components/ui/tag/Tag";

export const IconDemo: React.FC<{ icon: IconDefinition }> = ({ icon }) => {
  const sizes = [10, 12, 14, 16, 18, 20, 22, 24];
  const colors = [
    cssColor("--lhds-color-blue-600"),
    cssColor("--lhds-color-ui-800"),
    cssColor("--lhds-color-red-600"),
    cssColor("--lhds-color-green-600"),
  ];

  return (
    <Row gap flexWrap={"wrap"}>
      <Column>
        <Row>
          {sizes.map((size) => (
            <Box
              key={size}
              indent
              width={"50px"}
              height={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Txt>{size}</Txt>
            </Box>
          ))}
        </Row>

        {colors.map((color) => (
          <Row key={color}>
            {sizes.map((size) => (
              <Box
                key={size}
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
      </Column>

      {(["small", "medium", "large"] as const).map((size) => (
        <Column gap key={size}>
          <PrimaryButton leftIcon={icon} label={"Button"} size={size} />
          <SecondaryButton leftIcon={icon} label={"Button"} size={size} />
          <FlatButton leftIcon={icon} label={"Button"} size={size} />
          <FlatButton leftIcon={icon} size={size} />
        </Column>
      ))}
      <Column gap>
        {(["info", "error", "warning", "success", "passive"] as const).map(
          (variant) => (
            <Row gap key={variant}>
              <Tag variant={variant} size={"small"} icon={icon} label={"Tag"} />
              <Tag
                variant={variant}
                size={"medium"}
                icon={icon}
                label={"Tag"}
              />
            </Row>
          )
        )}
      </Column>
    </Row>
  );
};
