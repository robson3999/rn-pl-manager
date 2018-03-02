import React from 'react';
import { Text, View } from 'react-native'
import { Container, Spinner } from 'native-base'

export default class DownloadingView extends React.Component {
    render(){
        console.log('elo')
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                   <Text>Pobieranie piosenek...</Text>
                    <Spinner color='powderblue' />
                </View>
            </Container>
        )
    }
}

