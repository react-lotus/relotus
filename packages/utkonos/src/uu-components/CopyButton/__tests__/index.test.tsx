import { render, screen, fireEvent } from '@testing-library/react';

import { CopyButton } from '..';

const valueToRaiseMockException = 'fake input causing exception in copy to clipboard';
jest.mock('copy-to-clipboard', () =>
  jest.fn().mockImplementation((input: string) => {
    if (input === valueToRaiseMockException) {
      throw new Error(input);
    }
    return true;
  }),
);

const onClick = jest.fn();

describe('Copy Button component', () => {
  it('render correctly', () => {
    expect(() => render(<CopyButton role="button" value="text" />)).not.toThrow();
  });

  it('should render square button by default', () => {
    render(<CopyButton role="button" value="text" />);
    const button = screen.queryByRole('button');
    expect(button).toHaveClass('uu-button_square');
    expect(button).toMatchSnapshot();
  });

  it('should render as tag <button /> by default', () => {
    render(<CopyButton role="button" value="text" />);
    const button = screen.queryByRole('button');
    expect(button?.tagName).toBe('BUTTON');
  });

  it('should render as light button by default', () => {
    render(<CopyButton role="button" value="text" />);
    const button = screen.queryByRole('button');
    expect(button).toHaveClass('uu-button_view_light');
  });

  it('should call copy to clipboard with text', () => {
    render(<CopyButton role="button" onClick={onClick} value="text" />);
    const copyButton = screen.queryByRole('button');
    if (copyButton) {
      fireEvent.click(copyButton);
    }
    expect(onClick).toHaveBeenCalled();
  });
});
