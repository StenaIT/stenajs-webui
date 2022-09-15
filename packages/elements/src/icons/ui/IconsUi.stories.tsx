import * as React from "react";
import { IconDemo } from "./IconsUiDemo";
import { useState } from "react";
import * as allIcons from "./IconsUi";
import { Box, Txt } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";
import { cssColor } from "@stenajs-webui/theme";

export default {
  title: "elements/Icons/UI",
};

export const AllIconsDemo = () => {
  const [selectedIcon, setSelectedIcon] = useState(Object.values(allIcons)[0]);
  return (<>
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
    {Object.keys(allIcons).map((iconName) => (
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
          {iconName}
        </Txt>
      </Box>
    ))}
  </Box>
  <IconDemo icon={selectedIcon} />
  </>);
};
