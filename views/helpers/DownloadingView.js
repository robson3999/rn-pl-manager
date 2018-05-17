import React from 'react';
import { Text, View, ImageBackground } from 'react-native'
import { Spinner } from 'native-base'

export default class DownloadingView extends React.Component {
    render(){
        return (
        	<ImageBackground
                renderToHardwareTextureAndroid={true}
                source={require('../../assets/bg_improved.png')}
                style={{ width: '100%', height: '100%' }}
                >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                   <Text style={{ color: '#fff' }}>Pobieranie piosenek...</Text>
                    <Spinner color='powderblue' />
                </View>
            </ImageBackground>
        )
    }
}

