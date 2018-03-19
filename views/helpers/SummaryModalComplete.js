import React from 'react'
import { View } from 'react-native'
import { Spinner, Text, Button } from 'native-base'

export default class SummaryModalComplete extends React.Component {
    navigateToHome(){
        this.props.onNavigateToHomescreen()
    }
    render() {
        return (
            <View>
                <Text style={{ textAlign: 'center' }}>Twoja piosenka została przesłana.</Text>
                <Button rounded style={{ backgroundColor: "#B53694", alignSelf: 'center', marginTop: 20, padding: 40 }} onPress={() => this.navigateToHome()}>
                    <Text>Powrót</Text>
                </Button>
            </View>
        )
    }
}