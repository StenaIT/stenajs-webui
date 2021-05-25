import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { Box, Row, Space, Spacing, Text, Txt } from "@stenajs-webui/core";
import { Icon, PrimaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useState } from "react";
import * as ReactModal from "react-modal";
import { BaseModal, DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";
import { Modal } from "./Modal";
import { cssColor } from "@stenajs-webui/theme";

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
  const [isBarModalOpen, setBarModalOpen] = useState(false);
  const [isHandleModalOpen, setHandleModalOpen] = useState(false);
  const [isCustomModalOpen, setCustomModalOpen] = useState(false);
  return (
    <div>
      <Txt>These are different takes on a draggable modal.</Txt>
      <Space num={2} />
      <PrimaryButton
        onClick={() => setBarModalOpen(true)}
        label={"Open bar modal"}
      />
      <Space num={2} />
      <PrimaryButton
        onClick={() => setHandleModalOpen(true)}
        label={"Open handle modal"}
      />
      <Space num={2} />
      <PrimaryButton
        onClick={() => setCustomModalOpen(true)}
        label={"Open custom modal"}
      />
      <Modal
        headerText={"Bar modal"}
        isOpen={isBarModalOpen}
        onRequestClose={() => setBarModalOpen(false)}
        draggable
        draggableBar
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the bar in the top.</Txt>
        </Box>
      </Modal>
      <Modal
        headerText={"Handle modal"}
        isOpen={isHandleModalOpen}
        onRequestClose={() => setHandleModalOpen(false)}
        draggable
        draggableHandle
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the handle on the left.</Txt>
        </Box>
      </Modal>
      <Modal
        headerText={"Custom modal"}
        header={
          <Row
            background={cssColor("--lhds-color-orange-200")}
            flex={1}
            spacing
            indent={2}
            justifyContent={"space-around"}
          >
            <Txt variant={"bold"}>This is custom content</Txt>
            <Box
              className={DRAGGABLE_HANDLE_CLASSNAME}
              background={cssColor("--lhds-color-orange-400")}
              indent={2}
            >
              <Txt variant={"bold"}>I am the draggable part</Txt>
            </Box>
          </Row>
        }
        isOpen={isCustomModalOpen}
        onRequestClose={() => setCustomModalOpen(false)}
        draggable
      >
        <Box indent={2} spacing>
          <Txt>Drag me using the customized draggable part of my header.</Txt>
          <Space num={2} />
          <Txt variant={"bold"}>
            Don't forget to specify the draggable part in the code!
          </Txt>
        </Box>
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
