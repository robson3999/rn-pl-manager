import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button } from 'native-base';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        header: null
    }
   componentDidMount(){
    //    setTimeout(()=>{
    //        this.props.navigation.navigate('SongsList')
    //    }, 300)
   } 
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.upperButtons}>
                <View style={styles.tileRow}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Jukebox')} style={[styles.button, { backgroundColor: '#49a7cc'}]}>
                    <Text style={styles.buttonText}>Jukebox</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => console.log('Menu pressed')} style={[styles.button, { backgroundColor: '#F57C00', marginLeft: 0 }]}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Event pressed')} style={[styles.button, { backgroundColor: '#F57C00', marginLeft: 0  }]}><Text style={styles.buttonText}>Eventy</Text></TouchableOpacity>
                </View>
            </View>
                <View style={styles.tileRow}>
                    <TouchableOpacity onPress={() => console.log('Promocje pressed')} style={[styles.downButton, { backgroundColor: '#49a7cc' }]}><Text style={styles.buttonText}>Promocje</Text></TouchableOpacity>
                </View>
            </View>
        )
        // <View center style={styles.content}>
        //         <Image source={require('../assets/Jukebox.png')} />
        // </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileRow: {
        flexDirection: 'row',
        // width: '50%',
        flex: 1,
        height: '100%',
        margin: 10
        // flexWrap: 'wrap'
    },
    upperButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: 10,
        flex: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5
    },
    downButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        margin: 10,
        flex: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5
    },
    buttonText: {
        fontSize: 21,
        color: 'white'
    }
})