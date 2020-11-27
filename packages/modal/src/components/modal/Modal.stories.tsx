import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { Box, Row, Space, Spacing, Text } from "@stenajs-webui/core";
import { Icon, PrimaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useState } from "react";
import * as ReactModal from "react-modal";
import { BaseModal } from "../../../dist/components/modal/BaseModal";
import { Modal } from "./Modal";

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

export const DraggableModal = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)} label={"Open modal"} />
      <Modal
        headerText={"Draggable modal title here"}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        draggable
      >
        {loremIpsumSampleText}
      </Modal>
    </>
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
