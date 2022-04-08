import React, { useState, useCallback } from 'react';
import defaultSettings from './settings.json';
import Utils from './utils';

export const GlobalContext = React.createContext();

const initSettings = () => {
  const cacheSettings = Utils.getCache('settings');
  return Object.assign({}, defaultSettings, cacheSettings || {});
};

export const GlobalProvider = ({ children }) => {
  const [settings, updateSettings] = useState(initSettings);

  const setSettings = useCallback((options) => {
    updateSettings((value) => Object.assign({ ...value }, options));
  }, []);

  const contextValue = {
    ...settings,
    setSettings,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
