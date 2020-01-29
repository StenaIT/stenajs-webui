import { ClassNames, keyframes } from "@emotion/core";
import {
  ThemeColorField,
  useThemeFields,
  useThemeSelector
} from "@stenajs-webui/core";
import * as React from "react";
import * as ReactModal from "react-modal";
import Draggable from "react-draggable";

const modalAnimateIn = keyframes`
  0% {
    top: -1rem;
    opacity: 0;
  }
  100% {
    top: 1rem;
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

export interface BaseModalProps extends ReactModal.Props {
  width?: string;
  background?: ThemeColorField | string;
  onRequestClose?: () => void;
  draggable?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  width = "900px",
  background = "primaryBg",
  draggable = false,
  children,
  ...props
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        background
      }
    },
    [background]
  );
  const { modalShadow } = useThemeSelector(
    theme => ({
      modalShadow: theme.shadows.modal
    }),
    []
  );

  return (
    <ClassNames>
      {({ css, cx }) => {
        const contentClassName = css`
          position: relative;
          display: block;

          background: ${colors.background};
          box-shadow: ${modalShadow};
          pointer-events: all;

          width: ${width};
          max-width: 100%;

          animation: ${modalAnimateIn} 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
            both;

          @media print {
            box-shadow: none;
            top: 0;
          }

          :focus {
            outline: 0;
          }
        `;

        const handle = css`
          .handle {
            cursor: move;
          }
        `;

        return (
          <ReactModal
            overlayClassName={css`
              position: fixed;
              z-index: 10;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              overflow: auto;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              padding: 8px;

              animation: ${fadeIn} 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
                both;

              @media print {
                background-color: rgba(255, 255, 255, 1);
              }
            `}
            className={css`
              max-width: 100%;
              outline: none;
              pointer-events: none;
            `}
            {...props}
          >
            <Draggable
              handle=".handle"
              bounds=".ReactModal__Overlay"
              disabled={!draggable}
            >
              <div className={cx(contentClassName, { [handle]: draggable })}>
                {children}
              </div>
            </Draggable>
          </ReactModal>
        );
      }}
    </ClassNames>
  );
};
