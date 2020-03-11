import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Link } from "@stenajs-webui/elements";
import { StandardText } from "@stenajs-webui/core";

storiesOf("elements/Link", module).add("standard", () => (
  <>
    <Link onClick={() => alert("Click")}>First link</Link> outside StandardText
    <br />
    <StandardText>
      I am a <Link onClick={() => alert("Click")}>link</Link> inside
      StandardText. I do <Link onClick={() => {}}>nothing</Link>.<br />
      <Link disabled onClick={() => alert("Click")}>
        I am disabled
      </Link>
      .<br />
    </StandardText>
  </>
));
