import './index.css';

export const preview = {
  backgrounds: {
    default: 'transparent',
    values: [
      {
        name: 'transparent',
        value: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-opacity='.05' %3E%3Crect x='10' width='10' height='10' /%3E%3Crect y='10' width='10' height='10' /%3E%3C/svg%3E")`,
      },
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'grey',
        value: '#dbe1e2',
      },
    ],
  },
  // TODO доработать вставку Figma в DocPage истории
  // docs: {
  //   page: DocPage,
  // },
};
