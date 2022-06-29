import * as React from "react";

import {
  stenaAngleLeft,
  stenaAngleRight,
  stenaAngleUp,
  stenaAngleDown,
  stenaArrowLeft,
  stenaArrowRight,
  stenaArrowUp,
  stenaArrowDown,
  stenaArrowWideLeft,
  stenaArrowWideRight,
  stenaArrowWideUp,
  stenaArrowWideDown,
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
  stenaCopy,
  stenaCheck,
  stenaCalendar,
  stenaBell,
  stenaBellFilled,
  stenaExclamationTriangle,
  stenaExclamationTriangleFilled,
  stenaExclamationCircle,
  stenaExclamationCircleFilled,
  stenaInfoCircle,
  stenaInfoCircleFilled,
  stenaCheckCircle,
  stenaClock,
  stenaArrowCircleDown,
  stenaArrowCircleLeft,
  stenaArrowCircleRight,
  stenaArrowCircleUp,
  stenaCalendarFilled,
  stenaUser,
  stenaUserCircle,
  stenaPhone,
  stenaSortUp,
  stenaSortDown,
} from "./IconsUi";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Row, Text } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";

export default {
  title: "elements/Icons/UI",
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

export const AngleLeft = () => <IconDemo icon={stenaAngleLeft} />;
export const AngleRight = () => <IconDemo icon={stenaAngleRight} />;
export const AngleUp = () => <IconDemo icon={stenaAngleUp} />;
export const AngleDown = () => <IconDemo icon={stenaAngleDown} />;
export const ArrowLeft = () => <IconDemo icon={stenaArrowLeft} />;
export const ArrowRight = () => <IconDemo icon={stenaArrowRight} />;
export const ArrowUp = () => <IconDemo icon={stenaArrowUp} />;
export const ArrowDown = () => <IconDemo icon={stenaArrowDown} />;
export const ArrowWideLeft = () => <IconDemo icon={stenaArrowWideLeft} />;
export const ArrowWideRight = () => <IconDemo icon={stenaArrowWideRight} />;
export const ArrowWideUp = () => <IconDemo icon={stenaArrowWideUp} />;
export const ArrowWideDown = () => <IconDemo icon={stenaArrowWideDown} />;
export const ArrowCircleLeft = () => <IconDemo icon={stenaArrowCircleLeft} />;
export const ArrowCircleRight = () => <IconDemo icon={stenaArrowCircleRight} />;
export const ArrowCircleUp = () => <IconDemo icon={stenaArrowCircleUp} />;
export const ArrowCircleDown = () => <IconDemo icon={stenaArrowCircleDown} />;

export const Times = () => <IconDemo icon={stenaTimes} />;
export const Sliders = () => <IconDemo icon={stenaSliders} />;
export const Check = () => <IconDemo icon={stenaCheck} />;
export const CheckCircle = () => <IconDemo icon={stenaCheckCircle} />;
export const Copy = () => <IconDemo icon={stenaCopy} />;

export const Search = () => <IconDemo icon={stenaSearch} />;
export const Refresh = () => <IconDemo icon={stenaRefresh} />;

export const SortUp = () => <IconDemo icon={stenaSortUp} />;
export const SortDown = () => <IconDemo icon={stenaSortDown} />;

export const Plus = () => <IconDemo icon={stenaPlus} />;
export const Minus = () => <IconDemo icon={stenaMinus} />;
export const PlusCircle = () => <IconDemo icon={stenaPlusCircle} />;
export const MinusCircle = () => <IconDemo icon={stenaMinusCircle} />;

export const Bell = () => <IconDemo icon={stenaBell} />;
export const BellFilled = () => <IconDemo icon={stenaBellFilled} />;
export const Calendar = () => <IconDemo icon={stenaCalendar} />;
export const CalendarFilled = () => <IconDemo icon={stenaCalendarFilled} />;
export const Clock = () => <IconDemo icon={stenaClock} />;
export const Phone = () => <IconDemo icon={stenaPhone} />;
export const Pen = () => <IconDemo icon={stenaPen} />;
export const Trash = () => <IconDemo icon={stenaTrash} />;
export const Hamburger = () => <IconDemo icon={stenaHamburger} />;

export const User = () => <IconDemo icon={stenaUser} />;
export const UserCircle = () => <IconDemo icon={stenaUserCircle} />;

export const InfoCircle = () => <IconDemo icon={stenaInfoCircle} />;
export const InfoCircleFilled = () => <IconDemo icon={stenaInfoCircleFilled} />;

export const ExclamationTriangle = () => (
  <IconDemo icon={stenaExclamationTriangle} />
);
export const ExclamationTriangleFilled = () => (
  <IconDemo icon={stenaExclamationTriangleFilled} />
);
export const ExclamationCircle = () => (
  <IconDemo icon={stenaExclamationCircle} />
);
export const ExclamationCircleFilled = () => (
  <IconDemo icon={stenaExclamationCircleFilled} />
);
