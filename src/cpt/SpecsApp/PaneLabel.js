import React from 'react';
import { Label, Card } from '@sanity/ui';

const PaneLabel = ({ label, ...props }) => {
  return (
    <Card padding={4} paddingBottom={1} {...props}>
      <Label muted>{label}</Label>
    </Card>
  );
};

export default PaneLabel;
