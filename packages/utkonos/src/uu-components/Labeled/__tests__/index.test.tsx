import React, { createRef } from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import { Labeled } from '..';
import { Button } from '../..';

describe('Labeled component', () => {
  it('Labeled component renders correctly', () => {
    render(
      <Labeled id="123" label="labelText" data-testid="labeled-wrapper">
        <span>label</span>
      </Labeled>,
    );

    expect(screen.getByTestId('labeled-wrapper')).not.toBeNull();
    expect(screen.getByText('label')).not.toBeNull();
  });

  it('Ref is provided correctly and changing style', async () => {
    const labelText = 'Лейбл меняет цвет при клике на кнопку';
    const ref = createRef<HTMLDivElement>();
    const wrapperRef = createRef<HTMLDivElement>();
    const Wrapper = () => {
      const handleClick = () => {
        ref.current?.setAttribute('style', 'color: red');
      };

      return (
        <div ref={wrapperRef}>
          <Labeled id="123" ref={ref} label={labelText} data-testid="labeled-wrapper">
            <Button onClick={handleClick} data-testid="button">
              Нажми меня
            </Button>
          </Labeled>
        </div>
      );
    };

    render(<Wrapper />);
    const FocusButton = screen.getByTestId('button');
    const LabelComponent = screen.getByTestId('labeled-wrapper');
    expect(FocusButton).not.toBeNull();
    await waitFor(() => fireEvent.click(FocusButton));
    expect(LabelComponent.style.color).toEqual('red');
    expect(wrapperRef.current).toContainElement(ref.current);
  });
});
