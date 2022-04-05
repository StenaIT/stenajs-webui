import * as React from "react";
import { PageHeader, PageHeaderRow } from "./PageHeader";
import {
  BreadCrumbs,
  Chip,
  Crumb,
  PrimaryButton,
  SecondaryButton,
  Tab,
  TabMenu,
  Tag,
} from "@stenajs-webui/elements";
import { PageHeading, PageHeadingVariant } from "./PageHeading";
import { Box, Heading, Row, Space } from "@stenajs-webui/core";
import { Fragment, useState } from "react";
import { TextInput } from "@stenajs-webui/forms";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons/faSlidersH";

export default {
  title: "panels/PageHeader",
  parameters: {
    layout: "fullscreen",
  },
  component: PageHeader,
};

export const Demo = () => {
  const [tabId, setTabId] = useState(0);
  return (
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
  );
};

export const Variants = () => {
  const variants: PageHeadingVariant[] = ["compact", "default", "relaxed"];
  const [tabId, setTabId] = useState(0);

  return variants.map((variant) => (
    <Fragment key={variant}>
      <Heading>{variant}</Heading>
      <Space num={2} />
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
            heading={"Page Header"}
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
      >
        <PageHeaderRow gap={2}>
          <Box>
            <TextInput />
          </Box>
          <PrimaryButton label={"Action"} />
        </PageHeaderRow>
      </PageHeader>
      <Space num={4} />
    </Fragment>
  ));
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
        <SecondaryButton leftIcon={faSlidersH} label={"Filters"} />
        <Row gap>
          <Chip variant={"secondary"} label={"All routes"} />
          <Chip variant={"secondary"} label={"All customers"} />
          <Chip variant={"secondary"} label={"All states"} />
        </Row>
      </PageHeaderRow>
    </PageHeader>
  );
};
