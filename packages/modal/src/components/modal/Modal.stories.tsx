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
import { BaseModal, DRAGGABLE_CANCEL_CLASSNAME } from "./BaseModal";
import { Modal } from "./Modal";
import { cssColor } from "@stenajs-webui/theme";
import { ActionMenuSecondaryButton } from "@stenajs-webui/panels";
import { faJediOrder } from "@fortawesome/free-brands-svg-icons";
import { ModalFooter } from "./ModalFooter";

export default {
  title: "modal/Modal",
  component: Modal,
};

ReactModal.setAppElement("#root");

export const ModalWithHeader = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        headerText={"Modal title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {loremIpsumSampleText}
      </Modal>
    </>
  );
};

export const Mobile = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        headerText={"Modal title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {loremIpsumSampleText}
      </Modal>
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
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        width={"300px"}
        headerText={"Modal title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        This should still be full width of screen.
        <br />
        <br />
        {loremIpsumSampleText}
      </Modal>
    </>
  );
};

MobileWithFixedWidth.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const ModalWithCustomHeaderComponent = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        header={
          <Row justifyContent={"flex-start"}>
            <Icon icon={faLeaf} />
            <Space />
            <Text variant={"bold"}>Custom modal title</Text>
          </Row>
        }
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {loremIpsumSampleText}
      </Modal>
    </>
  );
};

export const ModalWithFixedWidth = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        width={"300px"}
        headerText={"Modal title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <Box spacing={2}>{loremIpsumSampleText}</Box>
      </Modal>
    </>
  );
};

export const ModalWithMaxWidth = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        maxWidth={"400px"}
        headerText={"Modal title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <Box spacing={2}>{loremIpsumSampleText}</Box>
      </Modal>
    </>
  );
};

export const ModalWithScroll = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        headerText={"Modal title here"}
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
      </Modal>
    </>
  );
};

export const _BaseModal = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <BaseModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <Spacing indent>modal without header</Spacing>
      </BaseModal>
    </>
  );
};

export const BaseModalMobile = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <BaseModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <Spacing indent>modal without header</Spacing>
      </BaseModal>
    </>
  );
};

BaseModalMobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const DraggableModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <PrimaryButton onClick={() => setModalOpen(true)} label={"Open modal"} />
      <Modal
        headerText={"Draggable modal"}
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnOverlayClick
        draggable
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the header but not the text.</Txt>
        </Box>
      </Modal>
    </div>
  );
};

export const CustomDraggableModal = () => {
  const [isCustomModalOpen, setCustomModalOpen] = useState(false);
  return (
    <div>
      <PrimaryButton
        onClick={() => setCustomModalOpen(true)}
        label={"Open custom modal"}
      />
      <Modal
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
        isOpen={isCustomModalOpen}
        onRequestClose={() => setCustomModalOpen(false)}
        shouldCloseOnOverlayClick
        draggable
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the header except the non-draggable parts.</Txt>
        </Box>
      </Modal>
    </div>
  );
};

export const ModalWithStickyContentBottom = () => {
  const [isStickyFooterModalOpen, setStickyFootertModalOpen] = useState(false);
  return (
    <div>
      <PrimaryButton
        onClick={() => setStickyFootertModalOpen(true)}
        label={"Open sticky footer modal"}
      />
      <Modal
        headerText={"Header text"}
        isOpen={isStickyFooterModalOpen}
        onRequestClose={() => setStickyFootertModalOpen(false)}
        shouldCloseOnOverlayClick
        width={"750px"}
        footer={
          <ModalFooter>
            <Row justifyContent={"space-around"} alignItems={"center"}>
              <PrimaryButton
                onClick={() => setStickyFootertModalOpen(false)}
                label={"Example button 1"}
              />
              <PrimaryButton
                onClick={() => setStickyFootertModalOpen(false)}
                label={"Example button 2"}
              />
            </Row>
          </ModalFooter>
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
      </Modal>
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
