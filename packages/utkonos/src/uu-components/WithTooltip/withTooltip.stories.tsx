import { withTooltip } from '.';
import { Button } from '../Button';
import { CopyButton } from '../CopyButton';

export default {
  title: 'Utils/withTooltip',
  component: withTooltip,
};

const Title = () => <p>Tooltip</p>;
export const Preview = () => {
  const ButtonWithTooltip = withTooltip(Button);
  return <ButtonWithTooltip title="Tooltip">Кнопка</ButtonWithTooltip>;
};

export const ButtonWithReactNodeTooltip = () => {
  const ButtonWithTooltip = withTooltip(Button);
  return <ButtonWithTooltip title={<Title />}>Кнопка</ButtonWithTooltip>;
};

export const ButtonWithTooltipProps = () => {
  const ButtonWithTooltip = withTooltip(Button, { placement: 'bottom-end', offset: 50 });
  return <ButtonWithTooltip title="Tooltip with 50px offset">Кнопка</ButtonWithTooltip>;
};

export const CopyButtonWithTooltipProps = () => {
  const ButtonWithTooltip = withTooltip(CopyButton);
  return <ButtonWithTooltip title="Copy button with tooltip" />;
};
