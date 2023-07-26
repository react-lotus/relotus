import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Popover } from '.';

describe('Popover component', () => {
  it('content should be hidden', () => {
    const { getByText, queryByText } = render(
      <Popover content="Popover content">
        <div>Popover target</div>
      </Popover>,
    );

    expect(getByText('Popover target')).toBeInTheDocument();
    expect(queryByText('Popover content')).not.toBeInTheDocument();
  });
  it('content should be shown', async () => {
    const { getByText, findByText } = render(
      <Popover content="Popover content" open>
        <div>Popover target</div>
      </Popover>,
    );

    const content = await waitFor(() => {
      return findByText('Popover content');
    });
    expect(getByText('Popover target')).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
