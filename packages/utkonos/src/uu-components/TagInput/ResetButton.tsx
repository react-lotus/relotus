import { Button } from '../Button';
import { ReactComponent as Icon } from './assets/reset-icon.svg';

type Props = {
  disabled?: boolean;
  onReset: () => void;
  text: string;
};

export const ResetButton = ({ disabled = false, onReset, text }: Props) => {
  return (
    <Button disabled={disabled} view="dangerLink" onClick={onReset}>
      <Icon />
      <span>{text}</span>
    </Button>
  );
};
