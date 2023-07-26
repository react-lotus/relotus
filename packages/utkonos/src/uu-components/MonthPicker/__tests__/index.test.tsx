import { render, waitFor, screen } from '@testing-library/react';
import { useState } from 'react';
import moment from 'moment';

import { MonthPicker, MonthPickerProps } from '..';

const MonthPickerWrapper = (props: Partial<MonthPickerProps>) => {
  const [value, setValue] = useState(() => ({ year: moment().year(), month: moment().month() }));
  return <MonthPicker value={value} onChange={setValue} {...props} />;
};

describe('MonthPicker component', () => {
  it('should render without errors', async () => {
    render(<MonthPickerWrapper label="MonthPicker" />);
    const mp = screen.getByText('MonthPicker');
    await waitFor(() => {
      expect(mp).toBeInTheDocument();
    });
  });
});
