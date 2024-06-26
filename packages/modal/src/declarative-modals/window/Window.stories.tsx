import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { Box, Row, Space, Spacing, Text, Txt } from "@stenajs-webui/core";
import {
  ActionMenuItem,
  ActionMenuItemContent,
  ActionMenuLink,
  Icon,
  PrimaryButton,
  SecondaryButton,
} from "@stenajs-webui/elements";
import * as React from "react";
import { useState } from "react";
import ReactModal from "react-modal";
import { BaseWindow, DRAGGABLE_CANCEL_CLASSNAME } from "./BaseWindow";
import { Window } from "./Window";
import { cssColor } from "@stenajs-webui/theme";
import { ActionMenuSecondaryButton } from "@stenajs-webui/panels";
import { faJediOrder } from "@fortawesome/free-brands-svg-icons";
import { WindowFooter } from "./WindowFooter";

export default {
  title: "modal/Declarative modals/Window",
  component: Window,
};

ReactModal.setAppElement("#storybook-root");

export const WindowWithHeader = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        headerText={"Window title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {loremIpsumSampleText}
      </Window>
    </>
  );
};

export const Mobile = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        headerText={"Window title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {loremIpsumSampleText}
      </Window>
    </>
  );
};

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const MobileWithFixedWidth = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        width={"300px"}
        headerText={"Window title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        This should still be full width of screen.
        <br />
        <br />
        {loremIpsumSampleText}
      </Window>
    </>
  );
};

MobileWithFixedWidth.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const WindowWithCustomHeaderComponent = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        header={
          <Row justifyContent={"flex-start"}>
            <Icon icon={faLeaf} />
            <Space />
            <Text variant={"bold"}>Custom window title</Text>
          </Row>
        }
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {loremIpsumSampleText}
      </Window>
    </>
  );
};

export const WindowWithFixedWidth = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        width={"300px"}
        headerText={"Window title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <Box spacing={2}>{loremIpsumSampleText}</Box>
      </Window>
    </>
  );
};

export const WindowWithMaxWidth = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        maxWidth={"400px"}
        headerText={"Window title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <Box spacing={2}>{loremIpsumSampleText}</Box>
      </Window>
    </>
  );
};

export const WindowWithScroll = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <Window
        headerText={"Window title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faCoffee} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faLeaf} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faAddressBook} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faLeaf} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faAddressBook} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faLeaf} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faAddressBook} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
      </Window>
    </>
  );
};

export const BaseWindowDemo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <BaseWindow isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <Spacing indent>window without header</Spacing>
      </BaseWindow>
    </>
  );
};

export const BaseWindowMobile = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open window"} />
      <BaseWindow isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <Spacing indent>window without header</Spacing>
      </BaseWindow>
    </>
  );
};

BaseWindowMobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const DraggableWindow = () => {
  const [isWindowOpen, setWindowOpen] = useState(false);
  return (
    <div>
      <PrimaryButton
        onClick={() => setWindowOpen(true)}
        label={"Open window"}
      />
      <Window
        headerText={"Draggable window"}
        isOpen={isWindowOpen}
        onRequestClose={() => setWindowOpen(false)}
        shouldCloseOnOverlayClick
        draggable
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the header but not the text.</Txt>
        </Box>
      </Window>
    </div>
  );
};

export const CustomDraggableWindow = () => {
  const [isCustomWindowOpen, setCustomWindowOpen] = useState(false);
  return (
    <div>
      <PrimaryButton
        onClick={() => setCustomWindowOpen(true)}
        label={"Open custom window"}
      />
      <Window
        headerText={"Non-draggable text"}
        header={
          <Row
            background={cssColor("--lhds-color-orange-200")}
            flex={1}
            spacing
            indent={2}
            justifyContent={"space-around"}
            alignItems={"center"}
            height={64}
          >
            <Txt variant={"bold"}>This is custom content</Txt>
            <Box
              className={DRAGGABLE_CANCEL_CLASSNAME}
              background={cssColor("--lhds-color-orange-400")}
              indent={2}
            >
              <Txt variant={"bold"}>I am not draggable</Txt>
            </Box>
            <SecondaryButton label={"Buttons are not draggable"} />
            <ActionMenuSecondaryButton
              renderItems={() => (
                <>
                  <ActionMenuItem label={"Button"} />
                  <ActionMenuLink label={"Link"} />
                  <ActionMenuItemContent
                    label={"Content"}
                    right={
                      <SecondaryButton size={"small"} leftIcon={faJediOrder} />
                    }
                  />
                </>
              )}
            />
          </Row>
        }
        isOpen={isCustomWindowOpen}
        onRequestClose={() => setCustomWindowOpen(false)}
        shouldCloseOnOverlayClick
        draggable
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the header except the non-draggable parts.</Txt>
        </Box>
      </Window>
    </div>
  );
};

export const WindowWithStickyContentBottom = () => {
  const [isStickyFooterWindowOpen, setStickyFooterWindowOpen] = useState(false);
  return (
    <div>
      <PrimaryButton
        onClick={() => setStickyFooterWindowOpen(true)}
        label={"Open sticky footer window"}
      />
      <Window
        headerText={"Header text"}
        isOpen={isStickyFooterWindowOpen}
        onRequestClose={() => setStickyFooterWindowOpen(false)}
        shouldCloseOnOverlayClick
        width={"750px"}
        footer={
          <WindowFooter>
            <Row justifyContent={"space-around"} alignItems={"center"}>
              <PrimaryButton
                onClick={() => setStickyFooterWindowOpen(false)}
                label={"Example button 1"}
              />
              <PrimaryButton
                onClick={() => setStickyFooterWindowOpen(false)}
                label={"Example button 2"}
              />
            </Row>
          </WindowFooter>
        }
      >
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faCoffee} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faLeaf} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faAddressBook} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faLeaf} />
        </Row>
        <Box spacing={2}>{loremIpsumSampleText}</Box>
        <Row justifyContent={"center"} alignItems={"center"}>
          <Icon size={20} icon={faAddressBook} />
        </Row>
      </Window>
    </div>
  );
};

const loremIpsumSampleText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem?`;
