import React from 'react'
import { Container, Text, Button } from 'native-base'
import { View, StyleSheet } from 'react-native'
export default class NoInternetView extends React.Component {
    tryReconnect(){
        this.props.onTryReconnectRequest()
    }

    render () {
        return (
            <Container style={styles.container}>
            <Text style={{ textAlign: 'center'}}>Wygląda na to, że nie masz połączenia z internetem:(</Text>
            <View style={{marginTop: 20}}>
                    <Button rounded style={{ backgroundColor: '#49a7cc' }} onPress={() => this.tryReconnect()}>
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