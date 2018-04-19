import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { showAlreadyAddedSong } from '../../helpers/Toasts'

const textColor = '#FAE2EE'

export default class CustomListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props
        }
    }
    onTapEmmited() {
        this.props.onTapEmmited()
    }
    render() {
        if (this.state.item.props.isSent) {
            return (
                <TouchableOpacity onPress={() => showAlreadyAddedSong()} style={[styles.listItem, { backgroundColor: "#fff" }]}>
                    <View style={styles.cardAligment}>
                        <Text style={styles.itemTitle}>{this.state.item.props.title}</Text>
                        <Text style={styles.itemPrice}>PLN 0,99</Text>
                    </View>
                    <View renderToHardwareTextureAndroid={true}>
                        <Text style={{ color: textColor }}>{this.state.item.props.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.onTapEmmited(true, this.props)} style={[styles.listItem, { backgroundColor: "#B53694" }]}>
                    <View style={styles.cardAligment}>
                        <Text style={styles.itemTitle}>{this.state.item.props.title}</Text>
                        <Text style={styles.itemPrice}>PLN 0,99</Text>
                    </View>
                    <View renderToHardwareTextureAndroid={true}>
                        <Text style={{ color: textColor }}>{this.state.item.props.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        elevation: 2,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 0
    },
    cardAligment: { 
        justifyContent: 'space-between', 
        width: '100%', 
        flexDirection: 'row' 
    },
    itemTitle: { 
        color: textColor, 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    itemPrice: { 
        color: textColor, 
        marginRight: 10, 
        fontWeight: 'bold', 
        fontSize: 20 
    },
})