import cx from "classnames";
import React, {
  CSSProperties,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { RejectCommand, ResolveCommand, ShowCommand } from "./DialogCommands";
import { DialogContext } from "./DialogContext";

type UseDialogCallbacks<TProps, TPromiseResolve> = {
  show: ShowCommand<TProps, TPromiseResolve>;
  reject: RejectCommand;
};

export type UseDialogResult<TProps, TPromiseResolve> = [
  ReactNode,
  UseDialogCallbacks<TProps, TPromiseResolve>
];

export interface DialogOptions {
  disableCloseOnClickOutside?: boolean;
  modal: boolean;
  className: string;
  closingClassName: string;
  contentWrapperClassName: string;
  dialogStyle?: CSSProperties;
  ref?: RefObject<HTMLDialogElement>;
  onResolve?: () => void;
  onReject?: () => void;
}

export function useDialog<TProps, TPromiseResolve = void>(
  component: React.FC<TProps>,
  options: DialogOptions
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
        }
      );
      setClosing(false);
      setContentVisible(true);
      forceRerender();
      modalComponentProps.current = props;
      if (options?.modal) {
        currentRef.current?.showModal();
      } else {
        currentRef.current?.show();
      }
      return promiseRef.current;
    },
    [currentRef, options?.modal]
  );

  const resolve = useCallback<ResolveCommand<TPromiseResolve>>(
    (value) => {
      setClosing(true);
      currentRef.current?.addEventListener(
        "animationend",
        () => {
          setClosing(false);
          setContentVisible(false);
          currentRef.current?.close();
          resolveRef.current?.(value);
          modalComponentProps.current = undefined;
          options?.onResolve?.();
        },
        { once: true }
      );
    },
    [currentRef, options]
  );

  const reject = useCallback<RejectCommand>(
    (error) => {
      setClosing(true);
      currentRef.current?.addEventListener(
        "animationend",
        () => {
          setClosing(false);
          setContentVisible(false);
          currentRef.current?.close();
          rejectRef.current?.(error);
          options?.onReject?.();
          modalComponentProps.current = undefined;
        },
        { once: true }
      );
    },
    [currentRef, options]
  );

  const dialogElement = useMemo<ReactNode>(
    () => (
      <DialogContext.Provider value={{ resolve, reject }}>
        <dialog
          onClick={
            options?.disableCloseOnClickOutside ? undefined : () => reject()
          }
          ref={currentRef}
          className={cx(
            options?.className,
            closing && options?.closingClassName
          )}
          style={options?.dialogStyle}
        >
          {options?.disableCloseOnClickOutside ? (
            <>
              {contentVisible && (
                <Comp {...(modalComponentProps.current as TProps)} key={key} />
              )}
            </>
          ) : (
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
          )}
        </dialog>
      </DialogContext.Provider>
    ),
    [
      resolve,
      reject,
      options?.disableCloseOnClickOutside,
      options?.className,
      options?.closingClassName,
      options?.dialogStyle,
      options?.contentWrapperClassName,
      currentRef,
      closing,
      contentVisible,
      Comp,
      key,
    ]
  );

  return [dialogElement, { show, reject }];
}
