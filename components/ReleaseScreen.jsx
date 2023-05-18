import styles from '../styles';
import React, {
    useState, useEffect
} from 'react';
import {
    Text, View, FlatList, Image
} from 'react-native';

const ReleaseScreen = ({ route }) => {
    const { artistId } = route.params
    const [
        releases,
        setReleases
    ] = useState([])

    // Fetch the artist releases from remote
    useEffect(() => {
        getAlbumsOfArtist(artistId, setReleases)
    }, [])

    return (
        <View
            style={{
                flexDirection: "column",
                flex: 1,
                padding: 20
            }}>
            <FlatList
                style={{
                    flex: 1
                }}
                data={releases}
                renderItem={({item}) =>
                    <Release
                        item={item}
                        />
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const Release = ({item}) => {
    const baseUri = 'https://coverartarchive.org/release-group'
    const coverUri = `${baseUri}/${item.id}/front-250`
    const placeholder = require('../assets/placeholder.png')

    return (
        <View style={{flexDirection:"row"}, styles.artist}>
            <View style={styles.artistCover}>
            <Image
                style={styles.coverImage}
                source={{
                    uri: coverUri,
                    method: 'GET',
                    headers: {
                        "User-Agent": "MyA2App/1.0.0 ( a12128050@unet.univie.ac.at )"
                    }
                }}
                defaultSource={placeholder}
            />
            </View>
             <View style={styles.artistName}>
                <Text style={styles.artistText}>
                    {item.title}
                </Text>
                <Text style={styles.albumText}>
                    {item.releaseYear}
                    {'\n'}
                    {item.type}
                </Text>
            </View>
        </View>
    );
}

const getAlbumsOfArtist = async (artistId, setReleases) => {
    // Query the musicbrainz API
    const params = new URLSearchParams({
        inc: 'release-groups',
        fmt: 'json'
    })

    // TODO: error handling

    // Perform request to API
    const baseUri = `https://musicbrainz.org/ws/2/artist/`
    const response = await fetch(`${baseUri}${artistId}?${params}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "MyA2App/1.0.0 ( a12128050@unet.univie.ac.at )"
            }
        })

    const responseJson = await response.json()
    const releases = responseJson["release-groups"].map(release => {
        const r = { id: release.id, title: release.title, releaseYear: release["first-release-date"], type: release["primary-type"]}
        return r
    })

    setReleases(releases)
}

export default ReleaseScreen;
