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
import { ModalContext } from "./ModalContext";

export type ShowCommand<TProps, TPromiseResolve> = (
  props: TProps
) => Promise<TPromiseResolve | undefined>;

export type ResolveCommand<TPromiseResolve> = (
  resolveValue: TPromiseResolve
) => void;

export type RejectCommand = (error?: Error) => void;

type ModalCommands<TProps, TPromiseResolve> = {
  show: ShowCommand<TProps, TPromiseResolve>;
  reject: RejectCommand;
};

type UseModalResult<TProps, TPromiseResolve> = [
  ReactNode,
  ModalCommands<TProps, TPromiseResolve>
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
  const resolveRef = useRef<
    ((value: TPromiseResolve | undefined) => void) | undefined
  >();
  const rejectRef = useRef<((error?: Error) => void) | undefined>();
  const [currentProps, setCurrentProps] = useState<TProps | undefined>();
  const [closing, setClosing] = useState(false);

  const Comp = component;

  const show = useCallback<ShowCommand<TProps, TPromiseResolve>>(
    (props: TProps) => {
      promiseRef.current = new Promise<TPromiseResolve | undefined>(
        (resolve, reject) => {
          resolveRef.current = resolve;
          rejectRef.current = reject;
        }
      );
      setClosing(false);
      forceRerender();
      setCurrentProps(props);
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
          ref.current?.close();
          resolveRef.current?.(value);
        },
        { once: true }
      );
    },
    [setClosing]
  );

  const reject = useCallback<RejectCommand>(
    (error) => {
      setClosing(true);
      const listener = () => {
        setClosing(false);
        ref.current?.close();
        rejectRef.current?.(error);
      };
      ref.current?.addEventListener("animationend", listener, { once: true });
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
            {currentProps && <Comp {...currentProps} key={key} />}
          </div>
        </dialog>
      </ModalContext.Provider>
    ),
    [
      Comp,
      closing,
      currentProps,
      key,
      options?.className,
      options?.overlayDivClassName,
      reject,
      resolve,
    ]
  );

  return [dialogElement, { show, reject }];
}
