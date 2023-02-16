import cx from "classnames";
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { RejectCommand, ResolveCommand, ShowCommand } from "./ModalCommands";
import { ModalContext } from "./ModalContext";
import styles from "./Modal.module.css";

type UseModalCallbacks<TProps, TPromiseResolve> = {
  show: ShowCommand<TProps, TPromiseResolve>;
  reject: RejectCommand;
};

export type UseModalResult<TProps, TPromiseResolve> = [
  ReactNode,
  UseModalCallbacks<TProps, TPromiseResolve>
];

export interface ModalOptions {
  disableCloseOnClickOutside?: boolean;
  className?: string;
  closingClassName?: string;
  contentWrapperClassName?: string;
}

export function useModal<TProps, TPromiseResolve = void>(
  component: React.FC<TProps>,
  options?: ModalOptions
): UseModalResult<TProps, TPromiseResolve> {
  const ref = useRef<HTMLDialogElement>(null);
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
        }
      );
      setClosing(false);
      setContentVisible(true);
      forceRerender();
      modalComponentProps.current = props;
      ref.current?.showModal();
      return promiseRef.current;
    },
    []
  );

  const resolve = useCallback<ResolveCommand<TPromiseResolve>>(
    (value) => {
      setClosing(true);
      ref.current?.addEventListener(
        "animationend",
        () => {
          setClosing(false);
          setContentVisible(false);
          ref.current?.close();
          resolveRef.current?.(value);
          modalComponentProps.current = undefined;
        },
        { once: true }
      );
    },
    [setClosing]
  );

  const reject = useCallback<RejectCommand>(
    (error) => {
      setClosing(true);
      ref.current?.addEventListener(
        "animationend",
        () => {
          setClosing(false);
          setContentVisible(false);
          ref.current?.close();
          rejectRef.current?.(error);
          modalComponentProps.current = undefined;
        },
        { once: true }
      );
    },
    [setClosing]
  );

  const dialogElement = useMemo<ReactNode>(
    () => (
      <ModalContext.Provider value={{ resolve, reject }}>
        <dialog
          onClick={
            options?.disableCloseOnClickOutside ? undefined : () => reject()
          }
          ref={ref}
          className={cx(
            styles.modal,
            closing && styles.closing,
            closing && options?.closingClassName,
            options?.className
          )}
        >
          <div
            className={options?.contentWrapperClassName}
            onClick={
              options?.disableCloseOnClickOutside
                ? undefined
                : (ev) => ev.stopPropagation()
            }
          >
            {contentVisible && (
              <Comp {...(modalComponentProps.current as TProps)} key={key} />
            )}
          </div>
        </dialog>
      </ModalContext.Provider>
    ),
    [
      resolve,
      reject,
      options?.disableCloseOnClickOutside,
      options?.closingClassName,
      options?.className,
      options?.contentWrapperClassName,
      closing,
      contentVisible,
      Comp,
      key,
    ]
  );

  return [dialogElement, { show, reject }];
}
