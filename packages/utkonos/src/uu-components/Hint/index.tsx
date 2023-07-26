import { ComponentType, SVGProps } from 'react';
import { Tooltip, TooltipProps } from '../Tooltip';
import { ReactComponent as QuestionIcon } from './assets/question.svg';

import './index.scss';

export type IconSvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface HintProps extends Omit<TooltipProps, 'children'> {
  icon?: IconSvgComponent;
}

/**
 * Компонент для показа дополнительной информации
 */
export const Hint = ({ title, icon: CustomIcon = QuestionIcon, ...rest }: HintProps) => {
  return (
    <Tooltip className="uu-hintTooltip" title={title} {...rest}>
      <CustomIcon className="uu-hintIcon" />
    </Tooltip>
  );
};
