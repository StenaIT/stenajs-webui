import { ClassNames, keyframes } from "@emotion/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Row, SeparatorLine, Spacing } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import { createStandardButtonTheme } from "@stenajs-webui/theme";
import * as React from "react";
import { ReactNode } from "react";
import * as ReactModal from "react-modal";

const modalAnimateIn = keyframes`
  0% {
      transform: translateY(-20px);
      opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
     background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const BaseModal: React.FC<ReactModal.Props> = props => {
  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          overlayClassName={css`
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.5);
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;

            animation: ${fadeIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

            @media print {
              background-color: rgba(255, 255, 255, 1);
            }
          `}
          className={css`
            position: absolute;
            display: block;

            margin: 1rem auto;

            flex: 0 0 auto;

            border-radius: 4px;

            background-color: #fff;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);

            width: 900px;

            animation: ${modalAnimateIn} 0.3s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

            @media print {
              box-shadow: none;
              top: 0;
            }
          `}
          {...props}
        />
      )}
    </ClassNames>
  );
};

interface ModalProps extends ReactModal.Props {
  modalTitle: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  modalTitle,
  children,
  ...props
}) => (
  <BaseModal {...props}>
    <Row
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={1}
      indent={1}
    >
      {modalTitle}
      <StandardButton
        leftIcon={faTimes}
        width={"32px"}
        onClick={props.onRequestClose as any}
        buttonTheme={createStandardButtonTheme({ height: "32px" })}
      />
    </Row>
    <SeparatorLine />
    <Spacing indent={1}>{children}</Spacing>
  </BaseModal>
);
