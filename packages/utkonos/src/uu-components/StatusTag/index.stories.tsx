import React from 'react';
import { StatusTag } from '.';

export default {
  title: 'Typography/StatusTag',
  component: StatusTag,
};

export const Preview = () => {
  return <StatusTag color="lightGreen">Отгрузка</StatusTag>;
};

export const AllColors = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
      <StatusTag color="green">Выполнено</StatusTag>
      <StatusTag color="navy">Отбор товаров</StatusTag>
      <StatusTag color="yellow">Перемещение к лифту</StatusTag>
      <StatusTag color="blue">Подьем на лифте</StatusTag>
      <StatusTag color="purple">Ошибка</StatusTag>
      <StatusTag color="red">Отменена</StatusTag>
      <StatusTag color="deepPurple">Разгрузка лифта</StatusTag>
      <StatusTag color="orange">Перемещение носителя</StatusTag>
      <StatusTag color="lightGreen">Размещение товара</StatusTag>
    </div>
  );
};

export const CustomStyles = () => {
  return (
    <StatusTag style={{ backgroundColor: 'greenyellow', color: 'indianred' }}>
      Поиск резервов
    </StatusTag>
  );
};
