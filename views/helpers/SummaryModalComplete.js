import React from 'react'
import { View } from 'react-native'
import { Spinner, Text, Button } from 'native-base'
import * as Progress from 'react-native-progress'


export default class SummaryModalComplete extends React.Component {
    navigateToHome(){
        this.props.onNavigateToHomescreen()
    }
    componentDidMount(){
        setTimeout(() => {
            this.navigateToHome()
        }, 1000)
        
    }
    render() {
        return (
            <View>
                <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>Twoja piosenka została przesłana.</Text>
                <Progress.Bar
                    indeterminate={true}
                    width={null}
                    height={8}
                    color="#EE3587"
                    borderRadius={4}
                    borderWidth={0}
                    unfilledColor="#000"
                />
            </View>
        )
    }
}