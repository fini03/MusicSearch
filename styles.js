import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2DBE0'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    artist: {
        padding: 30,
        margin: 30,
        marginVertical: 4,
        backgroundColor: '#FEFEFE',
        alignItems: 'center'
    },
    artistName: {
        flex: 1,
    },
    artistText: {
        fontSize: 24,
        color: '#13282C',
        textAlign: 'center'
    },
    albumText: {
        fontSize: 18,
        color: '#13282C',
        textAlign: 'center'
    },
    artistCover: {
        flex: 1
    },
    coverImage: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10
    },
    bookmarkArtistImage: {
        width: 30,
        height: 30
    }
})

export default styles;
