import React from 'react';
import { Text, View } from 'react-native'
import { Container, Spinner } from 'native-base'

export default class DownloadingView extends React.Component {
    render(){
        return (
           
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                   <Text>Pobieranie piosenek...</Text>
                    <Spinner color='powderblue' />
                </View>
            
        )
    }
}

