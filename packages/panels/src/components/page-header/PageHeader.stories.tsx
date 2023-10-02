import * as React from "react";
import { Fragment, useState } from "react";
import { PageHeader } from "./PageHeader";
import {
  BreadCrumbs,
  Chip,
  Crumb,
  PrimaryButton,
  SecondaryButton,
  stenaSliders,
  stenaUser,
  Tab,
  TabMenu,
  Tag,
} from "@stenajs-webui/elements";
import { PageHeading, PageHeadingVariant } from "./PageHeading";
import { Box, Heading, Row, Space } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";

import { NavBar } from "../nav-bar/NavBar";
import { cssColor } from "@stenajs-webui/theme";
import { PageHeaderRow } from "./PageHeaderRow";
import { NavBarHeading } from "../nav-bar/NavBarHeading";
import { NavBarButton } from "../nav-bar/NavBarButton";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default {
  title: "panels/PageHeader",
  parameters: {
    layout: "fullscreen",
  },
  component: PageHeader,
};

const Base: React.FC<{ icon?: IconDefinition }> = ({ icon }) => {
  const [tabId, setTabId] = useState(0);
  return (
    <>
      <NavBar
        showMenuButton
        left={<NavBarHeading>Stena line</NavBarHeading>}
        right={
          <Row>
            <NavBarButton label={"Profile"} selected />
            <Space />
            <NavBarButton label={"Settings"} />
          </Row>
        }
      />
      <PageHeader
        renderBreadCrumbs={() => (
          <BreadCrumbs>
            <Crumb label={"Home"} />
            <Crumb label={"Customer"} />
            <Crumb label={"Booking"} />
          </BreadCrumbs>
        )}
        renderPageHeading={() => (
          <PageHeading
            icon={icon}
            heading={"Page Header"}
            contentLeft={<Tag label={"56"} />}
            contentRight={
              <>
                <SecondaryButton label={"Discard"} />
                <Space />
                <PrimaryButton label={"Save"} />
              </>
            }
          />
        )}
        renderTabs={() => (
          <TabMenu>
            <Tab
              label={"Selected"}
              selected={tabId === 0}
              onClick={() => setTabId(0)}
            />
            <Tab
              label={"Something"}
              selected={tabId === 1}
              onClick={() => setTabId(1)}
            />
            <Tab
              label={"Something else"}
              selected={tabId === 2}
              onClick={() => setTabId(2)}
            />
          </TabMenu>
        )}
      >
        <PageHeaderRow gap={2}>
          <Box>
            <TextInput />
          </Box>
          <PrimaryButton label={"Action"} />
        </PageHeaderRow>
      </PageHeader>
    </>
  );
};

export const Demo = () => <Base icon={stenaUser} />;
export const NoIcon = () => <Base />;

export const NoTabsOrHeadingContent = () => {
  return (
    <PageHeader
      renderBreadCrumbs={() => (
        <BreadCrumbs>
          <Crumb label={"Home"} />
          <Crumb label={"Customer"} />
          <Crumb label={"Booking"} />
        </BreadCrumbs>
      )}
      renderPageHeading={() => <PageHeading heading={"Page Header"} />}
    >
      <PageHeaderRow gap={2}>
        <Box>
          <TextInput />
        </Box>
        <PrimaryButton label={"Action"} />
      </PageHeaderRow>
    </PageHeader>
  );
};

export const Variants = () => {
  const variants: PageHeadingVariant[] = ["compact", "standard", "relaxed"];
  const [tabId, setTabId] = useState(0);

  return (
    <Box background={cssColor("--lhds-color-ui-300")}>
      {variants.map((variant) => (
        <Fragment key={variant}>
          <PageHeader
            renderBreadCrumbs={() => (
              <BreadCrumbs>
                <Crumb label={"Home"} />
                <Crumb label={"Customer"} />
                <Crumb label={"Booking"} />
              </BreadCrumbs>
            )}
            renderPageHeading={() => (
              <PageHeading
                heading={variant}
                variant={variant}
                contentLeft={<Tag label={"56"} />}
                contentRight={
                  <>
                    <SecondaryButton label={"Discard"} />
                    <Space />
                    <PrimaryButton label={"Save"} />
                  </>
                }
              />
            )}
            renderTabs={() => (
              <TabMenu>
                <Tab
                  label={"Selected"}
                  selected={tabId === 0}
                  onClick={() => setTabId(0)}
                />
                <Tab
                  label={"Something"}
                  selected={tabId === 1}
                  onClick={() => setTabId(1)}
                />
                <Tab
                  label={"Something else"}
                  selected={tabId === 2}
                  onClick={() => setTabId(2)}
                />
              </TabMenu>
            )}
          />
          <Space num={4} />
        </Fragment>
      ))}
    </Box>
  );
};

export const VariantsWithNoHeadingContent = () => {
  const variants: PageHeadingVariant[] = ["compact", "standard", "relaxed"];

  return variants.map((variant) => (
    <Fragment key={variant}>
      <PageHeader
        renderBreadCrumbs={() => (
          <BreadCrumbs>
            <Crumb label={"Home"} />
            <Crumb label={"Customer"} />
            <Crumb label={"Booking"} />
          </BreadCrumbs>
        )}
        renderPageHeading={() => (
          <PageHeading heading={variant} variant={variant} />
        )}
      >
        <PageHeaderRow>
          <TextInput />
        </PageHeaderRow>
      </PageHeader>
      <Space num={4} />
    </Fragment>
  ));
};

export const VariantsWithNoBreadCrumbs = () => {
  const variants: PageHeadingVariant[] = ["compact", "standard", "relaxed"];

  return (
    <Box background={cssColor("--lhds-color-ui-300")}>
      {variants.map((variant) => (
        <Fragment key={variant}>
          <PageHeader
            renderPageHeading={() => (
              <PageHeading heading={variant} variant={variant} />
            )}
          >
            <PageHeaderRow>
              <TextInput />
            </PageHeaderRow>
          </PageHeader>
          <Space num={4} />
        </Fragment>
      ))}
    </Box>
  );
};

export const BreadCrumbsAndHeading = () => {
  return (
    <>
      <NavBar
        showMenuButton
        left={
          <Heading variant={"h4"} color={cssColor("--lhds-color-ui-50")}>
            Stena WebUI
          </Heading>
        }
      />
      <PageHeader
        renderBreadCrumbs={() => (
          <BreadCrumbs>
            <Crumb label={"Home"} />
            <Crumb label={"Customer"} />
            <Crumb label={"Booking"} />
          </BreadCrumbs>
        )}
        renderPageHeading={() => <PageHeading heading={"Booking"} />}
      />
    </>
  );
};

export const FilterChips = () => {
  return (
    <PageHeader
      renderBreadCrumbs={() => (
        <BreadCrumbs>
          <Crumb label={"Home"} />
          <Crumb label={"Customer"} />
          <Crumb label={"Booking"} />
        </BreadCrumbs>
      )}
    >
      <PageHeaderRow gap={2} alignItems={"center"}>
        <SecondaryButton leftIcon={stenaSliders} label={"Filters"} />
        <Row gap>
          <Chip variant={"secondary"} label={"All routes"} />
          <Chip variant={"secondary"} label={"All customers"} />
          <Chip variant={"secondary"} label={"All states"} />
        </Row>
      </PageHeaderRow>
    </PageHeader>
  );
};

export const HeadingLevel = () => {
  return (
    <PageHeader
      renderPageHeading={() => (
        <PageHeading heading={"Heading level 2"} headingLevel={"h2"} />
      )}
    />
  );
};
