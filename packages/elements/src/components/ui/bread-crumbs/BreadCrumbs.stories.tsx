import { Column, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import { BreadCrumbs } from "./BreadCrumbs";
import { Crumb } from "./Crumb";

export default {
  title: "elements/BreadCrumbs",
  component: BreadCrumbs,
  subcomponents: { Crumb },
};

export const Standard = () => (
  <BreadCrumbs>
    <Crumb label={"Home"} />
    <Crumb label={"Users"} />
    <Crumb label={"Kalle Anka"} />
  </BreadCrumbs>
);

export const WithReactRouter = () => {
  const FakeReactRouterLink: React.FC<{ to: string; className: string }> = (
    props
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid
  ) => <a href={"#"} {...props} />;

  interface Props {
    to: string;
    label: string;
  }

  const ReactRouterCrumb: React.FC<Props> = ({ label, to }) => {
    return (
      <Crumb
        label={label}
        render={(props) => <FakeReactRouterLink to={to} {...props} />}
      />
    );
  };

  return (
    <Column>
      <Text>This story shows how to integrate with react-router.</Text>
      <Spacing />
      <Text>
        Please see story source under "Docs" to see the implementation.
      </Text>
      <Spacing />
      <Text>
        FakeReactRouterLink is a fake component instead of Link from
        react-router.
      </Text>
      <Text>
        ReactRouterCrumb is a custom component in your application that connects
        Link with Crumb.
      </Text>
      <Spacing />
      <BreadCrumbs>
        <ReactRouterCrumb label={"Home"} to={"/"} />
        <ReactRouterCrumb label={"Users"} to={"/user"} />
        <ReactRouterCrumb label={"Kalle Anka"} to={"/user/id123"} />
      </BreadCrumbs>
    </Column>
  );
};
