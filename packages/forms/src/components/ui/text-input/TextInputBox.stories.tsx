import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DateRangeDualTextField } from "@stenajs-webui/calendar";

storiesOf("forms/TextInput/TextInputBox", module).add("standard", () => (
  <DateRangeDualTextField />
));
