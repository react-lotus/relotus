import React, { useState } from 'react';
import { Spinner } from '.';
import { Button } from '../Button';

import styles from './stories.module.scss';

export default {
  title: 'Elements/Spinner',
  component: Spinner,
};

export const Preview = () => {
  return <Spinner />;
};

export const Absolute = () => {
  return <Spinner absolute />;
};

export const Size = () => {
  return (
    <div className={styles.size}>
      <Spinner size={40} />
      <Spinner />
      <Spinner size={80} />
      <Spinner size={100} />
      <Spinner size={120} />
    </div>
  );
};

export const Show = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        className={styles.showButton}
        onClick={() => setShow(!show)}
        view={show ? 'danger' : 'primary'}
      >
        {show ? 'Close' : 'Open'}
      </Button>
      <div className={styles.showBox}>
        <Spinner show={show} size={40} />
        <Spinner show={show} />
        <Spinner show={show} size={80} />
        <Spinner show={show} size={100} />
        <Spinner show={show} size={120} />
      </div>
    </>
  );
};

export const ShowAbsolute = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        className={styles.showAbsoluteButton}
        onClick={() => setShow(!show)}
        view={show ? 'danger' : 'primary'}
      >
        {show ? 'Close' : 'Open'}
      </Button>
      <Spinner absolute show={show} />
    </>
  );
};
