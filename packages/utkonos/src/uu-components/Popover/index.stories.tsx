import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Popover, PopoverProps } from '.';
import { Button, Modal } from '..';
import style from './story.module.scss';

export default {
  title: 'Elements/Popover',
  component: Popover,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Children',
      },
    },
    content: {
      control: {
        type: null,
      },
      table: {
        category: 'Children',
      },
    },
    isMultipleRow: {
      description: 'В несколько строк',
      table: {
        category: 'Children',
      },
    },
    arrowPadding: {
      table: {
        category: 'Props',
      },
    },
    children: {
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    className: {
      table: {
        category: 'Props',
      },
    },
    defaultSkidding: {
      table: {
        category: 'Props',
      },
    },
    hideDelay: {
      table: {
        category: 'Props',
      },
    },
    offset: {
      table: {
        category: 'Props',
      },
    },
    open: {
      table: {
        category: 'Props',
      },
    },
    placement: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Props',
      },
    },
    withArrow: {
      table: {
        category: 'Props',
      },
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Playground: Story<PopoverProps & { text: string; isMultipleRow: boolean }> = ({
  text,
  isMultipleRow,
  ...args
}) => {
  return (
    <div className={style.playground}>
      <Popover
        {...args}
        content={
          isMultipleRow ? (
            <div>
              В несколько
              <br />
              строк
            </div>
          ) : (
            <div>В одну строку</div>
          )
        }
      >
        <div>{text}</div>
      </Popover>
    </div>
  );
};

Playground.args = {
  text: 'Текст',
  isMultipleRow: false,
  open: true,
};

const getPopoverContent = (value: string) => (
  <div>
    placement
    <br />
    <b>{value}</b>
  </div>
);

export const Preview = () => (
  <>
    <div className={style.topRow}>
      <div className={style.topEndItem}>
        <Popover content={getPopoverContent('top-end')} placement="top-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.topItem}>
        <Popover content={getPopoverContent('top')} placement="top" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.topStartItem}>
        <Popover content={getPopoverContent('top-start')} placement="top-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
    </div>
    <div className={style.middleRow}>
      <div className={style.middleItem}>
        <Popover content={getPopoverContent('left-start')} placement="left-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.item} />
      <div className={style.middleItem}>
        <Popover content={getPopoverContent('right-start')} placement="right-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
    </div>
    <div className={style.middleRow}>
      <div className={style.middleItem}>
        <Popover content={getPopoverContent('left')} placement="left" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.item} />
      <div className={style.middleItem}>
        <Popover content={getPopoverContent('right')} placement="right" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
    </div>
    <div className={style.middleRow}>
      <div className={style.middleItem}>
        <Popover content={getPopoverContent('left-end')} placement="left-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.item} />
      <div className={style.middleItem}>
        <Popover content={getPopoverContent('right-end')} placement="right-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
    </div>
    <div className={style.bottomRow}>
      <div className={style.bottomEndItem}>
        <Popover content={getPopoverContent('bottom-end')} placement="bottom-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.bottomItem}>
        <Popover content={getPopoverContent('bottom')} placement="bottom" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
      <div className={style.bottomStartItem}>
        <Popover content={getPopoverContent('bottom-start')} placement="bottom-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Popover>
      </div>
    </div>
  </>
);

export const InModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Button onClick={() => setIsOpen(true)}>Открыть модальное окно</Button>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          width="max-content"
          closeButtonComponent={null}
        >
          <Modal.Body>
            <Popover content="Внутри модального окна" open>
              <span className="sb-infoIcon" />
            </Popover>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
