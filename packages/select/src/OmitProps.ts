import { omit } from 'lodash/fp';
import { mapProps } from 'recompose';

export const omitProps = (keys: Array<string>) =>
  mapProps(props => omit(keys, props));
