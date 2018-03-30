import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity, ImageBackground, TouchableHighlight, ScrollView } from 'react-native'
import { Container, Content, Text, Button, Left, Icon, Body, Title, Header } from 'native-base';

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
                <Header style={styles.headerBackground} androidStatusBarColor={"#000"}>
                        <Title>Menu</Title>
                </Header>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} renderToHardwareTextureAndroid={true}>
                        <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Jukebox')}>
                                <Image
                                    source={require('../assets/top_menu/jukebox_tile.png')}
                                    resizeMode="contain"
                                    style={{ maxWidth: 350, maxHeight: 350 }}
                                    >
                                </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', maxHeight: 180 }}>
                            <Image source={require('../assets/top_menu/drinks_tile.png')}
                                resizeMode="contain"
                                style={{ maxWidth: 150, maxHeight: 150, margin: 20 }}
                            >
                            </Image>
                            <Image source={require('../assets/top_menu/events_tile.png')}
                                resizeMode="contain"
                                style={{ maxWidth: 150, maxHeight: 150, margin: 20 }}
                            >
                            </Image>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', maxHeight: 180}}>
                            <Image source={require('../assets/top_menu/offers_tile.png')}
                              resizeMode="contain"
                              style={{ maxWidth: 150, maxHeight: 150, margin: 20 }}
                            >
                            </Image>
                    </View>
                    </View>                    
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tileRow: {
        margin: 10,
        flex: 1
    },
    button: {
        flex: 1,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'black'
    },
    buttonText: {
        fontSize: 21,
        color: 'white'
    }
})