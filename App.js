import {NavigationContainer} from '@react-navigation/native';
import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';

import styles from './styles';

import HomeScreen from './components/HomeScreen';
import { SearchScreen, ArtistList } from './components/SearchScreen';
import ReleaseScreen from './components/ReleaseScreen';
import { FavoritesProvider, FavoritesScreen, FavoriteButton } from './components/FavoriteScreen';

const Stack = createNativeStackNavigator()


const MyA2App = () => {
    return (
        <FavoritesProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{ title: 'Artist Search' }} />
                    <Stack.Screen
                        name="Releases"
                        component={ReleaseScreen}
                        options={{ title: 'Releases' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </FavoritesProvider>
    )
}

export default MyA2App;
