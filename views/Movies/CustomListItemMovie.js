import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';
import { showMovieAlreadyAdded } from '../helpers/Toasts';

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
            <Card key={this.state.item.props.id} style={[styles.listItem]}>
                <CardItem button onPress={() => this.onTapEmmited(true, this.props)} style={styles.cardItem}>
                    <Left>
                        <Thumbnail large square source={{ uri: 'https://ia.media-imdb.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg' }}></Thumbnail>
                        <Body>
                            <Text style={styles.itemTitle}>{this.state.item.props.title}</Text>
                            <Text style={styles.secondaryText}>Phasellus pellentesque massa nisi, ut venenatis nulla rhoncus sed...</Text>
                        </Body>
                    </Left>
                    <Text style={styles.priceText}>PLN 9,99</Text>
                </CardItem>
            </Card>
        )
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
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#B53694'
    },
    cardItem: { 
        backgroundColor: '#B53694',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    itemTitle: { 
        color: '#FAE2EE',
        fontSize: 20,
        fontWeight: 'bold'
    },
    secondaryText: {
        width: '80%',
        color: '#FAE2EE'
    },
    priceText: { 
        color: '#FAE2EE',
        fontWeight: 'bold',
        fontSize: 18
    }
})