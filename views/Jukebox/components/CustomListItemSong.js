import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { showAlreadyAddedSong } from '../../helpers/Toasts';
import { jukeboxCustomItemStyles } from '../../helpers/styles';

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
                <TouchableOpacity onPress={() => showAlreadyAddedSong()} style={[jukeboxCustomItemStyles.listItem, { backgroundColor: "#fff" }]}>
                    <View style={jukeboxCustomItemStyles.cardAligment}>
                        <Text style={[jukeboxCustomItemStyles.itemTitle, { color:'#b8bec6' }]}>{this.state.item.props.title}</Text>
                        <Text style={[jukeboxCustomItemStyles.itemPrice, { color:'#b8bec6' }]}>PLN 0,99</Text>
                    </View>
                    <View renderToHardwareTextureAndroid={true}>
                        <Text style={[jukeboxCustomItemStyles.itemAuthor, { color:'#b8bec6' }]}>{this.state.item.props.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.onTapEmmited(true, this.props)} style={[jukeboxCustomItemStyles.listItem, { backgroundColor: "#B53694" }]}>
                    <View style={jukeboxCustomItemStyles.cardAligment}>
                        <Text style={jukeboxCustomItemStyles.itemTitle}>{this.state.item.props.title}</Text>
                        <Text style={jukeboxCustomItemStyles.itemPrice}>PLN 0,99</Text>
                    </View>
                    <View renderToHardwareTextureAndroid={true}>
                        <Text style={jukeboxCustomItemStyles.itemAuthor}>{this.state.item.props.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}