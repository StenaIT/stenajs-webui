import { Column, Row, useBoolean } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { Drawer } from "../../../packages/modal/src";
import { DateTextInput } from "../../../packages/calendar/src";
import * as React from "react";
import { useState } from "react";

export default {
  title: "examples/Drawer",
};

export const DrawerWithCalendar = () => {
  const [isOpen, open, close] = useBoolean(false);
  const [value, setValue] = useState("");

  return (
    <Column>
      <Row>
        <PrimaryButton label={"Open drawer"} onClick={open} />
      </Row>
      <Drawer
        isOpen={isOpen}
        onRequestClose={close}
        background={"white"}
        slideFrom={"right"}
      >
        <Column spacing indent>
          <DateTextInput value={value} onValueChange={setValue} />
        </Column>
      </Drawer>
    </Column>
  );
};
