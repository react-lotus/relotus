import { create } from '@storybook/theming';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore TODO надо будет разобраться с typescript. Сейчас вызывает проблемы с typecheck других пакетов
import logoImg from '../assets/logo.svg';

export const utkonosTheme = create({
  base: 'light',
  brandTitle: 'Утконос UI',
  brandImage: logoImg,
});
