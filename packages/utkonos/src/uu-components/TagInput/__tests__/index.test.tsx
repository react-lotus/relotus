/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { TagInput } from '..';

const onChange = jest.fn();

const SIMPLE_VALUES = ['foo', 'bar', 'baz'];

describe('UIKIT | TagInput', () => {
  describe('Snapshots', () => {
    it('should default', () => {
      const tree = renderer
        .create(
          <TagInput id="tagInput" value={SIMPLE_VALUES} name="testName" onChange={onChange} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should labeled row', () => {
      const tree = renderer
        .create(
          <TagInput
            id="tagInput"
            value={SIMPLE_VALUES}
            name="testName"
            label="labeled"
            onChange={onChange}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should labeled column', () => {
      const tree = renderer
        .create(
          <TagInput
            id="tagInput"
            value={SIMPLE_VALUES}
            name="testName"
            label="labeled"
            direction="column"
            onChange={onChange}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should with error', () => {
      const tree = renderer
        .create(
          <TagInput
            id="tagInput"
            value={SIMPLE_VALUES}
            name="testName"
            error="Test error"
            onChange={onChange}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should disabled', () => {
      const tree = renderer
        .create(
          <TagInput
            id="tagInput"
            value={SIMPLE_VALUES}
            name="testName"
            disabled
            onChange={onChange}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Reset button', () => {
    it('should expose disabled reset with disabled TagInput', () => {
      render(
        <TagInput
          id="tagInput"
          value={SIMPLE_VALUES}
          name="testName"
          disabled
          onChange={onChange}
        />,
      );
      const reset = screen.queryByText('Сбросить значения');
      expect(reset).toBeInTheDocument();
      if (reset) {
        expect(reset.closest('.uu-button')).toBeDisabled();
      }
    });
    it('should expose disabled reset with empty values', () => {
      render(<TagInput id="tagInput" value={[]} name="testName" onChange={onChange} />);
      const reset = screen.queryByText('Сбросить значения');
      if (reset) {
        expect(reset.closest('.uu-button')).toBeDisabled();
      }
    });
    it('should expose enabled reset', () => {
      render(
        <TagInput
          id="tagInput2"
          value={SIMPLE_VALUES}
          name="testName2"
          onChange={onChange}
          resetText="Очистить"
        />,
      );
      expect(screen.queryByText('Сбросить значения')).not.toBeInTheDocument();
      const reset2 = screen.queryByText('Очистить');
      expect(reset2).toBeInTheDocument();
      if (reset2) {
        expect(reset2.closest('.uu-button')).toBeEnabled();
        fireEvent.click(reset2);
      }
      expect(onChange).toHaveBeenCalledWith([]);
    });
  });
});
