import * as React from "react";
import { Space, Text } from "@stenajs-webui/core";
import { Link, LinkProps } from "./Link";
import { Story } from "@storybook/react";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "elements/Link",
  component: Link,
};

export const Demo: Story<LinkProps> = (props) => (
  <Link {...props}>An excellent link</Link>
);

export const Overview = () => (
  <>
    <Link onClick={() => alert("Click")}>Standard link</Link>

    <Space num={2} />

    <Text>
      This is a <Link onClick={() => {}}>standard link</Link> inside standard
      text.
    </Text>

    <Space num={2} />

    <Text>
      This is an{" "}
      <Link variant={"overline"} onClick={() => {}}>
        overline link
      </Link>{" "}
      inside standard text.
    </Text>

    <Space num={2} />

    <Text variant={"overline"}>
      This is a <Link onClick={() => {}}>standard link</Link> inside overline
      text.
    </Text>

    <Space num={2} />

    <Text variant={"overline"}>
      This is a{" "}
      <Link variant={"caption"} onClick={() => {}}>
        caption link
      </Link>{" "}
      inside overline text.
    </Text>

    <Space num={2} />

    <Link disabled onClick={() => {}}>
      I am disabled
    </Link>
  </>
);

export const HrefAndTarget = () => (
  <Text>
    This{" "}
    <Link href={"https://www.google.com"} target={"_blank"}>
      link
    </Link>{" "}
    opens a new browser window.
  </Text>
);

export const LinkWithIconRight = () => (
  <Text>
    This{" "}
    <Link
      href={"https://www.google.com"}
      target={"_blank"}
      iconRight={faExternalLinkAlt}
    >
      link
    </Link>{" "}
    opens a new browser window.
  </Text>
);
