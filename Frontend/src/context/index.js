import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  // const onDataDidChange = (data) => {
  //   if (data) {
  //     setUserData(data)
  //   }
  // };

  const userClean = () => {
    setUserData();
  }

  useEffect(() => {
    if (userData) {
      try {
        const value = JSON.stringify(userData);
        AsyncStorage.setItem('@data', value); 
      } catch (err) {
        console.error(err);
      }
    } else {
      AsyncStorage.clear();
    }
  }, [userData])

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        userClean,
      }}>
      {children} 
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) return;
  return {...context};
};

export default DataProvider;
