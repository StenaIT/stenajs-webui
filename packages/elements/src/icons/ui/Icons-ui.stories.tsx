import * as React from "react";
import {
  stenaAngleLeft,
  stenaAngleRight,
  stenaAngleUp,
  stenaAngleDown,
  stenaArrowRight,
  stenaTrash,
  stenaTimes,
  stenaSliders,
  stenaSearch,
  stenaRefresh,
  stenaPlus,
  stenaMinus,
  stenaPlusCircle,
  stenaMinusCircle,
  stenaPen,
  stenaHamburger,
  stenaExclamation,
  stenaCopy,
  stenaCheck,
  stenaCalendar,
  stenaBell,
  stenaBellFilled,
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

export const AngleLeft = () => <IconDemo icon={stenaAngleLeft} />;
export const AngleRight = () => <IconDemo icon={stenaAngleRight} />;
export const AngleUp = () => <IconDemo icon={stenaAngleUp} />;
export const AngleDown = () => <IconDemo icon={stenaAngleDown} />;
export const ArrowRight = () => <IconDemo icon={stenaArrowRight} />;
export const Trash = () => <IconDemo icon={stenaTrash} />;
export const Times = () => <IconDemo icon={stenaTimes} />;
export const Sliders = () => <IconDemo icon={stenaSliders} />;
export const Search = () => <IconDemo icon={stenaSearch} />;
export const Refresh = () => <IconDemo icon={stenaRefresh} />;
export const Plus = () => <IconDemo icon={stenaPlus} />;
export const Minus = () => <IconDemo icon={stenaMinus} />;
export const PlusCircle = () => <IconDemo icon={stenaPlusCircle} />;
export const MinusCircle = () => <IconDemo icon={stenaMinusCircle} />;
export const Pen = () => <IconDemo icon={stenaPen} />;
export const Hamburger = () => <IconDemo icon={stenaHamburger} />;
export const Exclamation = () => <IconDemo icon={stenaExclamation} />;
export const Copy = () => <IconDemo icon={stenaCopy} />;
export const Check = () => <IconDemo icon={stenaCheck} />;
export const Calendar = () => <IconDemo icon={stenaCalendar} />;
export const Bell = () => <IconDemo icon={stenaBell} />;
export const BellFilled = () => <IconDemo icon={stenaBellFilled} />;
