import * as React from "react";
import {
  StenaAngleLeft,
  StenaAngleRight,
  StenaAngleUp,
  StenaAngleDown,
  StenaArrowRight,
  StenaTrash,
  StenaTimes,
  StenaSliders,
  StenaSearch,
  StenaRefresh,
  StenaPlus,
  StenaMinus,
  StenaPlusCircle,
  StenaMinusCircle,
  StenaPen,
  StenaHamburger,
  StenaExclamation,
  StenaCopy,
  StenaCheck,
  StenaCalendar,
  StenaBell,
  StenaBellFilled,
} from "./Icons-ui";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Row, Text } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";

export default {
  title: "elements/Icons/ui",
};

const IconDemo: React.FC<{ icon: IconDefinition }> = ({ icon }) => {
  const sizes = [10, 12, 14, 16, 18, 20, 22, 24];
  const colors = [
    cssColor("--lhds-color-blue-500"),
    cssColor("--lhds-color-ui-600"),
    cssColor("--lhds-color-red-500"),
    cssColor("--lhds-color-green-600"),
    cssColor("--lhds-color-turquoise-600"),
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

export const AngleLeft = () => <IconDemo icon={StenaAngleLeft} />;
export const AngleRight = () => <IconDemo icon={StenaAngleRight} />;
export const AngleUp = () => <IconDemo icon={StenaAngleUp} />;
export const AngleDown = () => <IconDemo icon={StenaAngleDown} />;
export const ArrowRight = () => <IconDemo icon={StenaArrowRight} />;
export const Trash = () => <IconDemo icon={StenaTrash} />;
export const Times = () => <IconDemo icon={StenaTimes} />;
export const Sliders = () => <IconDemo icon={StenaSliders} />;
export const Search = () => <IconDemo icon={StenaSearch} />;
export const Refresh = () => <IconDemo icon={StenaRefresh} />;
export const Plus = () => <IconDemo icon={StenaPlus} />;
export const Minus = () => <IconDemo icon={StenaMinus} />;
export const PlusCircle = () => <IconDemo icon={StenaPlusCircle} />;
export const MinusCircle = () => <IconDemo icon={StenaMinusCircle} />;
export const Pen = () => <IconDemo icon={StenaPen} />;
export const Hamburger = () => <IconDemo icon={StenaHamburger} />;
export const Exclamation = () => <IconDemo icon={StenaExclamation} />;
export const Copy = () => <IconDemo icon={StenaCopy} />;
export const Check = () => <IconDemo icon={StenaCheck} />;
export const Calendar = () => <IconDemo icon={StenaCalendar} />;
export const Bell = () => <IconDemo icon={StenaBell} />;
export const BellFilled = () => <IconDemo icon={StenaBellFilled} />;
