import type { HTMLAttributes } from 'react';
import cn from 'clsx';
import { Header } from './Header';
import { Title } from './Title';
import { Body } from './Body';
import { Footer } from './Footer';
import './index.scss';

export type PanelCardProps = HTMLAttributes<HTMLDivElement>;

function PanelCardBase({ className, ...props }: PanelCardProps) {
  return <div className={cn(className, 'uu-panelCard uu-scrollbar')} {...props} />;
}

/**
 * Панель-карточка
 */
export const PanelCard = Object.assign(PanelCardBase, {
  Header,
  Title,
  Body,
  Footer,
});

export type { HeaderProps as PanelCardHeaderProps } from './Header';
export type { TitleProps as PanelCardTitleProps } from './Title';
export type { BodyProps as PanelCardBodyProps } from './Body';
export type { FooterProps as PanelCardFooterProps } from './Footer';
