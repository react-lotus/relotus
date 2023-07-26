import React, { createRef } from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Label } from '..';
import { Button } from '../..';

describe('Label component', () => {
  it('Label component renders correctly', () => {
    render(<Label htmlFor="123">label</Label>);

    expect(screen.getByText('label')).not.toBeNull();
  });

  it('Ref is provided correctly and changing style', async () => {
    const ref = createRef<HTMLLabelElement>();
    const wrapperRef = createRef<HTMLDivElement>();
    const labelText = 'Лейбл меняет цвет при клике на кнопку';
    const Wrapper = () => {
      const handleClick = () => {
        ref.current?.setAttribute('style', 'color: red');
      };

      return (
        <div ref={wrapperRef}>
          <Label htmlFor="123" ref={ref}>
            {labelText}
          </Label>
          <Button onClick={handleClick} data-testid="button">
            Нажми меня
          </Button>
        </div>
      );
    };

    render(<Wrapper />);
    const FocusButton = screen.getByTestId('button');
    const LabelComponent = screen.getByText(labelText);
    expect(FocusButton).not.toBeNull();
    await waitFor(() => fireEvent.click(FocusButton));
    expect(LabelComponent.style.color).toEqual('red');
    expect(wrapperRef.current).toContainElement(ref.current);
    expect(ref.current).not.toContainElement(wrapperRef.current);
  });
});
