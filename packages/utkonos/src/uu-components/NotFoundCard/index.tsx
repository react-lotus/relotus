import type { ReactNode } from 'react';
import { Card } from '../Card';
import { ReactComponent as NotFoundSvg } from './assets/notFound.svg';
import './index.scss';

export interface NotFoundCardProps {
  /** Текст заголовка проблемы
   * @default "Страницы не существует"
   */
  title?: string;
  /** Дополнительный контент */
  children?: ReactNode;
  /** HTML-тег или компонент для рендера карточки
   * @default Card
   */
  as?: typeof Card | 'div';
}

/**
 * Карточка информирования о ненайденной странице
 */
export function NotFoundCard(props: NotFoundCardProps): JSX.Element {
  const { title = 'Страницы не существует', children, as: RenderAs = Card } = props;
  return (
    <RenderAs className="uu-notFoundCard">
      <NotFoundSvg className="uu-notFoundCard__icon" />
      <h2 className="uu-notFoundCard__title">{title}</h2>
      {children}
    </RenderAs>
  );
}
