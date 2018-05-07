import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';
import { showMovieAlreadyAdded } from '../../helpers/Toasts';
import { moviesCustomItemStyles } from '../../helpers/styles';

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
        return (
            <Card key={this.state.item.props.id} style={moviesCustomItemStyles.listItem}>
                <CardItem button onPress={() => this.onTapEmmited(true, this.props)} style={moviesCustomItemStyles.cardItem}>
                    <Left>
                        <Thumbnail large square source={{ uri: 'https://ia.media-imdb.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg' }}></Thumbnail>
                        <Body>
                            <Text style={moviesCustomItemStyles.itemTitle}>{this.state.item.props.title}</Text>
                            <Text style={moviesCustomItemStyles.secondaryText}>Phasellus pellentesque massa nisi, ut venenatis nulla rhoncus sed...</Text>
                        </Body>
                    </Left>
                    <Text style={moviesCustomItemStyles.priceText}>PLN 9,99</Text>
                </CardItem>
            </Card>
        )
    }
}