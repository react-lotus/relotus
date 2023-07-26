import React from 'react';
import { Button, StatusTag } from '../..';
import { PanelCard } from '..';

export default {
  title: 'Elements/PanelCard',
  component: PanelCard,
};

export const Preview = () => {
  return (
    <PanelCard>
      <PanelCard.Header>
        <PanelCard.Title>Header</PanelCard.Title>
      </PanelCard.Header>
      <PanelCard.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </PanelCard.Body>
      <PanelCard.Footer>
        <Button small>Сохранить</Button>
        <Button small view="secondary">
          Отмена
        </Button>
      </PanelCard.Footer>
    </PanelCard>
  );
};

export const FooterWithoutGap = () => {
  return (
    <PanelCard>
      <PanelCard.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </PanelCard.Body>
      <PanelCard.Footer isWithoutGap>
        <Button small>Сохранить</Button>
        <Button small view="secondary">
          Отмена
        </Button>
      </PanelCard.Footer>
    </PanelCard>
  );
};

export const CustomHeader = () => {
  return (
    <PanelCard>
      <PanelCard.Header style={{ gap: 10 }}>
        <StatusTag color="orange">status</StatusTag>
        <PanelCard.Title>Title</PanelCard.Title>
      </PanelCard.Header>
      <PanelCard.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </PanelCard.Body>
    </PanelCard>
  );
};
