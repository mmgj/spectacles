import React from 'react';
import { Card, Flex, Switch, Box, TextInput, Label, Stack } from '@sanity/ui';
import { useStateValue } from './lib/state';
import { getReducerType, selectOnFocus } from './lib/utils';

const SettingsPane = () => {
  const [{ projectId, dataset, apiVersion, useCdn, token }, dispatch] =
    useStateValue();
  const txtInputs = Object.entries({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
  });

  return (
    <Box padding={4}>
      <Stack>
        {txtInputs.map((item) => (
          <Card marginY={2} key={item[0]}>
            <Flex justify='space-between' align='center'>
              <Label>{item[0].toUpperCase()}</Label>
              {item[0] === 'useCdn' ? (
                <Card marginRight={2}>
                  <Switch
                    checked={useCdn}
                    onChange={(ev) => {
                      dispatch({
                        type: 'setUseCdn',
                        payload: ev.target.checked,
                      });
                    }}
                  />
                </Card>
              ) : (
                <TextInput
                  fontSize={[1, 1, 2, 3]}
                  onFocus={selectOnFocus}
                  onChange={(event) =>
                    dispatch({
                      type: getReducerType(item[0]),
                      payload: event.target.value,
                    })
                  }
                  padding={[2, 2, 3]}
                  placeholder='Typety-type'
                  value={item[1]}
                />
              )}
            </Flex>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SettingsPane;
