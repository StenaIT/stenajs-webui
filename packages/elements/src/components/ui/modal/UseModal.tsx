import cx from "classnames";
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./Dialog.module.css";
import { RejectCommand, ResolveCommand, ShowCommand } from "./ModalCommands";
import { ModalContext } from "./ModalContext";

type UseModalCallbacks<TProps, TPromiseResolve> = {
  show: ShowCommand<TProps, TPromiseResolve>;
  reject: RejectCommand;
};

type UseModalResult<TProps, TPromiseResolve> = [
  ReactNode,
  UseModalCallbacks<TProps, TPromiseResolve>
];

interface ModalOptions {
  className?: string;
  overlayDivClassName?: string;
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
          onClick={() => reject()}
          ref={ref}
          className={cx(
            styles.dialog,
            closing && styles.closing,
            options?.className
          )}
        >
          <div
            className={options?.overlayDivClassName}
            onClick={(ev) => ev.stopPropagation()}
          >
            {contentVisible && (
              <Comp {...(modalComponentProps.current as TProps)} key={key} />
            )}
          </div>
        </dialog>
      </ModalContext.Provider>
    ),
    [
      Comp,
      closing,
      contentVisible,
      key,
      options?.className,
      options?.overlayDivClassName,
      reject,
      resolve,
    ]
  );

  return [dialogElement, { show, reject }];
}
