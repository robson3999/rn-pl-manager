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
   componentDidMount(){
    //    setTimeout(()=>{
    //        this.props.navigation.navigate('SongsList')
    //    }, 300)
   } 
    render() {
        return (
            <ImageBackground
                source={require('../assets/bg.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <Header style={styles.headerBackground} androidStatusBarColor={"#000"}>
                        <Title>Menu</Title>
                </Header>
                <ScrollView>
                    <View style={{justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=> console.log('aaa')}>
                                <Image
                                    source={require('../assets/top_menu/jukebox_tile.png')}
                                   resizeMode="contain"
                                style={{ width: 350, height: 350 }}
                                    >
                                </Image>
                            </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={require('../assets/top_menu/drinks_tile.png')}
                                resizeMode="contain"
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/top_menu/drinks_tile.png')}
                                resizeMode="contain"
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
            // < View style = { styles.tileRow } >
            //     <TouchableOpacity onPress={() => console.log('Menu pressed')} style={[styles.button, { backgroundColor: '#F57C00' }]}>
            //         <Text style={styles.buttonText}>Menu</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity onPress={() => console.log('Event pressed')} style={[styles.button, { backgroundColor: '#F57C00' }]}><Text style={styles.buttonText}>Eventy</Text></TouchableOpacity>
            //             </View >
            // <View style={styles.tileRow}>
            //     <TouchableOpacity onPress={() => console.log('Promocje pressed')} style={[styles.downButton, { backgroundColor: '#49a7cc' }]}><Text style={styles.buttonText}>Promocje</Text></TouchableOpacity>
            // </View>
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