import { useBoolean } from "@stenajs-webui/core";
import cx from "classnames";
import React, {
  ReactNode,
  useCallback,
  useMemo,
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
}

export const useModal = <TProps extends {}, TPromiseResolve>(
  component: React.FC<TProps>,
  options?: ModalOptions
): UseModalResult<TProps, TPromiseResolve> => {
  const ref = useRef<HTMLDialogElement>(null);
  const promiseRef = useRef<Promise<TPromiseResolve | undefined>>();
  const resolveRef = useRef<
    ((value: TPromiseResolve | undefined) => void) | undefined
  >();
  const rejectRef = useRef<((error?: Error) => void) | undefined>();
  const [currentProps, setCurrentProps] = useState<TProps | undefined>();
  const [closing, setClosing, setNotClosing] = useBoolean(false);

  const Comp = component;

  const show = useCallback<ShowCommand<TProps, TPromiseResolve>>(
    (props: TProps) => {
      promiseRef.current = new Promise<TPromiseResolve | undefined>(
        (resolve, reject) => {
          resolveRef.current = resolve;
          rejectRef.current = reject;
        }
      );
      setNotClosing();
      setCurrentProps(props);
      ref.current?.showModal();
      return promiseRef.current;
    },
    [setNotClosing]
  );

  const resolve = useCallback<ResolveCommand<TPromiseResolve>>(() => {
    setClosing();
    const listener = () => {
      setNotClosing();
      ref.current?.close();
      resolveRef.current?.(undefined);
      ref.current?.removeEventListener("animationend", listener);
    };
    ref.current?.addEventListener("animationend", listener);
  }, [setClosing, setNotClosing]);

  const reject = useCallback<RejectCommand>(
    (error) => {
      setClosing();
      const listener = () => {
        setNotClosing();
        ref.current?.close();
        rejectRef.current?.(error);
        ref.current?.removeEventListener("animationend", listener);
      };
      ref.current?.addEventListener("animationend", listener);
    },
    [setClosing, setNotClosing]
  );

  const dialogElement = useMemo<ReactNode>(
    () => (
      <ModalContext.Provider value={{ resolve, reject }}>
        <dialog
          onClick={() => reject()}
          ref={ref}
          className={cx(
            styles.dialog,
            closing && styles.close,
            options?.className
          )}
        >
          <div onClick={(ev) => ev.stopPropagation()}>
            {currentProps && <Comp {...currentProps} />}
          </div>
        </dialog>
      </ModalContext.Provider>
    ),
    [Comp, closing, currentProps, options?.className, reject, resolve]
  );

  return [dialogElement, { show, reject }];
};
