/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useContext, useEffect} from 'react'
import {FavoriteContext} from '../Favorite/FavoriteContext'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native'
import {ActivityIndicator, Searchbar} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import {useNavigation} from '@react-navigation/native'
import {dataAPI} from '../Data/Data'
import {SafeAreaView} from 'react-native-safe-area-context'

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
                toValue: isFavorite ? 1 : 1.5,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.sequence([
                Animated.timing(heartScale, {
                    toValue: !isFavorite ? 1.5 : 1,
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
        <TouchableOpacity
            activeOpacity={0.8}
            role="link"
            onPress={onPress}
            style={[styles.item, {backgroundColor}]}>
            <View style={styles.data_container}>
                <Image
                    source={{uri: item.image}}
                    placeholder={{backgroundColor: 'black'}}
                    style={{width: 60, height: 60, marginEnd: 8}}
                    resizeMethod="auto"
                    resizeMode="cover"
                    borderRadius={120}
                />
                <View style={{flex: 1}}>
                    <Text style={[styles.d_title, {color: textColor}]}>
                        {item.d_title}
                        {'\n'}
                        <Text style={styles.d_duration}>{item.duration}</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    role="button"
                    onLongPress={toggleFavoriteItem}
                    onPress={toggleFavoriteItem}
                    style={[styles.favoriteButton, {elevation: 5}]}>
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
    )
}

const _404result = () => (
    <SafeAreaView style={styles.holder}>
        <View style={styles.placeholder}>
            <Text>{renderPlaceholder}</Text>
        </View>
    </SafeAreaView>
)

const SearchScreen = () => {
    const {toggleFavorite, favoriteItems} = useContext(FavoriteContext)
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(DATA)
    const [filteredData, setFilteredData] = useState(DATA)
    const [isSearching, setSearchStart] = useState(false)

    const onChangeSearch = useCallback(query => {
        setSearchQuery(query)
        filterData(query)
        setSearchStart(true)
    }, [])

    const filterData = useCallback(query => {
        const filtered = DATA.filter(item =>
            item.d_title.toLowerCase().includes(query.toLowerCase())
        )
        {
            filteredData ? setFilteredData(filtered) : <_404result />
        }
    }, [])

    const handleFavoriteToggle = useCallback(
        itemId => {
            toggleFavorite(itemId)
            setData(prevData => {
                const updatedData = prevData.map(item => {
                    if (item.id === itemId) {
                        return {...item, isFavorite: !item.isFavorite}
                    }
                    return item
                })
                return updatedData
            })
            setFilteredData(prevFilteredData => {
                const updatedFilteredData = prevFilteredData.map(item => {
                    if (item.id === itemId) {
                        return {...item, isFavorite: !item.isFavorite}
                    }
                    return item
                })
                return updatedFilteredData
            })
        },
        [toggleFavorite, setData, setFilteredData]
    )

    useEffect(() => {
        setFilteredData(data)
    }, [data])

    useEffect(() => {
        navigation.setParams({favoriteItems}) // Update favoriteItems in navigation params
    }, [favoriteItems, navigation])

    const renderSeparator = useCallback(() => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        )
    }, [])

    const renderHeader = useCallback(({text}) => {
        return (
            <View style={{padding: 8}}>
                <Text style={{fontSize: 16, fontWeight: 600, padding: 8}}>
                    Search results for:
                    <Text>{searchQuery}</Text>
                </Text>
            </View>
        )
    }, [])

    const renderFooter = useCallback(() => {
        if (!loading) {
            return null
        }
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

    const renderItem = useCallback(
        ({item}) => (
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
                onFavoritePress={handleFavoriteToggle}
                backgroundColor="transparent"
                textColor="#212121"
            />
        ),
        [handleFavoriteToggle, navigation]
    )

    const renderPlaceholder = useCallback(
        () => (
            <View style={{padding: 8}}>
                <Text style={{fontSize: 16, fontWeight: 600, padding: 8}}>
                    Suggestions:
                </Text>
            </View>
        ),
        []
    )

    const randomNumberInRange = useCallback((min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }, [])

    const NoResult = useCallback(text => {
        return (
            <View style={styles.placeholder}>
                <View
                    style={{
                        padding: 8,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Entypo name="info" size={28} />
                    <Text style={{fontSize: 16, fontWeight: 600, padding: 8}}>
                        No result found!
                    </Text>
                </View>
            </View>
        )
    }, [])

    return (
        <SafeAreaView style={styles.holder}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Searchbar
                        style={styles.searchBar}
                        placeholder="Search"
                        round
                        lightTheme
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                {isSearching && searchQuery ? (
                    <View>
                        <FlatList
                            style={styles.list}
                            data={filteredData}
                            renderItem={renderItem}
                            windowSize={10}
                            // ItemSeparatorComponent={renderSeparator}
                            ListHeaderComponent={renderHeader}
                            ListFooterComponent={renderFooter}
                            ListEmptyComponent={NoResult}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </View>
                ) : (
                    <View>
                        <FlatList
                            style={styles.list}
                            data={data.slice(0, randomNumberInRange(0, 5))}
                            renderItem={renderItem}
                            // ItemSeparatorComponent={renderSeparator}
                            ListHeaderComponent={renderPlaceholder}
                            ListFooterComponent={renderFooter}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8
    },
    container: {
        flex: 1
    },
    searchContainer: {
        borderBottomColor: '#CED0CE',
        borderBottomWidth: 1
    },
    searchBar: {
        margin: 16,
        padding: 4,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: '#efefef'
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    list: {
        flexDirection: 'column',
        flexGrow: 0
    },
    item: {
        flex: 1
    },
    data_container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    d_title: {
        fontSize: 18,
        fontFamily: 'sans-serif-black',
        textTransform: 'capitalize',
        color: '#000'
    },
    d_duration: {
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: '#aaaaaa'
    },
    favoriteButton: {
        display: 'none',
        marginLeft: 'auto',
        marginRight: 16
    },
    heartIcon: {
        transform: [{scale: 1}]
    }
})

export default SearchScreen
