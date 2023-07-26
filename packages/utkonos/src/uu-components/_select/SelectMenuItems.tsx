import React from 'react';
import type { ReactNode } from 'react';
import cn from 'clsx';
import { SelectOptionsWrapper } from './OptionsWrapper';
import type { Option, OptionValue, OptionAnyRecord, FormatGroupLabel } from '../_option';
import './SelectMenuItems.scss';

export interface SelectMenuItemsProps<T extends OptionValue = OptionValue, R = OptionAnyRecord> {
  options: Option<T, R>[];
  children: (option: Option<T, R>, index: number) => ReactNode;
  filterable: boolean;
  formatGroupLabel: FormatGroupLabel<T, R>;
}

export const SelectMenuItems = <T extends OptionValue = OptionValue, R = OptionAnyRecord>({
  options,
  formatGroupLabel,
  filterable,
  children,
}: SelectMenuItemsProps<T, R>) => {
  return (
    <SelectOptionsWrapper
      className={cn('uu-selectMenuItemsWrapper', {
        'uu-selectMenuItemsWrapper_filterable': filterable,
      })}
    >
      {!options.length && <li className="uu-selectMenuItemsEmpty">Нет совпадений</li>}
      {
        options.reduce<{ sections: ReactNode[]; itemIndex: number }>(
          (acc, item) => {
            if (item.options) {
              const title = formatGroupLabel({ option: item });
              acc.sections.push(
                <li className="uu-selectMenuItemsSection" key={String(item.value)}>
                  {!!title && <div className="uu-selectMenuItemsSectionTitle">{title}</div>}
                  <SelectOptionsWrapper className="uu-selectMenuItemsSectionList">
                    {item.options.map((option) => {
                      const result = children(option, acc.itemIndex);
                      acc.itemIndex += 1;
                      return result;
                    })}
                  </SelectOptionsWrapper>
                </li>,
              );
            } else {
              acc.sections.push(children(item, acc.itemIndex));
              acc.itemIndex += 1;
            }
            return acc;
          },
          { sections: [], itemIndex: 0 },
        ).sections
      }
    </SelectOptionsWrapper>
  );
};
