import cx from "classnames";
import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { RejectCommand, ResolveCommand, ShowCommand } from "./DialogCommands";
import { DialogContext, DialogContextValue } from "./DialogContext";
import { Modal } from "../declarative-modals/modal/Modal";

type UseDialogCallbacks<TProps, TPromiseResolve> = {
  show: ShowCommand<TProps, TPromiseResolve>;
  reject: RejectCommand;
};

export type UseDialogResult<TProps, TPromiseResolve> = [
  ReactNode,
  UseDialogCallbacks<TProps, TPromiseResolve>,
];

export interface DialogOptions {
  divInsteadOfDialog?: boolean;
  background?: string;
  disableCloseOnClickOutside?: boolean;
  modal: boolean;
  className: string;
  closingClassName: string;
  contentWrapperClassName: string;
  contentWrapperStyle?: CSSProperties;
  dialogStyle?: CSSProperties;
  ref?: RefObject<HTMLDialogElement>;
  onResolve?: () => void;
  onReject?: () => void;
}

export function useDialog<TProps, TPromiseResolve = void>(
  component: React.FC<TProps>,
  options: DialogOptions,
): UseDialogResult<TProps, TPromiseResolve> {
  const localRef = useRef<HTMLDialogElement>(null);
  const currentRef = options.ref ?? localRef;
  const [key, forceRerender] = useReducer((x) => x + 1, 0);
  const promiseRef = useRef<Promise<TPromiseResolve | undefined>>();
  const resolveRef = useRef<ResolveCommand<TPromiseResolve> | undefined>();
  const modalComponentProps = useRef<TProps>();
  const rejectRef = useRef<RejectCommand | undefined>();
  const [contentVisible, setContentVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const Comp = component;

  const show = useCallback<ShowCommand<TProps, TPromiseResolve>>(
    (props?: TProps) => {
      promiseRef.current = new Promise<TPromiseResolve | undefined>(
        (resolve, reject) => {
          resolveRef.current = resolve;
          rejectRef.current = reject;
        },
      );
      setClosing(false);
      setContentVisible(true);
      forceRerender();
      modalComponentProps.current = props;
      if (options.modal) {
        currentRef.current?.showModal();
      } else {
        currentRef.current?.show();
      }
      return promiseRef.current;
    },
    [currentRef, options.modal],
  );

  const resolve = useCallback<ResolveCommand<TPromiseResolve>>(
    (value) => {
      // Trigger closing animation.
      setClosing(true);
      if (!options.divInsteadOfDialog) {
        currentRef.current?.addEventListener(
          "animationend",
          () => {
            setClosing(false);
            setContentVisible(false);
            currentRef.current?.close();
            resolveRef.current?.(value);
            modalComponentProps.current = undefined;
            options.onResolve?.();
          },
          { once: true },
        );
      } else {
        setClosing(false);
        setContentVisible(false);
        resolveRef.current?.(value);
        modalComponentProps.current = undefined;
        options.onResolve?.();
      }
    },
    [currentRef, options],
  );

  const onClose = useCallback(() => {
    // Remove content immediately, since it cannot be animated when closed by browser.
    setClosing(false);
    setContentVisible(false);
    rejectRef.current?.();
    options.onReject?.();
    modalComponentProps.current = undefined;
  }, [options]);

  const reject = useCallback<RejectCommand>(
    (error) => {
      // Trigger closing animation.
      setClosing(true);
      if (!options.divInsteadOfDialog) {
        currentRef.current?.addEventListener(
          "animationend",
          () => {
            setClosing(false);
            setContentVisible(false);
            currentRef.current?.close();
            rejectRef.current?.(error);
            options.onReject?.();
            modalComponentProps.current = undefined;
          },
          { once: true },
        );
      } else {
        setClosing(false);
        setContentVisible(false);
        rejectRef.current?.(error);
        options.onReject?.();
        modalComponentProps.current = undefined;
      }
    },
    [currentRef, options],
  );

  const onClick = useCallback<MouseEventHandler<HTMLDialogElement>>(
    (e) => {
      if (e.target !== currentRef.current) {
        return;
      }

      const rect = currentRef.current.getBoundingClientRect();

      const clickedInsideDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!clickedInsideDialog) {
        reject();
      }
    },
    [currentRef, reject],
  );

  const contextValue = useMemo(
    () => ({ resolve, reject }) as DialogContextValue<unknown>,
    [reject, resolve],
  );

  const element = useMemo<ReactNode>(
    () =>
      options.divInsteadOfDialog ? (
        <Modal
          isOpen={contentVisible}
          onRequestClose={reject}
          background={options.background}
        >
          <DialogContext.Provider value={contextValue}>
            <div
              style={options?.contentWrapperStyle}
              className={options?.contentWrapperClassName}
            >
              {contentVisible && (
                <Comp {...(modalComponentProps.current as TProps)} key={key} />
              )}
            </div>
          </DialogContext.Provider>
        </Modal>
      ) : (
        <dialog
          onClick={options.disableCloseOnClickOutside ? undefined : onClick}
          onClose={onClose}
          ref={currentRef}
          className={cx(options.className, closing && options.closingClassName)}
          style={{ background: options.background, ...options.dialogStyle }}
        >
          <div
            style={options.contentWrapperStyle}
            className={options.contentWrapperClassName}
          >
            {contentVisible && (
              <DialogContext.Provider value={contextValue}>
                <Comp {...(modalComponentProps.current as TProps)} key={key} />
              </DialogContext.Provider>
            )}
          </div>
        </dialog>
      ),
    [
      options.divInsteadOfDialog,
      options.disableCloseOnClickOutside,
      options.className,
      options.closingClassName,
      options.dialogStyle,
      options.contentWrapperStyle,
      options.contentWrapperClassName,
      onClick,
      onClose,
      currentRef,
      closing,
      contentVisible,
      contextValue,
      Comp,
      key,
      reject,
    ],
  );

  return [element, { show, reject }];
}
