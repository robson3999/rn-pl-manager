import React from 'react';
import { Root } from 'native-base'
import { StackNavigator } from 'react-navigation'
import HomeScreen from './views/HomeScreen'
import MainView from './views/MainView'
import DetailView from './views/DetailView'

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    MainView: {
      screen: MainView
    },
    DetailView: {
      screen: DetailView
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