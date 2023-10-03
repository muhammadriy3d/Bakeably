/* eslint-disable no-undef */
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomeScreen from '../Home/HomeScreen'
import WelcomeScreen from '../Greet/WelcomeScreen'
import IngredientsScreen from '../Ingredients/IngredientsScreen'
import CookingScreen from '../Cooking/CookingScreen'
const Stack = createNativeStackNavigator()

export default AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                statusBarStyle: 'auto',
                statusBarColor: 'transparent',
                statusBarAnimation: 'slide',
                statusBarHidden: false,
                statusBarTranslucent: true,
                navigationBarColor: 'transparent',
                navigationBarHidden: true
            }}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Default"
                component={HomeScreen}
                options={{
                    statusBarStyle: 'dark',
                    statusBarColor: 'transparent',
                    statusBarAnimation: 'slide',
                    statusBarHidden: false,
                    statusBarTranslucent: true
                }}
            />
            <Stack.Screen
                name="Ingredients"
                component={IngredientsScreen}
                options={{
                    statusBarStyle: 'dark',
                    statusBarColor: 'transparent',
                    statusBarAnimation: 'slide',
                    statusBarHidden: false,
                    statusBarTranslucent: true,
                    navigationBarColor: 'transparent'
                }}
            />
            <Stack.Screen
                name="Cooking"
                component={CookingScreen}
                options={{
                    title: 'Cooking',
                    headerShown: true,
                    headerShadowVisible: false,
                    statusBarStyle: 'dark',
                    statusBarColor: 'transparent',
                    statusBarAnimation: 'slide',
                    statusBarHidden: false,
                    statusBarTranslucent: true,
                    navigationBarColor: 'transparent'
                }}
            />
        </Stack.Navigator>
    )
}
