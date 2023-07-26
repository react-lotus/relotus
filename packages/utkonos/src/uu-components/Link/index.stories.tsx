import React, { useCallback } from 'react';
import { MemoryRouter, Link as RouterLink, Switch, Route } from 'react-router-dom';
import { Link } from '.';

export default {
  title: 'Typography/Link',
  component: Link,
};

export const Preview = () => <Link href="http://utkonos.ru">Ссылка</Link>;

export const WithReactRouter = () => (
  <MemoryRouter initialEntries={['/a']}>
    <Link as={RouterLink} to="/a" style={{ marginRight: 10 }}>
      Ссылка A
    </Link>
    <Link as={RouterLink} to="/b" style={{ marginRight: 10 }}>
      Ссылка B
    </Link>
    <Link as={RouterLink} to="/c">
      Ссылка C
    </Link>

    <div>
      <Switch>
        <Route path="/a">A</Route>
        <Route path="/b">B</Route>
        <Route path="/c">C</Route>
      </Switch>
    </div>
  </MemoryRouter>
);

export const CustomComponentWithHref = () => {
  const CustomAnchor = ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} role="img">
      {children} 👍
    </a>
  );
  return (
    <Link as={CustomAnchor} href="#">
      Ссылка
    </Link>
  );
};

export const LinkWithoutHref = () => {
  // eslint-disable-next-line no-alert
  const clickHandler = useCallback((e) => alert((e.target as HTMLElement).tagName), []);
  return <Link onClick={clickHandler}>Как будто ссылка</Link>;
};
