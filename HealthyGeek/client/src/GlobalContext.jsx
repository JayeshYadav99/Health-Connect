import React, { createContext, useState } from 'react';

// Create the global context
export const GlobalContext = createContext();

// Create a provider component to wrap the app and provide the global context
export const GlobalProvider = ({ children }) => {
  // Define the global state variables
  const [globalVariable, setGlobalVariable] = useState('');

  // Create a function to update the global variable
  const updateGlobalVariable = (value) => {
    setGlobalVariable(value);
  };

  // Define the values to be provided by the global context
  const contextValues = {
    globalVariable,
    updateGlobalVariable,
  };

  // Return the provider component with the provided values
  return (
    <GlobalContext.Provider value={contextValues}>
      {children}
    </GlobalContext.Provider>
  );
};
