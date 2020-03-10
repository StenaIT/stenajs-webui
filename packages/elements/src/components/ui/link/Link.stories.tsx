import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Link } from "@stenajs-webui/elements";
import { StandardText } from "@stenajs-webui/core";

storiesOf("elements/Link", module).add("standard", () => (
  <>
    <Link onClick={() => alert("Click")}>First link</Link> <br />
    <StandardText>
      I am a <Link onClick={() => alert("Click")}>link</Link>. I am{" "}
      <Link onClick={() => alert("Click")}>another link</Link>.<br />
      <Link disabled onClick={() => alert("Click")}>
        I am disabled
      </Link>
      .<br />
    </StandardText>
  </>
));
