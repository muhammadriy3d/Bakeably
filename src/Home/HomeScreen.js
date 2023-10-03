/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-dupe-keys */
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Reflector from './HomeFragment'
import SearchScreen from '../Search/SearchScreen'
import SettingsScreen from '../Settings/SettingsScreen'
import FavoriteScreen from '../Favorite/FavoriteScreen'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name="Bakeably"
                component={Reflector}
                options={{
                    headerShown: true,
                    tabBarStyle: true,
                    tabBarInactiveTintColor: 'rgba(180, 180, 180, 1)',
                    tabBarActiveTintColor: '#00FCA0',
                    tabBarHideOnKeyboard: true,
                    tabBarLabel: '',
                    headerStyle: {
                        elevation: 0
                    },
                    headerTitleStyle: {width: '100%', left: '10%', padding: 8},
                    tabBarStyle: {
                        padding: 8,
                        width: '100%',
                        height: '7%',
                        elevation: 0,
                        borderColor: 'transparent'
                    },
                    tabBarIcon: ({color}) => (
                        <Ionicons name="home" color={color} size={28} />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarStyle: true,
                    headerShown: false,
                    tabBarInactiveTintColor: 'rgba(180, 180, 180, 1)',
                    tabBarActiveTintColor: '#00FCA0',
                    tabBarHideOnKeyboard: true,
                    tabBarLabel: '',
                    headerStyle: {elevation: 0},
                    tabBarStyle: {
                        padding: 8,
                        width: '100%',
                        height: '7%',
                        elevation: 0,
                        borderColor: 'transparent'
                    },
                    tabBarIcon: ({color}) => (
                        <Ionicons name="search" color={color} size={28} />
                    )
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteScreen}
                initialParams={{favoriteItems: []}}
                options={{
                    title: 'Favorites',
                    tabBarStyle: true,
                    tabBarInactiveTintColor: 'rgba(180, 180, 180, 1)',
                    tabBarActiveTintColor: '#00FCA0',
                    tabBarLabel: '',
                    headerStyle: {
                        elevation: 0,
                        borderBottomWidth: 1
                    },
                    tabBarHideOnKeyboard: true,
                    headerTitleStyle: {width: '100%'},
                    tabBarStyle: {
                        padding: 8,
                        width: '100%',
                        height: '7%',
                        elevation: 0,
                        borderColor: 'transparent'
                    },
                    tabBarIcon: ({color}) => (
                        <Ionicons name="ios-bookmark" color={color} size={28} />
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarStyle: true,
                    headerShown: false,
                    tabBarInactiveTintColor: 'rgba(180, 180, 180, 1)',
                    tabBarActiveTintColor: '#00FCA0',
                    tabBarHideOnKeyboard: true,
                    tabBarLabel: '',
                    headerStyle: {elevation: 0},
                    tabBarStyle: {
                        padding: 8,
                        width: '100%',
                        height: '7%',
                        elevation: 0,
                        borderColor: 'transparent'
                    },
                    tabBarIcon: ({color}) => (
                        <Ionicons name="settings" color={color} size={28} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeScreen
