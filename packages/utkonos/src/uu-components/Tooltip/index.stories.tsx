import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Tooltip, TooltipProps } from '.';
import { Button, Modal } from '..';

import style from './story.module.scss';

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
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
    noArrow: {
      table: {
        category: 'Props',
      },
      control: {
        type: 'boolean',
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
      control: {
        type: 'radio',
        options: [undefined, true, false],
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
  },
} as Meta;

export const Playground: Story<TooltipProps & { text: string; isMultipleRow: boolean }> = ({
  text,
  isMultipleRow,
  ...args
}) => {
  return (
    <div className={style.playground}>
      <Tooltip
        {...args}
        title={
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
      </Tooltip>
    </div>
  );
};

Playground.args = {
  text: 'Текст',
  isMultipleRow: false,
};

const tooltipTitle = (value: string) => (
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
        <Tooltip title={tooltipTitle('top-end')} placement="top-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.topItem}>
        <Tooltip title={tooltipTitle('top')} placement="top" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.topStartItem}>
        <Tooltip title={tooltipTitle('top-start')} placement="top-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
    </div>
    <div className={style.middleRow}>
      <div className={style.middleItem}>
        <Tooltip title={tooltipTitle('left-start')} placement="left-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.item} />
      <div className={style.middleItem}>
        <Tooltip title={tooltipTitle('right-start')} placement="right-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
    </div>
    <div className={style.middleRow}>
      <div className={style.middleItem}>
        <Tooltip title={tooltipTitle('left')} placement="left" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.item} />
      <div className={style.middleItem}>
        <Tooltip title={tooltipTitle('right')} placement="right" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
    </div>
    <div className={style.middleRow}>
      <div className={style.middleItem}>
        <Tooltip title={tooltipTitle('left-end')} placement="left-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.item} />
      <div className={style.middleItem}>
        <Tooltip title={tooltipTitle('right-end')} placement="right-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
    </div>
    <div className={style.bottomRow}>
      <div className={style.bottomEndItem}>
        <Tooltip title={tooltipTitle('bottom-end')} placement="bottom-end" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.bottomItem}>
        <Tooltip title={tooltipTitle('bottom')} placement="bottom" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
      <div className={style.bottomStartItem}>
        <Tooltip title={tooltipTitle('bottom-start')} placement="bottom-start" open>
          <div>
            <span className="sb-infoIcon" />
          </div>
        </Tooltip>
      </div>
    </div>
  </>
);

export const WithEmptyTitle = () => (
  <div>
    Do not display with empty title
    <br />
    <Tooltip placement="left">
      <span className="sb-infoIcon" />
    </Tooltip>
  </div>
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
            <Tooltip title="Внутри модального окна">
              <span className="sb-infoIcon" />
            </Tooltip>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
