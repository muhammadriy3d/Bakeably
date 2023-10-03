import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataAPI } from '../Data/Data';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    // Load favorite items from AsyncStorage
    loadFavoriteItems();
  }, []);

  useEffect(() => {
    // Save favorite items to AsyncStorage whenever it changes
    saveFavoriteItems();
  }, [favoriteItems]);

  const loadFavoriteItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('favoriteItems');
      if (storedItems) {
        setFavoriteItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.log('Error loading favorite items:', error);
    }
  };

  const saveFavoriteItems = async () => {
    try {
      await AsyncStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    } catch (error) {
      console.log('Error saving favorite items:', error);
    }
  };

  const handleFavoriteToggle = (itemId) => {
    setFavoriteItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(existingItemIndex, 1);
        return updatedItems;
      } else {
        const itemToAdd = dataAPI.find((item) => item.id === itemId);
        if (itemToAdd) {
          return [...prevItems, itemToAdd];
        }
      }
      return prevItems;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favoriteItems, handleFavoriteToggle }}>
      {children}
    </FavoriteContext.Provider>
  );
};
