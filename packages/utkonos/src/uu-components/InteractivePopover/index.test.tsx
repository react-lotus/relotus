import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InteractivePopover } from '.';

describe('InteractivePopover component', () => {
  it('content should be hidden', () => {
    const { getByText, queryByText } = render(
      <InteractivePopover content="InteractivePopover content">
        <div>InteractivePopover target</div>
      </InteractivePopover>,
    );

    expect(getByText('InteractivePopover target')).toBeInTheDocument();
    expect(queryByText('InteractivePopover content')).not.toBeInTheDocument();
  });
  it('content should be shown', async () => {
    const { getByText, findByText } = render(
      <InteractivePopover content="InteractivePopover content">
        <div>InteractivePopover target</div>
      </InteractivePopover>,
    );

    const targetElement = getByText('InteractivePopover target');
    fireEvent.mouseEnter(targetElement);
    const content = await findByText('InteractivePopover content');
    expect(getByText('InteractivePopover target')).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    fireEvent.mouseLeave(targetElement);
    await act(async () => {
      await new Promise((r) => {
        setTimeout(r, 800);
      });
    });
    expect(content).not.toBeInTheDocument();
  });
});
