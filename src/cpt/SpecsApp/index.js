import React from 'react';
import { studioTheme, ThemeProvider, usePrefersDark } from '@sanity/ui';
import { StateInspector } from 'reinspect';
import { StateProvider } from './lib/state';
import StatefulApp from './StatefulApp';

function SpecsApp() {
  const prefersDark = usePrefersDark();
  const scheme = prefersDark ? 'dark' : 'light';

  return (
    <StateInspector name='everything'>
      <StateProvider>
        <ThemeProvider theme={studioTheme} scheme={scheme}>
          <StatefulApp />
        </ThemeProvider>
      </StateProvider>
    </StateInspector>
  );
}

export default SpecsApp;
