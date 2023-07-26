import React from 'react';
import { render } from '@testing-library/react';
import KeycloakJS from 'keycloak-js';

import { createProvider } from './Provider';

const keycloak = KeycloakJS({
  clientId: 'Test',
  realm: 'Test',
  url: 'https://example.org',
});

describe('createProvider', () => {
  const Keycloak = createProvider(keycloak);

  it('should crete valid React component', () => {
    const { queryByText } = render(
      <Keycloak>
        <span>Success</span>
      </Keycloak>,
    );
    const content = queryByText('Success');
    expect(content).toBeInTheDocument();
  });
});
