import * as React from "react";
import { Text } from "@stenajs-webui/core";
import { Link } from "./Link";

export default {
  title: "elements/Link",
  component: Link,
};

export const Standard = () => (
  <>
    <Link onClick={() => alert("Click")}>First link</Link> outside StandardText
    <br />
    <Text>
      I am a <Link onClick={() => alert("Click")}>link</Link> inside
      StandardText. I do <Link onClick={() => {}}>nothing</Link>.<br />
      <Link disabled onClick={() => alert("Click")}>
        I am disabled
      </Link>
      .<br />
    </Text>
  </>
);
