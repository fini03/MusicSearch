import styles from '../styles';
import React, {
    useState, useEffect
} from 'react';
import {
    Text, View, FlatList, TouchableOpacity
} from 'react-native';
import { FavoritesProvider, FavoritesScreen, FavoriteButton } from './FavoriteScreen';

const SearchScreen = ({ route, navigation }) => {
    const { searchString } = route.params
    const [
        artistSearchResults,
        setArtistSearchResults
    ] = useState([])

    // Fetch the artist search results from remote
    useEffect(() => {
        searchForArtist(searchString, setArtistSearchResults)
    }, [searchString])

    return (<ArtistList
        artists={artistSearchResults}
        navigation={navigation}
        />
    )
}

const Artist = ({ item, navigation }) => {
    const artistId = item.id
    const onPress = () => {
        navigation.push('Releases', { artistId })
    }

    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
                style={{
                    flex: 1
                }}
                onPress={onPress}>
                <Text style={styles.artistText}>
                    {item.name}
                </Text>
            </TouchableOpacity>
            <FavoriteButton
                artist={item}
                />
        </View>
    );
}

const ArtistList = ({ artists, navigation }) => (
    <View
        style={{
            flexDirection: "column",
            flex: 1,
            padding: 20
        }}>
        <FlatList
            data={artists}
            renderItem={({item}) =>
                <Artist
                    item={item}
                    navigation={navigation}
                    />
            }
            keyExtractor={item => item.id}
        />
    </View>
)

const searchForArtist = async (name, setArtistSearchResults) => {
    // Query the musicbrainz API
    const params = new URLSearchParams({
        query: name,
        fmt: 'json'
    })

    // Perform request to API
    const baseUri = 'https://musicbrainz.org/ws/2/artist/'
    const response = await fetch(`${baseUri}?${params}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "MyA2App/1.0.0 ( a12128050@unet.univie.ac.at )"
            }
        })

    const responseJson = await response.json()
    const artists = responseJson.artists.map(artist => {
        const a = {
            id: artist.id,
            name: artist.name
        }
        return a
    })

    setArtistSearchResults(artists)
}

export { SearchScreen, ArtistList };
