import * as React from "react";
import { IconDemo } from "./IconsUiDemo";
import { useState } from "react";
import * as allIcons from "./IconsUi";
import { Box, Txt } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";
import { cssColor } from "@stenajs-webui/theme";
import { stenaArrowRight } from "./IconsUi";
import { Banner } from "../../components/ui/banners/banner/Banner";

export default {
  title: "elements/Icons/UI",
};

export const AllIconsDemo = () => {
  const [selectedIcon, setSelectedIcon] = useState(Object.values(allIcons)[0]);
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
        {Object.keys(allIcons).map((iconName) => {
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
                setSelectedIcon(allIcons[iconName]);
              }}
            >
              <Icon key={iconName} icon={allIcons[iconName]} size={24} />
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
