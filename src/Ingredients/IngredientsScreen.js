import { Header, HeaderBackButton } from "@react-navigation/elements";
import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IngredientsScreen = ({navigation, route}) => {
    const ingredients = route.params.ingredients
    const ingredientsCount = ingredients.length

    const randomNumberInRange = useCallback((min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, [])

    return (
        <SafeAreaView style={styles.holder}>
            <StatusBar barStyle={'dark-content'} animated showHideTransition={'fade'} backgroundColor={'white'} />
            <View style={styles.header_container}>                    
                <HeaderBackButton canGoBack pressOpacity={0.8} onPress={() => (navigation.navigate('Default'))} pressColor="lightgray" style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,}}/>
                <Header title={route.params.title} headerShadowVisible={false} headerTransparent headerTitleStyle={{paddingStart: 25, paddingEnd: 16, paddingBottom: 25,}}/>
            </View>
            <View style={styles.header}>
                <Image style={styles.image} source={{uri: route.params.image}} resizeMode="cover" borderRadius={25} />
                <Text style={[styles.title, {fontFamily: 'sans-serif-black', paddingTop: 16, paddingBottom: 16,}]}>ingredients ({ingredientsCount})
                    {'\n'}
                    <Text style={styles.description}>{route.params.description}</Text>
                </Text>
                <View style={styles.customList}>
                    <ScrollView
                        style={styles.scroll}
                        showsVerticalScrollIndicator={false}>
                            <View style={styles.ingredients}>
                                {ingredients.map((ingredient) => {
                                    return (
                                        <Text key={route.params.id+randomNumberInRange(1, 9999)} style={styles.ingredient}>{ingredient}</Text>
                                    )
                                })}
                            </View>   
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            navigation.navigate(
                            "Cooking", 
                            {
                                id: route.params.id,
                                title: route.params.d_title,
                                description: route.params.d_description,
                                ingredients: route.params.ingredients,
                                ingredients_value: route.params.ingredients_value,
                                image: route.params.image,
                                favorite: route.params.isFavorite,
                            })
                        }}
                        activeOpacity={0.8}>
                        <Text style={styles.textBtn}>Start Cooking</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        paddingBottom: 0,
    },
    
    header: {
        flex: 1,
    },

    header_container: {
        height: 'auto',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
        marginBottom: 8,
    },

    customList: {
        flex: 1,
        flexGrow: 1,
        padding: 8,
    },
    
    image: {
        width: '93%',
        height: '32%',
        alignSelf: 'center',
    }, 
    
    title: {
        color: "#212121",
        fontSize: 30,
        padding: 8,
    }, 

    description: {
        fontSize: 18
    },
    
    
    btn: {
        width: '80%',
        backgroundColor: '#212121',
        paddingTop: 16,
        paddingEnd: 8,
        paddingStart: 8,
        paddingBottom: 16,
        marginBottom: 8,
        borderRadius: 25,
        elevation: 20,
        alignSelf: 'center',
    },
    
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    scroll: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
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
        color: '#313131',
        margin: 8,
    }
})

export default IngredientsScreen