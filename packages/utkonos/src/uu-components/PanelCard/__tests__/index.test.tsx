import React from 'react';
import renderer from 'react-test-renderer';
import { PanelCard } from '..';

describe('PanelCard', () => {
  describe('snapshot', () => {
    it('should match PanelCard with Header, Body and Footer', () => {
      const tree = renderer
        .create(
          <PanelCard>
            <PanelCard.Header>
              <PanelCard.Title>Header</PanelCard.Title>
            </PanelCard.Header>
            <PanelCard.Body>Body</PanelCard.Body>
            <PanelCard.Footer>Footer</PanelCard.Footer>
          </PanelCard>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match PanelCard with custom header', () => {
      const tree = renderer
        .create(
          <PanelCard>
            <PanelCard.Header>
              <span>Header</span>
            </PanelCard.Header>
          </PanelCard>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
