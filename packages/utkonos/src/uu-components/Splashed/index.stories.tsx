import React, { useState } from 'react';
import { Splashed } from '.';
import { Switch } from '../Switch';
import { Button } from '../Button';

import styles from './stories.module.scss';

export default {
  title: 'Elements/Splashed',
  component: Splashed,
};

export const Preview = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.preview}>
      <Switch checked={show} onChange={(event) => setShow(event.target.checked)} />
      <Splashed show={show}>
        <Button onClick={() => setShow(false)}>Скрыть</Button>
      </Splashed>
    </div>
  );
};
