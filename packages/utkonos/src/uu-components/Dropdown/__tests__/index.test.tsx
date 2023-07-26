import { fireEvent, render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { FC, MouseEvent } from 'react';
import { Dropdown as DropdownOriginal, DropdownProps } from '..';
import { Text } from '../../Text';
import { DropdownItem } from '../DropdownItem';
import { ReactComponent as ExcelSvg } from './assets/excel.svg';

const Link1: FC = () => <a href="/">Текст 1</a>;
const Button1: FC = () => (
  <Text as="button" type="button">
    <ExcelSvg />
    <span>Текст 2</span>
  </Text>
);
const Button2: FC = () => (
  <Text as="button" type="button">
    Текст 3
  </Text>
);

const Dropdown = (props: Partial<DropdownProps>) => {
  const { buttonContent, children } = props;
  return (
    <DropdownOriginal buttonContent={buttonContent} {...props}>
      <Link1 />
      <Button1 />
      <Button2 />
      {children}
    </DropdownOriginal>
  );
};

describe('Dropdown component', () => {
  it('should render without errors', async () => {
    const { getByText } = render(<Dropdown buttonContent="Кнопка" />);
    const button = getByText('Кнопка');
    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
  });

  it('should show options', async () => {
    const { getByText } = render(<Dropdown buttonContent="Кнопка" />);
    const button = getByText('Кнопка');
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(getByText('Текст 1')).toBeInTheDocument();
      expect(getByText('Текст 2')).toBeInTheDocument();
      expect(getByText('Текст 3')).toBeInTheDocument();
    });
  });

  it('should hide arrow', async () => {
    const { getByRole, rerender } = render(<Dropdown buttonContent="Кнопка" />);
    const findArrow = () => within(getByRole('button', { name: /Кнопка/i })).queryByRole('img');

    expect(findArrow()).not.toBeNull();

    rerender(<Dropdown buttonContent="Кнопка" withoutArrow />);
    await waitFor(() => {
      expect(findArrow()).toBeNull();
    });
  });

  it('should place icon', async () => {
    const { getByRole, getByText, getByTitle } = render(
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <ExcelSvg title="excel" />
          </>
        }
      />,
    );
    const buttonWrapper = getByRole('button', { name: /Кнопка/i });
    const text = getByText('Кнопка');
    const icon = getByTitle('excel');
    const firstElement = buttonWrapper.children[0];
    const secondElement = buttonWrapper.children[1];
    await waitFor(() => {
      expect(firstElement).toEqual(text);
      expect(secondElement).toEqual(icon);
    });
  });

  it('should hide options', async () => {
    const { queryByRole, getByText } = render(
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <ExcelSvg />
          </>
        }
      />,
    );
    const button = getByText('Кнопка');
    fireEvent.mouseDown(button);
    fireEvent.click(global.document);

    const optionsList = queryByRole('list');
    await waitFor(() => {
      expect(optionsList).toBeNull();
    });
  });

  it('should hide options on miss click', async () => {
    const { queryByText, getByText } = render(
      <>
        <Dropdown
          buttonContent={
            <>
              <span>Кнопка</span>
              <ExcelSvg />
            </>
          }
        />
        <div>Miss Click</div>
      </>,
    );
    const button = getByText('Кнопка');
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(getByText('Текст 1')).toBeInTheDocument();
    });

    const missClickBox = getByText('Miss Click');
    fireEvent.mouseDown(missClickBox);

    await waitFor(() => {
      expect(queryByText('Текст 1')).not.toBeInTheDocument();
    });
  });

  it('should hide options on miss click with appendToBody', async () => {
    const { queryByText, getByText } = render(
      <>
        <Dropdown
          appendToBody
          buttonContent={
            <>
              <span>Кнопка</span>
              <ExcelSvg />
            </>
          }
        />
        <div>Miss Click</div>
      </>,
    );
    const button = getByText('Кнопка');
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(getByText('Текст 1')).toBeInTheDocument();
    });

    const missClickBox = getByText('Miss Click');
    fireEvent.mouseDown(missClickBox);

    await waitFor(() => {
      expect(queryByText('Текст 1')).not.toBeInTheDocument();
    });
  });

  it('should work DropdownItem action on click with appendToBody', async () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <DropdownOriginal buttonContent="Кнопка" appendToBody>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem onClick={onClick}>Item 2</DropdownItem>
      </DropdownOriginal>,
    );

    const button = getByText('Кнопка');
    fireEvent.mouseDown(button);

    await waitFor(() => {
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
    });

    const option2 = getByText('Item 2');
    userEvent.pointer([{ target: option2 }, { keys: '[MouseLeft]', target: option2 }]);

    await waitFor(() => {
      expect(onClick).toBeCalled();
      expect(option2).not.toBeInTheDocument();
    });
  });

  it('should be open only one dropdown on click with appendToBody and without it', async () => {
    const { getByText } = render(
      <>
        <Dropdown buttonContent="Кнопка 1" appendToBody>
          <DropdownItem>Item 1</DropdownItem>
        </Dropdown>
        <Dropdown buttonContent="Кнопка 2">
          <DropdownItem>Item 2</DropdownItem>
        </Dropdown>
      </>,
    );

    const button1 = getByText('Кнопка 1');
    fireEvent.mouseDown(button1);

    await waitFor(() => {
      expect(getByText('Item 1')).toBeInTheDocument();
    });

    const button2 = getByText('Кнопка 2');
    fireEvent.mouseDown(button2);

    await waitFor(() => {
      expect(getByText('Item 2')).toBeInTheDocument();
      expect(() => getByText('Item 1')).toThrowError();
    });
  });
});
