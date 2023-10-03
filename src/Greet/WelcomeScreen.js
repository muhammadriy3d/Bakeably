/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ImageBackground,
    StatusBar
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {dataAPIGreet} from '../Data/Data'
import bgImage from '../assets/images/bg.jpeg'

const WelcomeScreen = ({navigation}) => {
    const [greetTitle, setGreetTitle] = useState('')
    const [greetDescription, setGreetDescription] = useState('')
    const [greetImage, setGreetImage] = useState(null)

    useEffect(() => {
        // Set default values if the properties are null
        setGreetTitle(dataAPIGreet.title || '')
        setGreetDescription(dataAPIGreet.description || '')
        setGreetImage(dataAPIGreet.image || null)
    }, [])

    return (
        // <SafeAreaView style={styles.holder}>
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle={'light-content'}
                backgroundColor={'black'}
            />
            {greetImage && greetImage ? (
                <ImageBackground
                    style={styles.image}
                    source={{uri: greetImage}}
                />
            ) : (
                <ImageBackground
                    style={styles.image}
                    source={bgImage}
                    resizeMode="cover"
                    resizeMethod="auto"
                />
            )}
            {/* Just a shadows */}
            <View
                elevation={100}
                style={{
                    height: '40%',
                    width: '100%',
                    backgroundColor: '#0f0f0f',
                    opacity: 0.2,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    position: 'absolute',
                    bottom: 0
                }} />
            <View
                elevation={40}
                style={{
                    height: '35%',
                    width: '100%',
                    backgroundColor: '#020202',
                    opacity: 0.3,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 5},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    position: 'absolute',
                    bottom: 0
                }} />
            <View
                elevation={10}
                style={{
                    height: '25%',
                    width: '100%',
                    backgroundColor: '#000000',
                    opacity: 0.4,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 8},
                    shadowOpacity: 0.8,
                    shadowRadius: 8,
                    position: 'absolute',
                    bottom: 0
                }} />
            <View style={styles.textOverlay}>
                {greetTitle ? (
                    <Text style={styles.title}>{greetTitle}</Text>
                ) : (
                    <Text style={styles.title}>
                        Deliciously Simple Recipes for Every Craving
                    </Text>
                )}
                {greetDescription ? (
                    <Text style={styles.subtitle}>{greetDescription}</Text>
                ) : (
                    <Text style={styles.subtitle}>
                        From quick weeknight dinners to decadent desserts
                    </Text>
                )}
                <TouchableHighlight
                    style={[styles.btn, {elevation: 10}]}
                    onPress={() => navigation.navigate('Default')}
                    underlayColor="#00FCA0">
                    <Text style={[styles.btn_text, {paddingLeft: 40}]}>
                        Get Started
                    </Text>
                </TouchableHighlight>
                <AntDesign
                    name="doubleright"
                    size={30}
                    color="#00FCA0"
                    style={styles.arrowright}
                />
            </View>
        </View>
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    holder: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    textOverlay: {
        padding: 8,
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0
    },

    title: {
        color: 'white',
        fontSize: 34,
        marginBottom: 8,
        marginEnd: 20,
        marginStart: 20,
        fontWeight: '900',
        fontFamily: 'sans-serif-black',
        textAlign: 'center'
    },

    subtitle: {
        color: '#EFEFEF',
        fontSize: 20,
        fontFamily: 'sans-serif',
        paddingTop: 16,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 16,
        marginLeft: '10%',
        marginRight: '10%',
        textAlign: 'center'
    },

    btn: {
        width: '65%',
        marginTop: 20,
        marginBottom: 40,
        paddingTop: 20,
        paddingEnd: 15,
        paddingBottom: 20,
        paddingLeft: 15,
        alignItems: 'center',
        backgroundColor: '#00FCA0',
        borderRadius: 120,
        borderWidth: 1,
        borderColor: '#00FCA0',
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10
    },

    btn_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },

    arrowright: {
        backgroundColor: 'white',
        borderRadius: 180,
        padding: 12,
        position: 'absolute',
        bottom: 56,
        left: 85
    }
})

export default WelcomeScreen
