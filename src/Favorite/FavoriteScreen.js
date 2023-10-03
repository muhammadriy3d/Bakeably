import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Animated, TouchableOpacity, StatusBar } from 'react-native';
import { FavoriteContext } from '../Favorite/FavoriteContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';

const Item = ({ item, onPress, backgroundColor, textColor }) => {
  const { handleFavoriteToggle, favoriteItems } = useContext(FavoriteContext);
  const [heartScale] = useState(new Animated.Value(1));
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const toggleFavoriteItem = useCallback(() => {
    handleFavoriteToggle(item.id);
    Animated.parallel([
      Animated.timing(heartScale, {
        toValue: isFavorite ? 1 : 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: isFavorite ? 1 : 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: !isFavorite ? 1.5 : 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: !isFavorite ? 1 : 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [handleFavoriteToggle, item.id, isFavorite, heartScale]);
  
  const heartScaleStyle = {
    transform: [{ scale: heartScale }],
  };

  return (
    <TouchableOpacity activeOpacity={0.8} role='link' onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View style={styles.data_container}>
        <Image source={{uri: item.image}} placeholder={{backgroundColor: 'black'}} style={{ width: 60, height: 60, marginEnd: 8 }} resizeMethod='auto' resizeMode='cover' borderRadius={120} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.d_title, { color: textColor, paddingRight: 40, }]}>
            {item.d_title}
            {/* <Text style={styles.d_duration}>{item.d_description}</Text> */}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} role='button' onLongPress={toggleFavoriteItem} onPress={toggleFavoriteItem} style={[styles.favoriteButton, {elevation: 5}]}>
          <Animated.View style={[styles.heartIcon, heartScaleStyle]}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={25}
              color={isFavorite ? 'red' : '#616161'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const FavoriteScreen = () => {
  const { favoriteItems, toggleFavorite } = useContext(FavoriteContext);
  const [data, setData] = useState(favoriteItems);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState(favoriteItems);

  const handleFavoriteToggle = useCallback(
    (itemId) => {
      toggleFavorite(itemId);
      setData((prevData) => {
        const updatedData = prevData.map((item) => {
          if (item.id === itemId) {
            return { ...item, isFavorite: !item.isFavorite };
          }
          return item;
        });
        return updatedData;
      });
      setFilteredData((prevFilteredData) => {
        const updatedFilteredData = prevFilteredData.map((item) => {
          if (item.id === itemId) {
            return { ...item, isFavorite: !item.isFavorite };
          }
          return item;
        });
        return updatedFilteredData;
      });
    },
    [toggleFavorite, setData, setFilteredData]
  );

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    navigation.setParams({ favoriteItems }); // Update favoriteItems in navigation params
  }, [favoriteItems]);

  const renderSeparator = useCallback(() => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    )
  }, [])

  const renderHeader = useCallback(() => {
    <View style={{
      padding: 8
    }}></View>
  }, [])

  const renderFooter = useCallback(() => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: "#fff"
        }}
      >
        <Text>No more data</Text>
      </View>
    )
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <Item
        item={item}
        onPress={() => navigation.navigate(
          'Ingredients',
          {
            id: item.id,
            title: item.d_title,
            description: item.d_description,
            ingredients: item.ingredients,
            ingredients_value: item.ingredients_value,
            image: item.image,
            favorite: item.isFavorite,
          })
        }
        onFavoritePress={handleFavoriteToggle}
        backgroundColor="transparent"
        textColor="#212121"
      />
    ),
    [handleFavoriteToggle]
  );

  const renderEmpty = useCallback(() => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Entypo name="info" size={32} />
        <Text style={{fontSize: 18,}}>No favorites found</Text>
      </View>
    )
  }, [])

  return (
    <SafeAreaView style={styles.holder}>
      <View style={styles.container}>
        {favoriteItems.length > 0 ? (
          <FlatList
              style={styles.list}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              // ItemSeparatorComponent={renderSeparator}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmpty}
              refreshing={false}
              showsVerticalScrollIndicator={false}
              onRefresh={(item) => setFilteredData(favoriteItems)}
            />
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Entypo name="info" size={32} />
              <Text style={{fontSize: 18,}}>No favorites found yet</Text>
            </View>
          )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 1,
  },
  searchBar: {
    margin: 16,
    padding: 4,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#efefef',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  list: {
    flex: 1,
    flexGrow: 1,
  },
  item: {
    flex: 1,
  },
  data_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  d_title: {
    fontSize: 18,
    fontFamily: 'sans-serif-black',
    textTransform: 'capitalize',
    color: '#000',
  },
  d_duration: {
    display: 'none',
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: '#aaaaaa',
  },
  favoriteButton: {
    marginLeft: 'auto',
    marginRight: 16,
  },
  heartIcon: {
    transform: [{ scale: 1 }],
  },
});

export default FavoriteScreen;
