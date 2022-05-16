import React, { useEffect, useState } from 'react';
import sanityClient from '@sanity/client';
import { Card, Flex, Button, Box, Spinner, Stack, useTheme } from '@sanity/ui';
import { PlayIcon } from '@sanity/icons';
import isHotkey from 'is-hotkey';

import { highlight, languages } from 'prismjs/components/prism-core';

import { useStateValue } from './lib/state';
import TopBar from './TopBar';
import SplitPane from './Panes';
import PaneLabel from './PaneLabel';
import EditorPane from './EditorPane';
import ResultView from './ResultView';
import StyledStatefulMain from './StyledStatefulApp';

function StatefulApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [{ projectId, dataset, apiVersion, query, params }, dispatch] =
    useStateValue();

  async function loadData() {
    setLoading(true);
    try {
      const client = sanityClient({
        projectId,
        dataset,
        apiVersion,
      });
      // eval === evil! ⬇ probably better
      // const parameters = JSON.parse(params);
      // eslint-disable-next-line no-eval
      const parameters = eval(`( ${params} )`);
      const result = await client.fetch(query, parameters);

      setData(result);
      setLoading(false);
    } catch (err) {
      console.log('Ohhhh nooo!');
      setData({ err });
      setLoading(false);
    }
  }
  function onKeyDown(ev) {
    if (isHotkey('mod+return', ev)) {
      ev.preventDefault();
      loadData();
    }
  }

  const headerHeight = 105;
  useEffect(() => {
    // Some dependency is spamming the console
    // with errors on startup and I can't be arsed
    console.clear();
  }, []);

  const theme = useTheme();

  return (
    <StyledStatefulMain>
      <Flex direction='column'>
        <TopBar />
        <Box flex={1}>
          <SplitPane
            split='vertical'
            defaultSize={350}
            primary='first'
            style={{
              height: `calc(100vh - ${headerHeight}px)`,
            }}
          >
            <Stack>
              <SplitPane split='horizontal' defaultSize={350}>
                <EditorPane
                  value={query}
                  onKeyDown={onKeyDown}
                  onValueChange={(code) =>
                    dispatch({ type: 'setQuery', payload: code })
                  }
                  highlight={(code) => highlight(code, languages.js)}
                  label='Query'
                />

                <EditorPane
                  value={params}
                  onKeyDown={onKeyDown}
                  onValueChange={(code) =>
                    dispatch({ type: 'setParams', payload: code })
                  }
                  highlight={(code) => highlight(code, languages.js)}
                  label='Params'
                />
              </SplitPane>
              <Card
                flex={1}
                borderTop={1}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  padding: 20,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Button
                  fontSize={[2, 2, 3]}
                  icon={
                    loading ? (
                      <div style={{ marginTop: 7, width: 17 }}>
                        <Spinner />
                      </div>
                    ) : (
                      <div style={{ width: 17 }}>
                        <PlayIcon />
                      </div>
                    )
                  }
                  disabled={loading}
                  mode={theme.sanity.color.dark ? 'ghost' : 'default'}
                  tone={theme.sanity.color.dark ? 'default' : 'primary'}
                  padding={[2, 3, 4]}
                  text={'Fetch'}
                  onClick={loadData}
                />
              </Card>
            </Stack>

            <Box
              padding={0}
              style={{
                overflow: 'auto',
                maxHeight: `calc(100vh - ${headerHeight}px)`,
                background: theme.sanity.color.bg,
              }}
            >
              <PaneLabel label='Result' />
              {loading && (
                <Flex
                  justify='center'
                  align='center'
                  style={{ height: '90vh' }}
                >
                  <Spinner />
                </Flex>
              )}

              {data && <ResultView data={data} />}
            </Box>
          </SplitPane>
        </Box>
      </Flex>
    </StyledStatefulMain>
  );
}

export default StatefulApp;
