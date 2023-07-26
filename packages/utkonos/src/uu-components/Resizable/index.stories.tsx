import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../Button';
import { Resizable } from '.';
import './index.stories.scss';

export default {
  title: 'Elements/Resizable',
  component: Resizable,
};

export const RowMode = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: '10px',
          width: '100%',
          minWidth: '1px',
          overflow: 'hidden',
        }}
      >
        <Button disabled={open} onClick={() => setOpen(true)} view="primary">
          Open Resizer
        </Button>
      </div>

      {open && (
        <Resizable direction="row" style={{ backgroundColor: '#f0f0f0' }}>
          <Button style={{ margin: '10px' }} onClick={() => setOpen(false)} view="danger">
            Close Resizer
          </Button>
        </Resizable>
      )}
    </div>
  );
};

const containerSize = window.innerHeight - 82;

export const ColumnMode = () => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(containerSize);

  return (
    <div
      style={{
        height: containerSize,
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: containerSize,
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
          minHeight: '30px',
        }}
      >
        <div style={{ height, padding: '10px', width: '100%' }}>
          <Button
            style={{ marginBottom: '10px' }}
            disabled={open}
            onClick={() => {
              setOpen(true);
              setHeight(containerSize / 2 + 60);
            }}
            view="primary"
          >
            Open Resizer
          </Button>
        </div>
      </div>

      {open && (
        <Resizable
          style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            zIndex: 3,
          }}
          direction="column"
          size={{ height: containerSize - height, width: '100%' }}
          onResizeStop={(e, direction, ref, d) => {
            setHeight(height - d.height);
          }}
          defaultSize={{ width: '100%', height: containerSize / 2 }}
          minHeight="1"
          maxHeight={containerSize}
        >
          <Button
            onClick={() => {
              setOpen(false);
              setHeight(containerSize);
            }}
            view="danger"
          >
            Close Resizer
          </Button>
        </Resizable>
      )}
    </div>
  );
};

export const Animation = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: '10px',
          width: '100%',
          minWidth: '1px',
          overflow: 'hidden',
        }}
      >
        <Button disabled={open} onClick={() => setOpen(true)} view="primary">
          Open Resizer
        </Button>
      </div>
      <CSSTransition in={open} timeout={1500} classNames="animation-resizable" unmountOnExit>
        <Resizable direction="row" style={{ backgroundColor: '#f0f0f0' }}>
          <Button style={{ margin: '10px' }} onClick={() => setOpen(false)} view="danger">
            Close Resizer
          </Button>
        </Resizable>
      </CSSTransition>
    </div>
  );
};
