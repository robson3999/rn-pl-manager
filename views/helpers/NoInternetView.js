import React from 'react'
import { Container, Text, Button } from 'native-base'
import { View, StyleSheet } from 'react-native'
export default class NoInternetView extends React.Component {

    constructor(props){
        super(props)
        this.tryReconnect = this.tryReconnect.bind(this)        
    }

    tryReconnect(e){
        this.props.onTryReconnectRequest(e)
    }

    render () {
        return (
            <Container style={styles.container}>
            <View>
                <Text>Wygląda na to, że nie masz połączenia z internetem :(</Text>
            </View>
            <View style={{marginTop: 20}}>
                <Button rounded info onPress={() => this.tryReconnect()}>
                <Text>Spróbuj ponownie</Text>
                </Button>
            </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1,
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})