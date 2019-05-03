import { debounce } from "lodash-es";
import * as React from "react";

// tslint:disable:no-any
export type DebouncedFunc = (...args: any[]) => any;

// tslint:enable:no-any

export interface DebounceProps {
  func: DebouncedFunc;
  delay?: number;
  children: (func: DebouncedFunc) => React.ReactElement<{}>;
}

export class Debounce extends React.Component<DebounceProps> {
  funcDebounced: DebouncedFunc | undefined = undefined;

  constructor(props: DebounceProps) {
    super(props);
  }

  componentWillMount() {
    const { func, delay = 500 } = this.props;
    this.funcDebounced = debounce(func, delay);
  }

  render() {
    const { children } = this.props;
    return children(this.funcDebounced!);
  }
}
