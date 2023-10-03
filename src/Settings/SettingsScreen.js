import React from "react"
import { View, Text } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import { SafeAreaView } from "react-native-safe-area-context"

const SettingsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Entypo name="info" size={36} />
                <Text style={{fontSize: 18,}}>We are working for this feature</Text>
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen