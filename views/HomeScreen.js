import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Container, Content, Button, Text, Thumbnail } from 'native-base';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            // <Container style={styles.container}>
                <View center style={styles.content}>
                    <Image style={styles.image} source={require('../assets/Jukebox.png')} />
                    <Button success full rounded onPress={()=> this.props.navigation.navigate('MainView')}><Text style={styles.button}>Choose song</Text></Button>
                </View>
            // </Container>
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
    },
    image: {
    }
})