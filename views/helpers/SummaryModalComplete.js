import React from 'react'
import { View } from 'react-native'
import { Spinner, Text, Button } from 'native-base'

export default class SummaryModalComplete extends React.Component {
    navigateToHome(){
        this.props.onNavigateToHomescreen()
    }
    render() {
        return (
            <View >
                <Text>Twoja piosenka zostały przesłana.</Text>
                <Button rounded style={{ backgroundColor: "#49a7cc", alignSelf: 'center', marginTop: 20 }} onPress={() => this.navigateToHome()}>
                    <Text>Powrót</Text>
                </Button>
            </View>
        )
    }
}