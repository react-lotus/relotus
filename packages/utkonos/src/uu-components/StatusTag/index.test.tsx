import { render } from '@testing-library/react';
import React from 'react';

import type { StatusTagProps } from './index';
import { StatusTag } from './index';

const StatusTagWrapper = (props: StatusTagProps) => {
  const { children, ...rest } = props;
  return <StatusTag {...rest}>{children}</StatusTag>;
};

describe('StatusTag component', () => {
  it('should render without errors', () => {
    render(<StatusTagWrapper />);
  });

  it('should render with correct color', () => {
    const title = 'текст';
    const { getByText } = render(<StatusTagWrapper color="green">{title}</StatusTagWrapper>);

    expect(getByText(title)).toHaveClass('uu-statusTag_color_green');
  });
});
