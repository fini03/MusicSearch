import styles from '../styles';
import {
    Image
} from 'react-native';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import StartScreen from './StartScreen';
import { FavoritesProvider, FavoritesScreen, FavoriteButton } from './FavoriteScreen';

const Tab = createBottomTabNavigator()

const HomeScreen = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Start"
            component={StartScreen}
            options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: ({ size }) => (<Image
                    style={{
                        width: size,
                        height: size
                    }}
                    source={require('../assets/home-outline.png')}
                    />
                )
            }} />
        <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
                tabBarIcon: ({ size }) => (<Image
                    style={{
                        width: size,
                        height: size
                    }}
                    source={require('../assets/bookmarks-outline.png')}
                    />
                )
            }} />
    </Tab.Navigator>
)

export default HomeScreen;
