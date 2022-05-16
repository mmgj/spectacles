import React, { useState } from 'react';
import { Flex, Card, TabList, Tab, TabPanel, Heading } from '@sanity/ui';
import { BillIcon, ControlsIcon } from '@sanity/icons';
import SettingsPane from './SettingsPane';

const TabPanes = () => {
  const [id, setId] = useState('settings');
  return (
    <Card padding={4}>
      <TabList space={2}>
        <Tab
          aria-controls='settings-panel'
          icon={ControlsIcon}
          id='settings-tab'
          label='Settings'
          onClick={() => setId('settings')}
          selected={id === 'settings'}
          space={2}
        />
        <Tab
          aria-controls='about-panel'
          icon={BillIcon}
          id='about-tab'
          label='About'
          onClick={() => setId('about')}
          selected={id === 'about'}
          space={2}
        />
      </TabList>

      <TabPanel
        aria-labelledby='settings-tab'
        hidden={id !== 'settings'}
        id='settings-panel'
      >
        <SettingsPane />
      </TabPanel>

      <TabPanel
        aria-labelledby='about-tab'
        hidden={id !== 'about'}
        id='about-panel'
      >
        <Card border marginTop={2} padding={4}>
          <Card>
            <Flex justify='center' align='center' style={{ height: 250 }}>
              <Heading>About</Heading>
            </Flex>
          </Card>
        </Card>
      </TabPanel>
    </Card>
  );
};

export default TabPanes;
