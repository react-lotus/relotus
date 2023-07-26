import React from 'react';
import { Card } from '..';

export default {
  title: 'Elements/Card',
  component: Card,
};

export const Preview = () => <Card style={{ width: 100, height: 100 }} />;

export const CardWithChildren = () => (
  <Card style={{ width: 100, height: 100 }}>Card with text</Card>
);
