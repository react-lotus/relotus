import { Meta, Story } from '@storybook/react/types-6-0';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

import { PageLayout, NotFoundCard, Sidebar, Breadcrumbs, Link } from '../..';
import { PageLayoutProps } from '..';
import { pageLayoutArgTypes } from './argTypes';

export default {
  title: 'Page/PageLayout',
  component: PageLayout,
  argTypes: pageLayoutArgTypes,
  decorators: [(story) => <div className="sb-noPadding">{story()}</div>],
} as Meta;

const args = {
  title: 'App Name',
  pageTitle: 'Page Title',
  version: '0.1.0',
  menu: Sidebar,
};

export const Playground: Story<PageLayoutProps> = (props) => <PageLayout {...props} />;

Playground.args = args;

export const WithCard = () => (
  <PageLayout {...args}>
    <NotFoundCard />
  </PageLayout>
);

export const InPageHeader = () => {
  const PageBreadcrumbs = (
    <Breadcrumbs isNoStroke>
      <Link as={RouterLink} to="#">
        Продукты
      </Link>
      <Link as={RouterLink} to="#">
        Молоко
      </Link>
    </Breadcrumbs>
  );
  return (
    <MemoryRouter>
      <PageLayout {...args} subtitle={PageBreadcrumbs}>
        <NotFoundCard />
      </PageLayout>
    </MemoryRouter>
  );
};
