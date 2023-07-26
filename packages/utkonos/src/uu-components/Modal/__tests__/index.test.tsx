import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '..';
import { Button } from '../../Button';

describe('Modal component', () => {
  it('renders without crashing', () => {
    render(
      <Modal isOpen onRequestClose={() => {}}>
        {null}
      </Modal>,
    );
  });

  it('should open/close modal', async () => {
    const text = 'success';
    const { rerender, queryByText } = render(
      <Modal isOpen onRequestClose={() => {}}>
        {text}
      </Modal>,
    );
    expect(queryByText(text)).toBeInTheDocument();

    rerender(
      <Modal isOpen={false} onRequestClose={() => {}}>
        {text}
      </Modal>,
    );
    await waitFor(() => {
      expect(queryByText(text)).not.toBeInTheDocument();
    });
  });

  it('should call onRequestClose when user click on close icon', () => {
    const onRequestClose = jest.fn();

    const { getByRole } = render(
      <Modal isOpen onRequestClose={onRequestClose}>
        {null}
      </Modal>,
    );

    const closeButton = getByRole('button', {
      name: 'close-icon-button',
    });
    fireEvent.click(closeButton);

    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('should call onRequestClose when user click outside modal', () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onRequestClose={onRequestClose}>
        {null}
      </Modal>,
    );

    const modal = getByTestId('modal-2-component');
    if (!modal.parentElement) throw Error();
    fireEvent.click(modal.parentElement);

    expect(onRequestClose).toBeCalledTimes(1);
  });

  it("shouldn't call onRequestClose when user click inside modal", () => {
    const onRequestClose = jest.fn();

    const { getByRole } = render(
      <Modal isOpen onRequestClose={onRequestClose}>
        <Button aria-label="some-action-button">Some action</Button>
      </Modal>,
    );

    const actionButton = getByRole('button', {
      name: 'some-action-button',
    });
    fireEvent.click(actionButton);

    expect(onRequestClose).toBeCalledTimes(0);
  });

  it('renders without close icon', () => {
    const { queryByRole } = render(
      <Modal isOpen closeButtonComponent={null} onRequestClose={() => {}}>
        {null}
      </Modal>,
    );

    const closeButton = queryByRole('button', {
      name: 'close-icon-button',
    });

    expect(closeButton).not.toBeInTheDocument();
  });

  it('onClose events works correctly', () => {
    const onClose = jest.fn();
    const { queryByRole } = render(
      <Modal isOpen onClose={onClose}>
        {null}
      </Modal>,
    );

    const closeButton = queryByRole('button', {
      name: 'close-icon-button',
    });
    if (!closeButton) throw Error();
    fireEvent.click(closeButton);

    expect(onClose).toBeCalledTimes(1);
  });

  it('onClose hides onRequestClose when both provided', () => {
    const onClose = jest.fn();
    const onRequestClose = jest.fn();
    const { queryByRole } = render(
      // @ts-expect-error Согласно типу оба пропса нельзя передавать, но надо проверить,
      // что при случайной передаче двух пропсов отработает лишь onClose
      <Modal isOpen onClose={onClose} onRequestClose={onRequestClose}>
        {null}
      </Modal>,
    );

    const closeButton = queryByRole('button', {
      name: 'close-icon-button',
    });
    if (!closeButton) throw Error();
    fireEvent.click(closeButton);

    expect(onClose).toBeCalledTimes(1);
    expect(onRequestClose).not.toBeCalled();
  });

  it('onRequestClose events works correctly', () => {
    const onRequestClose = jest.fn();
    const { queryByRole } = render(
      <Modal isOpen onRequestClose={onRequestClose}>
        {null}
      </Modal>,
    );

    const closeButton = queryByRole('button', {
      name: 'close-icon-button',
    });
    if (!closeButton) throw Error();
    fireEvent.click(closeButton);

    expect(onRequestClose).toBeCalledTimes(1);
  });
});
