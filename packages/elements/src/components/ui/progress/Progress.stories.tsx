import { color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Progress } from '@stenajs-webui/elements';

storiesOf('elements/Progress/Progress', module)
  .add('standard', () => <Progress/>)
  .add('with custom color', () => (
    <Progress trackColor={color('trackColor', 'red')}/>
  ));
