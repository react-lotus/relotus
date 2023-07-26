import { useState } from 'react';
import { Switch } from '.';
import { Tooltip } from '../Tooltip';

export default {
  title: 'Controls/Switch',
  component: Switch,
};

export const Preview = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Switch checked={checked1} onChange={(event) => setChecked1(event.target.checked)} />
      </div>
      <div className="sb-row">
        <Switch checked={checked2} onChange={(event) => setChecked2(event.target.checked)} />
      </div>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="sb-col">
      <div className="sb-row">
        <Switch disabled />
      </div>
      <div className="sb-row">
        <Switch checked disabled />
      </div>
    </div>
  );
};

export const WithTooltip = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Tooltip placement="bottom" title="Переключатель">
      <Switch checked={checked} onChange={(event) => setChecked(event.target.checked)} />
    </Tooltip>
  );
};
