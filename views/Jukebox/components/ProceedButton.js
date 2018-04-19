import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
export default class ProceedButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props
    }

    goBackRequest() {
        this.props.onBackRequest()
    }
    goNavigateRequest() {
        this.props.onNavigateRequest()
    }

    render() {
        if (this.state.props == 'jukebox') {
            return (
                <TouchableOpacity
                    style={styles.orderSongButton}
                    onPress={
                        () => this.goBackRequest()
                    }>
                    <Icon name="md-play" style={styles.iconPlay} />
                    <Text style={styles.orderSongText}>
                        Zamów piosenkę
                        </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={styles.orderSongButton}
                    onPress={
                        () => this.goNavigateRequest()
                    }>
                    <Icon name="md-play" style={styles.iconPlay} />
                    <Text style={styles.orderSongText}>
                        Zamów piosenkę
                    </Text>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    orderSongButton: {
        backgroundColor: '#B53694',
        flexDirection: 'row',
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
    },
    iconPlay: { 
        color: '#fff',
        fontSize: 42,
        marginRight: 10
    },
    orderSongText: { 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: '#fff' 
    }
})