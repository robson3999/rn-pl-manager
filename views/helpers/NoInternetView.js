import React from 'react'
import { Container, Text } from 'native-base'
import { View } from 'react-native'
export default class NoInternetView extends React.Component {
    render () {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View><Text>Wygląda na to, że nie masz połączenia z internetem :(</Text></View>
            </Container>
        )
    }
}