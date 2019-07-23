import { Store, withState } from "@dump247/storybook-state";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { Box, Row, Spacing, StandardText } from "@stenajs-webui/core";
import { Icon, StandardButton } from "@stenajs-webui/elements";
import { BaseModal, Modal } from "@stenajs-webui/modal";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  isOpen: boolean;
}

storiesOf("modal/Modal", module)
  .add(
    "modal with header",
    withState<State>({
      isOpen: false
    })(({ store }: { store: Store<State> }) => (
      <>
        <StandardButton
          onClick={() => store.set({ isOpen: true })}
          label={"Open modal"}
        />
        <Modal
          modalTitle={
            <StandardText fontWeight={"bold"}>Modal title here</StandardText>
          }
          isOpen={store.state.isOpen}
          onRequestClose={() => store.set({ isOpen: false })}
        >
          modal contents
        </Modal>
      </>
    ))
  )
  .add(
    "modal with scroll",
    withState<State>({
      isOpen: false
    })(({ store }: { store: Store<State> }) => (
      <>
        <StandardButton
          onClick={() => store.set({ isOpen: true })}
          label={"Open modal"}
        />
        <Modal
          modalTitle={
            <StandardText fontWeight={"bold"}>Modal title here</StandardText>
          }
          isOpen={store.state.isOpen}
          onRequestClose={() => store.set({ isOpen: false })}
        >
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faCoffee} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faLeaf} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Doloribus earum eius excepturi nam nemo numquam
            repellat sit velit. Ab architecto dolorum maiores numquam officia
            perspiciatis repellendus repudiandae tempore veritatis, voluptatem?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faAddressBook} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faLeaf} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Doloribus earum eius excepturi nam nemo numquam
            repellat sit velit. Ab architecto dolorum maiores numquam officia
            perspiciatis repellendus repudiandae tempore veritatis, voluptatem?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faAddressBook} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faLeaf} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Doloribus earum eius excepturi nam nemo numquam
            repellat sit velit. Ab architecto dolorum maiores numquam officia
            perspiciatis repellendus repudiandae tempore veritatis, voluptatem?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem?
          </Box>
          <Row justifyContent={"center"} alignItems={"center"}>
            <Icon size={20} icon={faAddressBook} />
          </Row>
          <Box spacing={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            earum eius excepturi nam nemo numquam repellat sit velit. Ab
            architecto dolorum maiores numquam officia perspiciatis repellendus
            repudiandae tempore veritatis, voluptatem? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloribus earum eius excepturi
            nam nemo numquam repellat sit velit. Ab architecto dolorum maiores
            numquam officia perspiciatis repellendus repudiandae tempore
            veritatis, voluptatem?
          </Box>
        </Modal>
      </>
    ))
  )
  .add(
    "base modal",
    withState<State>({
      isOpen: false
    })(({ store }: { store: Store<State> }) => (
      <>
        <StandardButton
          onClick={() => store.set({ isOpen: true })}
          label={"Open modal"}
        />
        <BaseModal
          isOpen={store.state.isOpen}
          onRequestClose={() => store.set({ isOpen: false })}
        >
          <Spacing indent>modal without header</Spacing>
        </BaseModal>
      </>
    ))
  );
