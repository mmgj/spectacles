import React, { createContext, useContext } from 'react';
import { useReducer } from 'reinspect';

const defaultProjectId = process.env.REACT_APP_PROJECTID;
const defaultDataset = process.env.REACT_APP_DATASET;
const defaultApiVersion = 'v2022-05-10';
const defaultQuery = '*[_type == $type][0..$num]';
const defaultParams = `{
  type: 'capture',
  num: 10,
}`;

const getLocal = (key) => {
  if (!window) return null;
  const val = window.localStorage.getItem(key);
  if (!val) return null;
  return JSON.parse(val);
};

function setLocal(key, value) {
  if (!window) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

const configuredReducer = (state, action) => {
  switch (action.type) {
    case 'setQuery': {
      setLocal('query', action.payload);
      return {
        ...state,
        query: action.payload,
      };
    }
    case 'setParams': {
      setLocal('params', action.payload);
      return {
        ...state,
        params: action.payload,
      };
    }
    case 'setProjectId': {
      setLocal('projectId', action.payload);
      return {
        ...state,
        projectId: action.payload,
      };
    }
    case 'setDataset': {
      setLocal('dataset', action.payload);
      return {
        ...state,
        dataset: action.payload,
      };
    }
    case 'setApiVersion': {
      setLocal('apiVersion', action.payload);
      return {
        ...state,
        apiVersion: action.payload,
      };
    }
    case 'setToken': {
      setLocal('token', action.payload);
      return {
        ...state,
        token: action.payload,
      };
    }
    case 'setUseCdn': {
      setLocal('useCdn', action.payload);
      return {
        ...state,
        useCdn: action.payload,
      };
    }
    case 'setDebugMode': {
      return {
        ...state,
        debugMode: action.payload,
      };
    }
    case 'setLoading': {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const StateContext = createContext();
export const StateProvider = ({ children }) => {
  const initState = {
    query: getLocal('query') || defaultQuery,
    params: getLocal('params') || defaultParams,
    dataset: getLocal('dataset') || defaultDataset,
    projectId: getLocal('projectId') || defaultProjectId,
    apiVersion: getLocal('apiVersion') || defaultApiVersion,
    token: getLocal('token') || '',
    useCdn: getLocal('useCdn') || true,
    debugMode: process.env.NODE_ENV === 'development',
    loading: false,
  };
  return (
    <StateContext.Provider
      value={useReducer(configuredReducer, initState, undefined, 'app-reducer')}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
