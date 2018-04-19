import React from 'react'
import { Image, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { Content, Text, Title, Header } from 'native-base';
import { homeScreenStyles } from './helpers/styles'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <ImageBackground
                renderToHardwareTextureAndroid={true}
                source={require('../assets/bg_improved.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <Header style={homeScreenStyles.headerBackground} androidStatusBarColor={"#000"}>
                        <Title>Menu</Title>
                </Header>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} renderToHardwareTextureAndroid={true}>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Jukebox')}>
                                    <Image
                                        source={require('../assets/top_menu/jukebox_tile.png')}
                                        resizeMode="contain"
                                        style={homeScreenStyles.mainTile}
                                        >
                                    </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={homeScreenStyles.tilesRow}>
                            <Image source={require('../assets/top_menu/drinks_tile.png')}
                                resizeMode="contain"
                                style={homeScreenStyles.smallTile}
                            >
                            </Image>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MoviesHome')}>
                                <Image source={require('../assets/top_menu/movies.png')}
                                    resizeMode="contain"
                                    style={homeScreenStyles.smallTile}
                                >
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={[homeScreenStyles.tilesRow, { marginBottom: 20}]}>
                            <Image source={require('../assets/top_menu/events_tile.png')}
                                resizeMode="contain"
                                style={homeScreenStyles.smallTile}
                            >
                            </Image>
                            <Image source={require('../assets/top_menu/offers_tile.png')}
                            resizeMode="contain"
                            style={homeScreenStyles.smallTile}
                            >
                            </Image>
                        </View>
                    </View>                    
                </ScrollView>
            </ImageBackground>
        )
    }
}