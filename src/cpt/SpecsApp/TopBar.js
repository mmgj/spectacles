import React, { useState } from 'react';
import { BiGlassesAlt } from 'react-icons/bi';
import { CogIcon, RobotIcon } from '@sanity/icons';
import { Text, Card, Flex, Button, Dialog } from '@sanity/ui';
import { useStateValue } from './lib/state';
import SettingsPane from './SettingsPane';

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [{ debugMode, dataset, projectId }] = useStateValue();

  function doDebug() {
    const pid = window.localStorage.getItem('projectId');
    console.log('pid: ', pid);
  }

  return (
    <Card borderBottom={1}>
      <Flex justify='space-between' align='center' padding={[2, 3, 4]}>
        <Flex justify='flex-start' align='center'>
          <BiGlassesAlt
            size={34}
            style={{ margin: '0 20px 0 0 ' }}
            title='Spectacular'
          />
          <Button
            mode='bleed'
            tone='default'
            padding={4}
            icon={
              <Text muted>
                <em>
                  {`${dataset}`}
                  <span style={{ color: '#ccc' }}>@</span>
                  {`${projectId}`}
                </em>
              </Text>
            }
            onClick={() => setOpen(true)}
          />
        </Flex>
        <Flex justify='flex-end' align='center'>
          {debugMode && (
            <Button
              fontSize={[2, 2, 3]}
              icon={<RobotIcon />}
              mode='bleed'
              padding={[3, 3, 4]}
              onClick={doDebug}
            />
          )}
          <Button
            fontSize={[2, 2, 3]}
            icon={<CogIcon />}
            mode='bleed'
            padding={[3, 3, 4]}
            onClick={() => setOpen(true)}
          />
        </Flex>
      </Flex>
      {open && (
        <Dialog
          header='Settings'
          footer={
            <Flex justify='center' align='center'>
              <Card padding={[2, 2, 3]}>
                <Text size={1}>
                  Made with <span style={{ color: 'red' }}>♥</span> &{' '}
                  <a href='https://sanity.io/ui'>Sanity UI</a>
                </Text>{' '}
              </Card>
            </Flex>
          }
          id='dialog-settings'
          onClose={() => setOpen(false)}
          zOffset={1000}
          width={1}
        >
          <SettingsPane />
          {/* <TabPanes /> */}
        </Dialog>
      )}
    </Card>
  );
};

export default TopBar;
