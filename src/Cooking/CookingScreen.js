import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const CookingScreen = ({navigation, route}) => {
    const ingredients = route.params.ingredients_value
    const [pressedItems, setPressedItems] = useState([]);

  const handlePress = (index) => {
    if (pressedItems.includes(index)) {
      setPressedItems(pressedItems.filter((item) => item !== index));
    } else {
      setPressedItems([...pressedItems, index]);
    }
  };


    const randomNumberInRange = useCallback((min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, [])
    
    const renderList = () => {
        const data = ingredients;
    
        return data.map((item, index) => (
            <Text key={item+randomNumberInRange(1, 9999)} style={[styles.ingredient, , pressedItems.includes(index) && styles.onclick]} onPress={() => handlePress(index)}>{item}</Text>
        ))
    }
    return <>{
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.ingredients}>
                    {renderList()}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    }</>;
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
        padding: 16,
    },
    
    ingredients: {
        flex: 1,
    },
    
    ingredient: {
        paddingTop: 24,
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 24,
        backgroundColor: 'rgba(150, 240, 200, 0.2)',
        borderRadius: 25,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-black',
        textDecorationLine: "none",
        textDecorationStyle: 'solid',
        textDecorationColor: 'red',
        color: '#313131',
        margin: 8,
    },

    onclick: {
        backgroundColor: 'rgba(90, 200, 150, 1)',
        color: '#fafafa',
        textDecorationLine: 'line-through',
    }
})
export default CookingScreen