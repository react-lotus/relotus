import type { Enable, Size, HandleClassName } from 're-resizable';

export const defaultEnabledSides: Enable = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

export const defaultContainerSize: Size = {
  width: '40%',
  height: '100%',
};

const defaultHandleClassesRow = {
  left: 'uu-resizableBarRow',
};

const defaultHandleClassesColumn = {
  top: 'uu-resizableBarColumn',
};

const defaultEnableRow: Enable = { ...defaultEnabledSides, left: true };
const defaultEnableColumn: Enable = { ...defaultEnabledSides, top: true };

export const getDefaultEnable = (direction?: 'column' | 'row') =>
  direction === 'row' ? defaultEnableRow : defaultEnableColumn;

export const getDefaultHandleClasses = (direction?: 'column' | 'row'): HandleClassName =>
  direction === 'row' ? defaultHandleClassesRow : defaultHandleClassesColumn;
