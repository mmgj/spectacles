import React from 'react';
import { Card, useTheme } from '@sanity/ui';
import JsonView from 'react-json-view';

/**
 * Options and themes ⬇
 * https://www.npmjs.com/package/react-json-view
 */

const ResultView = ({ data }) => {
  const theme = useTheme();
  const darkMode = theme?.sanity?.color?.dark;
  return (
    <Card padding={[2, 2, 3]} marginTop={2}>
      <JsonView
        name={null}
        src={data}
        displayDataTypes={false}
        collapsed={3}
        groupArraysAfterLength={50}
        theme={darkMode ? 'monokai' : undefined}
        style={{ backgroundColor: 'transparent' }}
      />
    </Card>
  );
};

export default ResultView;
