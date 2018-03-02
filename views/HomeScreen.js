import React from 'react'
import { StyleSheet, Image, View, TouchableHighlight } from 'react-native'
import { Container, Content, Text } from 'native-base';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        header: null
    }
   componentDidMount(){
       setTimeout(()=>{
           this.props.navigation.navigate('MainView')
       }, 300)
   } 
    render() {
        return (
                <View center style={styles.content}>
                        <Image source={require('../assets/Jukebox.png')} />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'   
    },
    button: {
        color: 'black'
    }
})