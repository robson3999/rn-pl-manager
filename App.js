import React from 'react';
import { Root } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { StyleSheet } from 'react-native'
import HomeScreen from './views/HomeScreen'
import JukeboxHome from './views/Jukebox/JukeboxHome'
import GenresList from './views/Jukebox/GenresList'
import DetailedSongsView from './views/Jukebox/DetailedSongsView'

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Jukebox: {
      screen: JukeboxHome
    },
    GenresList: {
      screen: GenresList
    },
    DetailedSongsView: {
      screen: DetailedSongsView
    }
  },
  {
    initialRouteName: 'Home'
  },
  { headerMode: 'screen' }
)
export default class App extends React.Component {
  render() {
    return (
      <Root>
        <RootStack />
      </Root>
    )
  }
}
