import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import { Button } from '..';

describe('Button component', () => {
  it('render correctly', () => {
    expect(() => render(<Button>Follow</Button>)).not.toThrow();
  });

  it('should render empty button without errors', () => {
    const { getByRole } = render(
      <Button role="button">
        {null}
        {undefined}
      </Button>,
    );
    expect(getByRole('button')).toMatchSnapshot();
  });

  it('should render small button', () => {
    const { getByText } = render(<Button small>Small</Button>);
    const button = getByText('Small');

    expect(button).toHaveClass('uu-button_small');
    expect(button).toMatchSnapshot();
  });

  it('should not clickable when button is loading', () => {
    const onClick = jest.fn();
    const text = 'loading';
    const { getByText } = render(
      <Button loading onClick={onClick}>
        {text}
      </Button>,
    );
    const button = getByText(text);

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should button have a loading animation', () => {
    const text = 'loading';
    const { getByText } = render(<Button loading>{text}</Button>);
    const button = getByText(text);

    expect(button).toHaveClass('uu-button_loading');
    expect(button).toMatchSnapshot();
  });

  it('should not clickable when button is disabled', () => {
    const onClick = jest.fn();
    const text = 'disabled';
    const { getByText } = render(
      <Button disabled onClick={onClick}>
        {text}
      </Button>,
    );
    const button = getByText(text);

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should render as tag <span />', () => {
    const text = 'span';
    const { getByText } = render(<Button as="span">{text}</Button>);

    expect(getByText(text).tagName).toBe('SPAN');
  });

  it('should render as tag <a />', () => {
    const text = 'a link';
    const { getByText } = render(<Button as="a">{text}</Button>);

    expect(getByText(text).tagName).toBe('A');
  });

  it('should render as RouterLink', () => {
    const text = 'Router Link';
    const { getByText } = render(
      <BrowserRouter>
        <Button as={RouterLink} to="/">
          {text}
        </Button>
      </BrowserRouter>,
    );
    const linkedButton = getByText(text);

    expect(linkedButton.tagName).toBe('A');
    expect(linkedButton).toMatchSnapshot();
  });
});
