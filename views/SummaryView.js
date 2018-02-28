import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { Container, Header, Content, Left, Body, List, ListItem, Text, Title, Button, H1, Card, CardItem, Icon } from 'native-base';
import SortableListView from 'react-native-sortable-listview'


let order, songs
export default class SummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenSongs: props.navigation.state.params
        }
        songs = props.navigation.state.params
        order = Object.keys(props.navigation.state.params)
        this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this)
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        console.log(this.state)
        console.log(this.props)
    }
    removeSongFromPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        // let actualCost = this.state.overallCost
        // actualCost--
        actualPlaylist = actualPlaylist.filter((item) => {
            return item.id !== song.id
        })
        this.setState({
            choosenSongs: actualPlaylist,
            // overallCost: actualCost
        })
        console.log(this.state.choosenSongs)
    }

    render() {
        console.log(songs)
        return (
            <Container>
                <Header style={styles.headerBar} androidStatusBarColor={"powderblue"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MainView')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Podsumowanie</Title>
                    </Body>
                </Header>
                <View style={{flex: 1}}>
                    <SortableListView
                    style={{ flex: 1, marginBottom: 0 }}
                    data={songs}
                    order={order}
                    onRowMoved={e => {
                        console.log(order)
                        order.splice(e.to, 0, order.splice(e.from, 1)[0]);
                        this.forceUpdate();
                        }}
                    renderRow={ row => <RowComponent data={row} onRemoveRequest={() => this.removeSongFromPlaylist(row) } /> }
                    />
                </View>
            </Container>
        )
    }
}

class RowComponent extends React.Component {
    constructor(props){
        super(props)
        this.handleDeletingSong = this.handleDeletingSong.bind(this)
    }
    
    handleDeletingSong(){
        this.props.onRemoveRequest()
    }
    render(){
        return (
            <ListItem style={styles.listItem}>
                <TouchableHighlight
                    underlayColor={'#eee'}
                    style={{
                        padding: 25,
                        backgroundColor: '#F8F8F8',
                        borderBottomWidth: 1,
                        borderColor: '#eee',
                    }}
                {...this.props.sortHandlers}
                >
                <Text>{this.props.data.author} - {this.props.data.title}</Text>
                </TouchableHighlight>
                <Button light onPress={this.handleDeletingSong}>
                    <Icon name="ios-trash" />
                </Button>
            </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    headerBar: {
        backgroundColor: 'powderblue',
        justifyContent: 'space-between'
    },
    listItem: {
        justifyContent: 'space-between'
    },
})