import React from 'react'
import { View } from 'react-native'
import { Spinner, Text } from 'native-base'

export default class SummaryModalLoading extends React.Component {
    render() {
        return (
            <View>
                <Text>Sfinalizuj transakcję...</Text>
                <Spinner color="#49a7cc" />
            </View>
        )
    }
}