import { render, waitFor, screen } from '@testing-library/react';
import { createRef } from 'react';
import { SingleSelect } from '..';

describe('SingleSelect component', () => {
  it('should render without errors', async () => {
    render(<SingleSelect options={[]} placeholder="SingleSelect" />);
    const ss = screen.getByText('SingleSelect');
    await waitFor(() => {
      expect(ss).toBeInTheDocument();
    });
  });

  it('menu should be disabled', async () => {
    render(<SingleSelect options={[]} disabled />);
    const select = await screen.findByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('should properly pass ref to the SingleSelect element', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByLabelText } = render(
      <SingleSelect options={[]} ref={ref} label="label for single select" />,
    );
    ref.current?.focus();
    expect(getByLabelText('label for single select', { selector: 'div' })).toHaveFocus();
  });
});
