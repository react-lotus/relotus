import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Progress } from '..';
import { ProgressItemProps } from '../ProgressItem';

const CHANGED_STEP = 4;

const getItems = (props: Partial<ProgressItemProps<number>> = {}) =>
  Array(8)
    .fill(undefined)
    .map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Progress.Item value={idx} key={idx} {...(idx === CHANGED_STEP ? props : {})}>
        Step {idx}
      </Progress.Item>
    ));

const onChange = jest.fn();

describe('Progress component', () => {
  beforeEach(() => {
    onChange.mockClear();
  });
  describe('container', () => {
    it('should have uu-progress_large class if at least one large item is passed', () => {
      const { container } = render(
        <Progress onChange={onChange} value={1}>
          {getItems({ size: 'large' })}
        </Progress>,
      );
      expect(container.firstChild).toHaveClass('uu-progress_large');
    });
    it('should not have uu-progress_large class if no large items passed', () => {
      const { container } = render(
        <Progress onChange={onChange} value={1}>
          {getItems()}
        </Progress>,
      );
      expect(container.firstChild).not.toHaveClass('uu-progress_large');
    });

    it('should append node if withNode props passed', () => {
      const { container } = render(
        <Progress onChange={onChange} value={1} withNode>
          {getItems()}
        </Progress>,
      );
      expect(container.firstChild?.lastChild).toHaveClass('uu-progress__node');
    });
  });

  describe('items', () => {
    it('should mark previous steps as complete by default', () => {
      const currentActive = 3;
      const { getAllByText } = render(
        <Progress onChange={onChange} value={currentActive}>
          {getItems()}
        </Progress>,
      );
      const stepsLabels = getAllByText('Step', { exact: false });
      const complete = stepsLabels.slice(0, currentActive).map((el) => el.previousSibling);
      const notComplete = stepsLabels.slice(currentActive).map((el) => el.previousSibling);
      complete.forEach((el) => {
        expect(el).toHaveClass('uu-progress__dot_complete');
      });
      notComplete.forEach((el) => {
        expect(el).not.toHaveClass('uu-progress__dot_complete');
      });
    });

    it('should call onChange when click by step', () => {
      const { getByText } = render(
        <Progress onChange={onChange} value={1}>
          {getItems()}
        </Progress>,
      );
      const step = getByText('Step 3');
      fireEvent.click(step);
      expect(onChange).toBeCalledWith(3);
    });

    it('should not call onChange when click by disabled step', () => {
      const { getByText } = render(
        <Progress onChange={onChange} value={1}>
          {getItems({ disabled: true })}
        </Progress>,
      );
      const step = getByText(`Step ${CHANGED_STEP}`);
      fireEvent.click(step);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should mark step as not complete even it before active and isComplete={false}', () => {
      const { getByText } = render(
        <Progress onChange={onChange} value={8}>
          {getItems({ isComplete: false })}
        </Progress>,
      );
      const step = getByText(`Step ${CHANGED_STEP}`).previousSibling;
      expect(step).not.toHaveClass('uu-progress__dot_complete');
    });

    it('should mark step as complete even it after active and isComplete={true}', () => {
      const { getByText } = render(
        <Progress onChange={onChange} value={1}>
          {getItems({ isComplete: true })}
        </Progress>,
      );
      const step = getByText(`Step ${CHANGED_STEP}`).previousSibling;
      expect(step).toHaveClass('uu-progress__dot_complete');
    });

    it(`should has size class if size is large`, () => {
      const { getByText } = render(
        <Progress onChange={onChange} value={1}>
          {getItems({ size: 'large' })}
        </Progress>,
      );
      const step = getByText(`Step ${CHANGED_STEP}`).previousSibling;
      expect(step).toHaveClass(`uu-progress__dot_large`);
    });

    it.each<Array<'wait' | 'reject'>>([['wait'], ['reject']])(
      `should has view class if view is %s`,
      (view) => {
        const { getByText } = render(
          <Progress onChange={onChange} value={1}>
            {getItems({ view })}
          </Progress>,
        );
        const step = getByText(`Step ${CHANGED_STEP}`).previousSibling;
        expect(step).toHaveClass(`uu-progress__dot_${view}`);
      },
    );

    describe('should throw error', () => {
      let spy: jest.SpyInstance;

      beforeAll(() => {
        spy = jest.spyOn(global.console, 'error').mockImplementation(jest.fn);
      });

      afterAll(() => {
        spy.mockRestore();
      });
      test(`when has Progress.Items with same value`, () => {
        expect(() =>
          render(
            <Progress onChange={onChange} value={1}>
              {getItems({ value: 2 })}
            </Progress>,
          ),
        ).toThrowError(
          'Progress.Item value should be unique. Progress has multiple steps with value 2',
        );
      });

      test(`when active prop passed directly`, () => {
        expect(() =>
          render(
            <Progress onChange={onChange} value={1}>
              {getItems({ isActive: true })}
            </Progress>,
          ),
        ).toThrowError(
          "Progress.Item isActive props is private. Do not pass it directly, use Progress's value instead",
        );

        expect(() =>
          render(
            <Progress onChange={onChange} value={1}>
              {getItems({ isActive: false })}
            </Progress>,
          ),
        ).toThrowError(
          "Progress.Item isActive props is private. Do not pass it directly, use Progress's value instead",
        );
      });

      test('when children contains non Progress.Item', () => {
        expect(() =>
          render(
            <Progress onChange={onChange} value={1} withNode>
              {getItems().concat(<div key="some">SomeContent</div>)}
            </Progress>,
          ),
        ).toThrowError('Progress accept only Progress.Item as child');
      });
    });
  });
});
