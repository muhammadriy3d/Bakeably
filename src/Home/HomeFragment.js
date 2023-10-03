/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    Animated,
    TouchableOpacity
} from 'react-native'

import {ActivityIndicator, Card, Searchbar} from 'react-native-paper'
import {dataAPI, dataAPITitle, dataAPIToken} from '../Data/Data'
import {FavoriteContext} from '../Favorite/FavoriteContext'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {SafeAreaView} from 'react-native-safe-area-context'
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads'

const DATA = dataAPI

const Item = ({item, onPress, backgroundColor, textColor}) => {
    const {handleFavoriteToggle, favoriteItems} = useContext(FavoriteContext)
    const [heartScale] = useState(new Animated.Value(1))
    const isFavorite = favoriteItems.some(favItem => favItem.id === item.id)

    const toggleFavoriteItem = useCallback(() => {
        handleFavoriteToggle(item.id)
        Animated.parallel([
            Animated.timing(heartScale, {
                toValue: isFavorite ? 1 : 1.5,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(heartScale, {
                toValue: isFavorite ? 1 : 1.2,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.sequence([
                Animated.timing(heartScale, {
                    toValue: !isFavorite ? 1.2 : 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(heartScale, {
                    toValue: !isFavorite ? 1 : 1,
                    duration: 100,
                    useNativeDriver: true
                })
            ])
        ]).start()
    }, [handleFavoriteToggle, item.id, isFavorite, heartScale])

    const heartScaleStyle = {
        transform: [{scale: heartScale}]
    }

    return (
        <Card onPress={onPress} style={[styles.item, {backgroundColor}]}>
            <ImageBackground
                source={{uri: item.image}}
                style={{width: '100%', height: 400}}
                resizeMethod="auto"
                resizeMode="cover"
                borderRadius={25}>
                {/* Placeholder */}
                <View style={styles.placeholder} />
            </ImageBackground>
            {/* Just a shadows */}
            <View
                elevation={100}
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#020202',
                    opacity: 0.02,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 25,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0
                }}
            />
            <View
                elevation={40}
                style={{
                    height: '50%',
                    width: '100%',
                    backgroundColor: '#0101010',
                    opacity: 0.03,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 25,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0
                }}
            />
            <View
                elevation={10}
                style={{
                    height: '25%',
                    width: '100%',
                    backgroundColor: '#000000',
                    opacity: 0.04,
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 25,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0
                }}
            />
            <View style={styles.data_container}>
                <Text style={[styles.d_title, {color: textColor}]}>
                    {item.d_title}
                </Text>
                <Text style={styles.d_duration}>{item.d_description}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.5}
                role="button"
                onLongPress={toggleFavoriteItem}
                onPress={toggleFavoriteItem}
                style={[styles.favoriteButton]}>
                <Animated.View style={[styles.heartIcon, heartScaleStyle]}>
                    <Icon
                        name={isFavorite ? 'heart' : 'heart'}
                        size={40}
                        color={isFavorite ? 'rgba(250, 80, 10, 1)' : '#efefef'}
                    />
                </Animated.View>
            </TouchableOpacity>
        </Card>
    )
}

const Placeholder = () => (
    <View style={styles.placeholder}>
        <ActivityIndicator animating size="large" color="darkgray" />
    </View>
)

const HomeFragment = () => {
    const {toggleFavorite, favoriteItems} = useContext(FavoriteContext)
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredData, setFilteredData] = useState(DATA)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [data, setData] = useState(DATA)
    const keyExtractor = useCallback(item => item.id.toString(), [])

    const onChangeSearch = useCallback(query => {
        setSearchQuery(query)
        filterData(query)
    }, [])

    const filterData = useCallback(query => {
        const filtered = DATA.filter(item =>
            item.d_title.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredData(filtered)
    }, [])

    const upload = useCallback(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setPage(page + 1)
        }, 1000)
    }, [page])

    const renderItem = useCallback(({item, index}) => {
        if (index % 3 === 0 && index !== 0) {
            return (
                <>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center'
                        }}>
                        <BannerAd
                            unitId={dataAPIToken.adUnitId}
                            size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true
                            }}
                            onAdLoaded={() => {
                                console.log('Ad loaded')
                            }}
                            onAdFailedToLoad={error => {
                                console.error('Ad failed to load: ', error)
                            }}
                        />
                    </View>
                    <Item
                        item={item}
                        onPress={() => {
                            navigation.navigate('Ingredients', {
                                id: item.id,
                                title: item.d_title,
                                description: item.d_description,
                                ingredients: item.ingredients,
                                ingredients_value: item.ingredients_value,
                                image: item.image,
                                favorite: item.isFavorite
                            })
                        }}
                        backgroundColor="transparent"
                        textColor="white"
                    />
                </>
            )
        }

        return (
            <Item
                item={item}
                onPress={() => {
                    navigation.navigate('Ingredients', {
                        id: item.id,
                        title: item.d_title,
                        description: item.d_description,
                        ingredients: item.ingredients,
                        ingredients_value: item.ingredients_value,
                        image: item.image,
                        favorite: item.isFavorite
                    })
                }}
                backgroundColor="transparent"
                textColor="white"
            />
        )
    }, [])

    const renderFooter = useCallback(() => {
        if (!loading) return null
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE'
                }}>
                <ActivityIndicator
                    animating
                    size="large"
                    color="darkgray"
                    style={{padding: 8}}
                />
            </View>
        )
    }, [])

    return (
        <SafeAreaView style={styles.holder}>
            {/* <StatusBar barStyle="dark" backgroundColor="#ffffff" /> */}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{dataAPITitle}</Text>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center'
                        }}>
                        <BannerAd
                            unitId={dataAPIToken.adUnitId}
                            size={BannerAdSize.BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true
                            }}
                            onAdLoaded={() => {
                                console.log('Ad loaded')
                            }}
                            onAdFailedToLoad={error => {
                                console.error('Ad failed to load: ', error)
                            }}
                        />
                    </View>
                    <View style={styles.listContainer}>
                        <Searchbar
                            style={styles.input}
                            placeholder="Search"
                            round
                            lightTheme
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            selectionColor="lightgray"
                            iconColor="#212121"
                            placeholderTextColor="gray"
                            cursorColor="#212121"
                        />
                        {loading ? (
                            <Placeholder />
                        ) : (
                            <FlatList
                                style={styles.list}
                                data={filteredData}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                placeholder="gray"
                                ItemSeparatorComponent={null}
                                decelerationRate={'normal'}
                                showsVerticalScrollIndicator={false}
                                windowSize={1}
                                refreshing={false}
                                onRefresh={() => renderItem}
                                disableVirtualization
                                onEndReached={renderFooter}
                                onEndReachedThreshold={0.1}
                            />
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    adBanner: {
        marginVertical: 10,
        width: '100%',
        height: 100,
        borderRadius: 25
    },
    holder: {
        flex: 1,
        padding: 8,
        backgroundColor: 'white'
    },

    placeholder: {
        width: '100%',
        height: 200,
        backgroundColor: 'gray'
    },

    header: {
        flex: 1,
        padding: 8,
        paddingBottom: 0
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },

    title: {
        fontSize: 32,
        fontFamily: 'sans-serif-black',
        textTransform: 'capitalize',
        color: '#212121',
        padding: 16,
        paddingTop: 0,
        marginTop: 8
    },

    input: {
        margin: 8,
        padding: 8,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: '#efefef',
        elevation: 10
    },

    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },

    listContainer: {
        flex: 4,
        marginTop: 8,
        padding: 8,
        paddingBottom: 0,
        alignItems: 'center'
    },

    list: {
        width: '100%',
        height: 'auto',
        flexGrow: 1
    },

    item: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 30,
        marginBottom: 16,
        marginEnd: 8,
        marginStart: 8,
        marginTop: 8,
        elevation: 10,
        shadowColor: 'blue',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 5
    },

    innerShadowTop: {
        width: '94%',
        height: '3%',
        position: 'absolute',
        top: -1,
        left: 10,
        right: -10,
        bottom: 0,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25
    },

    innerShadowLeft: {
        width: '3%',
        height: '94%',
        position: 'absolute',
        top: 8,
        right: 0,
        bottom: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25
    },

    innerShadowRight: {
        width: '3%',
        height: '94%',
        position: 'absolute',
        top: 8,
        left: 0,
        right: 0,
        bottom: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25
    },

    innerShadowBottom: {
        width: '94%',
        height: '3%',
        position: 'absolute',
        left: 10,
        right: -10,
        bottom: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25
    },

    innerShadowBottom: {
        width: '100%',
        height: '40%',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25
    },

    d_title: {
        fontSize: 32,
        fontFamily: 'sans-serif-black',
        textTransform: 'capitalize',
        color: '#ffffff',
        padding: 16,
        paddingBottom: 0
    },

    d_duration: {
        fontSize: 19,
        fontFamily: 'sans-serif',
        color: '#fefefe',
        padding: 16,
        elevation: 5,
        opacity: 1,
        textShadowColor: 'black'
    },

    data_container: {
        flex: 1,
        width: '100%',
        padding: 8,
        position: 'absolute',
        bottom: 0,
        borderRadius: 25
    },

    favoriteButton: {
        margin: 16,
        backgroundColor: 'rgba(115,100,100,0.4)',
        borderRadius: 10,
        padding: 8,
        position: 'absolute',
        top: 10,
        right: 10,
        elevation: 5,
        shadowColor: 'rgba(255,255,255,0.4)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 15
    },
    heartIcon: {
        transform: [{scale: 1}]
    }
})

export default HomeFragment
