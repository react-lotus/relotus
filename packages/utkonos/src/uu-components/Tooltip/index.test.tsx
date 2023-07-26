import React from 'react';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Tooltip } from '.';

describe('Popover component', () => {
  it('content should be hidden', async () => {
    const { getByText, queryByText, findByText } = render(
      <Tooltip title="Tooltip content">
        <div>Tooltip target</div>
      </Tooltip>,
    );

    expect(queryByText('Tooltip content')).not.toBeInTheDocument();
    const target = getByText('Tooltip target');

    fireEvent.mouseEnter(target);
    const content = await waitFor(() => findByText('Tooltip content'));
    expect(content).toBeInTheDocument();

    fireEvent.mouseLeave(target);
    await waitForElementToBeRemoved(content);
    expect(content).not.toBeInTheDocument();
  });
});
