import { Box, useBoolean, useOnClickOutside } from "@stenajs-webui/core";
import { Drawer } from "@stenajs-webui/panels";
import * as React from "react";
import { useRef } from "react";
import { PrimaryButton } from "@stenajs-webui/elements";

export default {
  title: "panels/Drawer",
};

export const Standard = () => {
  const [isOpen, open, close] = useBoolean(false);
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div ref={ref}>
      <Drawer isOpen={isOpen}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open"} onClick={open} />
    </div>
  );
};

export const FromRight = () => {
  const [isOpen, open, close] = useBoolean(false);
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div ref={ref}>
      <Drawer isOpen={isOpen} slideFrom={"right"}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open"} onClick={open} />
    </div>
  );
};

export const UsingPortal = () => {
  const [isOpen, open, close] = useBoolean(false);
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div ref={ref}>
      <Drawer isOpen={isOpen} portalTarget={document.body}>
        <Box background={"#9198e5"} flexGrow={1} spacing={2} indent={2}>
          Drawer content
        </Box>
      </Drawer>
      <PrimaryButton label={"Open"} onClick={open} />
    </div>
  );
};
