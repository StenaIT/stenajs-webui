export type ShowCommand<TProps, TPromiseResolve> = keyof TProps extends never
  ? () => Promise<TPromiseResolve | undefined>
  : (props: TProps) => Promise<TPromiseResolve | undefined>;

export type ResolveCommand<TPromiseResolve> = (
  resolveValue: TPromiseResolve,
) => void;

export type RejectCommand = (error?: Error) => void;
