import styles from '../styles';
import React, {
    useContext, createContext, useReducer
} from 'react';
import {
    TouchableOpacity, Image, FlatList
} from 'react-native';

import { SearchScreen, ArtistList } from './SearchScreen';

const FavoritesContext = createContext(null)
const FavoritesDispatchContext = createContext(null)
const useFavorites = () => useContext(FavoritesContext)
const useFavoritesDispatch = () =>
    useContext(FavoritesDispatchContext)

const FavoritesProvider = ({ children }) => {
    const [
        favorites,
        dispatch
    ] = useReducer(favoritesReducer, {
        details: [],
        lookup: new Set([])
    })

    return (
        <FavoritesContext.Provider value={favorites}>
            <FavoritesDispatchContext.Provider value={dispatch}>
                {children}
            </FavoritesDispatchContext.Provider>
        </FavoritesContext.Provider>
    )
}

const favoritesReducer = (favorites, action) => {
    switch (action.type) {
        case 'added': {
            const details = [...favorites.details, {
                id: action.id,
                name: action.name
            }]
            const lookup = new Set(details.map(f => f.id))
            return { details, lookup }
        }
        case 'deleted': {
            let lookup = new Set(favorites.lookup)
            lookup.delete(action.id)
            const details = favorites.details
                .filter(f => lookup.has(f.id))
            return { details, lookup }
        }
        default: {
            throw Error(`Unknown action: ${action.type}`)
        }
    }
}

const FavoritesScreen = ({ navigation }) => {
    const favorites = useFavorites()
    return (<ArtistList
        artists={favorites.details}
        navigation={navigation}
        />
    )
}

const FavoriteButton = ({ artist }) => {
    const favorites = useFavorites();
    const dispatch = useFavoritesDispatch();

    const onPress = () => {
       if (favorites.lookup.has(artist.id)) {
            dispatch({
                type: 'deleted',
                id: artist.id
            })
        } else {
            dispatch({
                type: 'added',
                ...artist
            })
        }
    }

    return (
        <TouchableOpacity
            onPress={onPress}>
            <Image
                style={styles.bookmarkArtistImage}
                source={
                    favorites.lookup.has(artist.id)
                    ? require('../assets/bookmark.png')
                    : require('../assets/bookmark-outline.png')
                }/>
        </TouchableOpacity>
    )
}

export { FavoritesProvider, FavoritesScreen, FavoriteButton };
