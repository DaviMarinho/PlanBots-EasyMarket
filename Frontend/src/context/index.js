import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { openStores } from "../services/apiservices";

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [storeData, setStoreData] = useState();
  const [markers, setMarkers] = useState();
  const [showNav, setShowNav] = useState(false);

  // const onDataDidChange = (data) => {
  //   if (data) {
  //     setUserData(data)
  //   }
  // };

  const userClean = () => {
    setUserData();
  };
  
  const getStoreLocations = () => {
    openStores().then((r) => {
      setMarkers(r.data);
    });
  };

  useEffect(() => {
    if (userData) {
      try {
        const value = JSON.stringify(userData);
        AsyncStorage.setItem("@data", value);
      } catch (err) {
        console.error(err);
      }
    } else {
      setStoreData();
      AsyncStorage.clear();
    }
  }, [userData]);

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        userClean,
        storeData,
        setStoreData,
        markers,
        getStoreLocations,
        showNav,
        setShowNav,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) return;
  return { ...context };
};

export default DataProvider;
