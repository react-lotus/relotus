import React, { useState } from 'react';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

import { Link } from '../..';
import { Breadcrumbs } from '.';

export default {
  title: 'Elements/Breadcrumbs',
  component: Breadcrumbs,
};

export const Overview = () => {
  const [categories] = useState([
    'Продукты',
    'Молоко, сыр, яйцо',
    'Молоко, сливки',
    'Молоко',
    'Молоко пастеризованное',
  ]);
  return (
    <>
      <h2>Хлебные крошки</h2>
      <Breadcrumbs>
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </Breadcrumbs>
    </>
  );
};

export const WithReactRouterLink = () => (
  <MemoryRouter>
    <Breadcrumbs>
      <Link as={RouterLink} to="#">
        Продукты
      </Link>
      <Link as={RouterLink} to="#">
        Молоко
      </Link>
      <Link as={RouterLink} to="#">
        Молоко пастеризованное
      </Link>
    </Breadcrumbs>
  </MemoryRouter>
);

export const InHeaderTitle = () => (
  <MemoryRouter>
    <Breadcrumbs isNoStroke>
      <Link as={RouterLink} to="#">
        Продукты
      </Link>
      <Link as={RouterLink} to="#">
        Молоко
      </Link>
    </Breadcrumbs>
  </MemoryRouter>
);

export const WithLongList = ({ ...args }) => {
  const [categories] = useState<string[]>(
    Array.from(Array(10)).reduce(
      (acc, _, idx) => [
        ...acc,
        ...[
          'Продукты',
          'Молоко, сыр, яйцо',
          'Молоко, сливки',
          'Молоко',
          'Молоко пастеризованное',
        ].map((cat) => `${cat} ${idx}`),
      ],
      [],
    ),
  );
  return (
    <Breadcrumbs {...args}>
      {categories.map((category) => (
        <span key={category}>{category}</span>
      ))}
    </Breadcrumbs>
  );
};
