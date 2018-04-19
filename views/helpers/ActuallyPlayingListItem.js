import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'native-base';
import { activityHomeStyles } from  './styles'
export default class MoviesListItem extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.props.item.musicFile
    }
    render() {
        return (
            <ListItem style={activityHomeStyles.listItem}>
                <View style={{ flex: 1 }}>
                    <Text style={activityHomeStyles.listItemTitle}>{this.state.title}</Text>
                </View>
                <View style={activityHomeStyles.listItemAuthorContainer}>
                    <Text style={activityHomeStyles.listItemAuthor}>{this.state.author}</Text>
                </View>
                <View style={activityHomeStyles.bottomBlurredBorder}></View>
            </ListItem>
        )
    }
}