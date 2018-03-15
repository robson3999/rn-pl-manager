import React from 'react';
import { Root } from 'native-base'
import { StackNavigator } from 'react-navigation'
import HomeScreen from './views/HomeScreen'
import SongsList from './views/SongsList'
import SummaryView from './views/SummaryView'
import JukeboxHome from './views/Jukebox/JukeboxHome'

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Jukebox: {
      screen: JukeboxHome
    },
    SongsList: {
      screen: SongsList
    },
    SummaryView: {
      screen: SummaryView
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