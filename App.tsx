import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { FavoriteProvider } from './src/Favorite/FavoriteContext'
import AppNavigator from './src/Navigator/AppNavigator'
import { dataAPI } from './src/Data/Data'
import { SafeAreaView } from 'react-native'

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1, direction: 'ltr' }}>
            <NavigationContainer>
                <FavoriteProvider data={dataAPI}>
                    <AppNavigator />
                </FavoriteProvider>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default App
