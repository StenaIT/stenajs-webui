import * as React from "react";
import { IconDemo } from "./IconsUiDemo";
import * as allIcons from "./IconsUi";
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
  stenaBusinessAgreement,
  stenaBusinessCustomer,
  stenaBusinessCard,
  stenaBusinessClaim,
  stenaBusinessInvoice,
  stenaBusinessNSLH,
  stenaCalendarManage,
  stenaExpand,
  stenaBusinessSignature,
  stenaTrash,
  stenaTimes,
  stenaTimesCircle,
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
  stenaCopyDocument,
  stenaLogout,
  stenaMail,
  stenaSwitch,
  stenaMobile,
  stenaSailingGate,
  stenaSailingLocation,
  stenaSailingOnQuay,
  stenaSailingOnRoute,
  stenaSailingShip,
  stenaSailingTrain,
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
  stenaCheckCircleFilled,
  stenaClock,
  stenaClockFilled,
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
  stenaDownload,
  stenaIntermodal,
} from "./IconsUi";
import { Box, Txt } from "@stenajs-webui/core";
import { Icon } from "../../components/ui/icon/Icon";

export default {
  title: "elements/Icons/UI",
};

export const AllIconsDemo = () => (
  <Box
    indent
    spacing
    style={{
      display: "grid",
      gap: "8px",
      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      background: "#f0f1f3",
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
        onClick={() => navigator.clipboard.writeText(iconName)}
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
);

export const AngleDown = () => <IconDemo icon={stenaAngleDown} />;
export const AngleLeft = () => <IconDemo icon={stenaAngleLeft} />;
export const AngleRight = () => <IconDemo icon={stenaAngleRight} />;
export const AngleUp = () => <IconDemo icon={stenaAngleUp} />;
export const ArrowCircleDown = () => <IconDemo icon={stenaArrowCircleDown} />;
export const ArrowCircleLeft = () => <IconDemo icon={stenaArrowCircleLeft} />;
export const ArrowCircleRight = () => <IconDemo icon={stenaArrowCircleRight} />;
export const ArrowCircleUp = () => <IconDemo icon={stenaArrowCircleUp} />;
export const ArrowDown = () => <IconDemo icon={stenaArrowDown} />;
export const ArrowLeft = () => <IconDemo icon={stenaArrowLeft} />;
export const ArrowRight = () => <IconDemo icon={stenaArrowRight} />;
export const ArrowUp = () => <IconDemo icon={stenaArrowUp} />;
export const ArrowWideDown = () => <IconDemo icon={stenaArrowWideDown} />;
export const ArrowWideLeft = () => <IconDemo icon={stenaArrowWideLeft} />;
export const ArrowWideRight = () => <IconDemo icon={stenaArrowWideRight} />;
export const ArrowWideUp = () => <IconDemo icon={stenaArrowWideUp} />;
export const Bell = () => <IconDemo icon={stenaBell} />;
export const BellFilled = () => <IconDemo icon={stenaBellFilled} />;
export const BusinessAgreement = () => (
  <IconDemo icon={stenaBusinessAgreement} />
);
export const BusinessCard = () => <IconDemo icon={stenaBusinessCard} />;
export const BusinessClaim = () => <IconDemo icon={stenaBusinessClaim} />;
export const BusinessCustomer = () => <IconDemo icon={stenaBusinessCustomer} />;
export const BusinessInvoice = () => <IconDemo icon={stenaBusinessInvoice} />;
export const BusinessNSLH = () => <IconDemo icon={stenaBusinessNSLH} />;
export const BusinessSignature = () => (
  <IconDemo icon={stenaBusinessSignature} />
);
export const Calendar = () => <IconDemo icon={stenaCalendar} />;
export const CalendarFilled = () => <IconDemo icon={stenaCalendarFilled} />;
export const CalendarManage = () => <IconDemo icon={stenaCalendarManage} />;
export const Check = () => <IconDemo icon={stenaCheck} />;
export const CheckCircle = () => <IconDemo icon={stenaCheckCircle} />;
export const CheckCircleFilled = () => (
  <IconDemo icon={stenaCheckCircleFilled} />
);
export const Clock = () => <IconDemo icon={stenaClock} />;
export const ClockFilled = () => <IconDemo icon={stenaClockFilled} />;
export const Copy = () => <IconDemo icon={stenaCopy} />;
export const CopyDocument = () => <IconDemo icon={stenaCopyDocument} />;
export const Download = () => <IconDemo icon={stenaDownload} />;
export const ExclamationCircle = () => (
  <IconDemo icon={stenaExclamationCircle} />
);
export const ExclamationCircleFilled = () => (
  <IconDemo icon={stenaExclamationCircleFilled} />
);
export const ExclamationTriangle = () => (
  <IconDemo icon={stenaExclamationTriangle} />
);
export const ExclamationTriangleFilled = () => (
  <IconDemo icon={stenaExclamationTriangleFilled} />
);
export const Expand = () => <IconDemo icon={stenaExpand} />;
export const Hamburger = () => <IconDemo icon={stenaHamburger} />;
export const InfoCircle = () => <IconDemo icon={stenaInfoCircle} />;
export const InfoCircleFilled = () => <IconDemo icon={stenaInfoCircleFilled} />;
export const Intermodal = () => <IconDemo icon={stenaIntermodal} />;
export const Logout = () => <IconDemo icon={stenaLogout} />;
export const Mail = () => <IconDemo icon={stenaMail} />;
export const Minus = () => <IconDemo icon={stenaMinus} />;
export const MinusCircle = () => <IconDemo icon={stenaMinusCircle} />;
export const Mobile = () => <IconDemo icon={stenaMobile} />;
export const Pen = () => <IconDemo icon={stenaPen} />;
export const Phone = () => <IconDemo icon={stenaPhone} />;
export const Plus = () => <IconDemo icon={stenaPlus} />;
export const PlusCircle = () => <IconDemo icon={stenaPlusCircle} />;
export const Refresh = () => <IconDemo icon={stenaRefresh} />;
export const SailingGate = () => <IconDemo icon={stenaSailingGate} />;
export const SailingLocation = () => <IconDemo icon={stenaSailingLocation} />;
export const SailingOnQuay = () => <IconDemo icon={stenaSailingOnQuay} />;
export const SailingOnRoute = () => <IconDemo icon={stenaSailingOnRoute} />;
export const SailingShip = () => <IconDemo icon={stenaSailingShip} />;
export const SailingTrain = () => <IconDemo icon={stenaSailingTrain} />;
export const Search = () => <IconDemo icon={stenaSearch} />;
export const Sliders = () => <IconDemo icon={stenaSliders} />;
export const SortDown = () => <IconDemo icon={stenaSortDown} />;
export const SortUp = () => <IconDemo icon={stenaSortUp} />;
export const Switch = () => <IconDemo icon={stenaSwitch} />;
export const Times = () => <IconDemo icon={stenaTimes} />;
export const TimesCircle = () => <IconDemo icon={stenaTimesCircle} />;
export const Trash = () => <IconDemo icon={stenaTrash} />;
export const User = () => <IconDemo icon={stenaUser} />;
export const UserCircle = () => <IconDemo icon={stenaUserCircle} />;
