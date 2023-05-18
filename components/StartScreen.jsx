import styles from '../styles';
import React, {
    useState
} from 'react';
import {
    Text, View, TextInput
} from 'react-native';

const StartScreen = ({ navigation }) => {
    const [
        searchString,
        setSearchString
    ] = useState('')

    // When the user finishes editing, switch to search view
    const onSubmitEditing = () => {
        navigation.push('Search', { searchString })
    }

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.input}
                placeholder='Enter artist...'
                enterKeyHint='search'
                onChangeText={setSearchString}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    )
}

export default StartScreen;
