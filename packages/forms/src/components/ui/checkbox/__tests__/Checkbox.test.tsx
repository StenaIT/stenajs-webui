import { shallow } from 'enzyme';
import * as React from 'react';
import { Clickable } from '@stenajs-webui/core';
import { defaultTheme } from '@stenajs-webui/core';
import { Icon } from '@stenajs-webui/elements';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  const props = {
    onChange: jest.fn(),
  };

  describe('disabled', () => {
    describe('when disabled is true', () => {
      it('sets onClick to undefined', () => {
        const wrapper = shallow(
          <Checkbox {...props} disabled />,
        );
        expect(wrapper.find(Clickable).prop('onClick')).toBe(undefined);
      });
    });

    describe('when disabled is false', () => {
      it('sets onClick to specified onClick', () => {
        // TODO
        // const value = true;
        // const wrapper = shallow(
        //   <Checkbox {...props} value={value} />,
        // );
        // wrapper.find(Clickable).prop('onClick')();
        // expect(props.onChange).toHaveBeenCalledWith(!value);
        expect(true).toBe(false);
      });
    });
  });

  describe('icon', () => {
    describe('when checked', () => {
      it('uses specified icon from theme', () => {
        const wrapper = shallow(
          <Checkbox {...props} value={true} />,
        );
        expect(wrapper.find(Icon).prop('name')).toBe(
          undefined // TODO
        );
      });
    });

    describe('when not checked', () => {
      it('has no icon', () => {
        const wrapper = shallow(
          <Checkbox {...props} value={false} />,
        );
        expect(wrapper.find(Icon).length).toBe(0);
      });
    });
  });

  describe('color', () => {
    describe('when disabled', () => {
      it('uses specified color from theme even if value is true', () => {
        const wrapper = shallow(
          <Checkbox {...props} value={true} disabled />,
        );
        expect(wrapper.find(Icon).prop('color')).toBe(
          defaultTheme.colors.errorText, // TODO
        );
      });
    });

    describe('when checked', () => {
      it('uses specified color from theme', () => {
        const wrapper = shallow(
          <Checkbox {...props} value={true} />,
        );
        expect(wrapper.find(Icon).prop('color')).toBe(
          defaultTheme.colors.errorText, // TODO
        );
      });
    });
  });
});
