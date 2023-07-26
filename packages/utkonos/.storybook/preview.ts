import moment from 'moment';
import 'moment/locale/ru';
import { parameters as parametersOriginal } from '../../../.storybook/preview';
import '../src';
import './preview.scss';

moment.locale('ru-Ru');

export const parameters = {
  ...parametersOriginal,
  options: {
    storySort: {
      order: ['Controls', 'Elements', 'Typography', 'Page', 'Utils', 'Chart'],
    },
  },
};
