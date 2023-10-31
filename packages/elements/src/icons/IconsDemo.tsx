import * as React from "react";
import { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Column, Row, Txt } from "@stenajs-webui/core";
import { Icon } from "../components/ui/icon/Icon";
import { PrimaryButton } from "../components/ui/buttons/PrimaryButton";
import { SecondaryButton } from "../components/ui/buttons/SecondaryButton";
import { FlatButton } from "../components/ui/buttons/FlatButton";
import { Tag } from "../components/ui/tag/Tag";
import { stenaArrowRight } from "./generated/ArrowIcons";
import { Banner } from "../components/ui/banners/banner/Banner";

export const IconDemoList: React.FC<{
  icons: Record<string, IconDefinition>;
}> = ({ icons }) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const iconNames = Object.keys(icons).concat().sort();
  return (
    <Box gap>
      <Banner variant={"info"} text={"Click an icon to copy its code name."}>
        <Txt>
          Icons are prefixed with "stena" and camelCased when used in code, e.g.{" "}
          <Txt color={cssColor("--lhds-color-blue-800")}>sailing-cargo</Txt>{" "}
          <Icon icon={stenaArrowRight} size={14} display={"inline"} />{" "}
          <Txt color={cssColor("--lhds-color-blue-800")}>stenaSailingCargo</Txt>
          .
        </Txt>
      </Banner>
      <Box
        indent
        spacing
        style={{
          display: "grid",
          gap: "8px",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          background: cssColor("--lhds-color-ui-100"),
        }}
      >
        {iconNames.map((iconName) => {
          const readableName = iconName
            .replace(/[A-Z]/g, (match) => "-" + match.toLowerCase())
            .replace("stena-", "");
          return (
            <Box
              gap
              indent
              borderRadius={8}
              style={{ aspectRatio: "1", cursor: "pointer" }}
              background={"rgb(255, 255, 255)"}
              justifyContent={"center"}
              alignItems={"center"}
              hoverBackground={"rgb(255, 212, 59)"}
              onClick={() => {
                navigator.clipboard.writeText(iconName);
                setSelectedIcon(icons[iconName]);
              }}
            >
              <Icon key={iconName} icon={icons[iconName]} size={24} />
              <Txt
                size={"small"}
                wordBreak={"break-word"}
                style={{ textAlign: "center" }}
              >
                {readableName}
              </Txt>
            </Box>
          );
        })}
      </Box>
      <IconDemo icon={selectedIcon} />
    </Box>
  );
};

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
