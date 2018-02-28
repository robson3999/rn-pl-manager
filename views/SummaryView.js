import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { Container, Header, Content, Left, Body, List, ListItem, Text, Title, Button, H1, Card, CardItem, Icon } from 'native-base';
import SortableListView from 'react-native-sortable-listview'


let order, songs
export default class SummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenSongs: props.navigation.state.params,
            overallCost: null
        }
        songs = this.state.choosenSongs
        order = Object.keys(this.state.choosenSongs)
        this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this)
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        this.setState({
            overallCost: this.state.choosenSongs.length
        })
        
        console.log(this.state)
        console.log(this.props)
    }
    removeSongFromPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        actualPlaylist = actualPlaylist.filter((item) => {
            return item.id !== song.id
        })
        this.setState({
            choosenSongs: actualPlaylist,
        })
        songs = this.state.choosenSongs
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
                    renderRow={ row => <RowComponent data={row} /> }
                    />
                </View>
                <View style={styles.bottomList}>
                    <View style={styles.bottomHeaderBar}>
                        <View style={styles.bottomHeaderItem}>
                            <Button transparent><Icon style={styles.footerText} name="ios-cash-outline" /><Text style={styles.footerText}>Suma: {this.state.overallCost} PLN</Text></Button>
                        </View>
                        <View style={styles.bottomHeaderItem}>
                            <Button transparent><Text style={styles.footerText}>Zapłać </Text><Icon style={styles.footerText} name="arrow-forward" /></Button>
                        </View>
                    </View>
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
    
    handleDeletingSong(e){
        this.props.onRemoveRequest(e)
        this.forceUpdate()        
    }
    render(){
        const song = this.props.data
        return (
            <ListItem style={styles.listItem}>
            <TouchableHighlight
                underlayColor={'#eee'}
                    style={{
                        padding: 20,
                        // backgroundColor: '#F8F8F8',
                        borderBottomWidth: 1,
                        borderColor: '#eee',
                    }}
                {...this.props.sortHandlers}
                >
                <Text>{song.author} - {song.title}</Text>
                </TouchableHighlight>
            </ListItem>
            )
        }
    }
    // <Button light onPress={()=>this.handleDeletingSong(song)}>
    //     <Icon name="ios-trash" />
    // </Button>
    
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
    bottomList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F5F5F5',
        maxHeight: 50
    },
    bottomHeaderBar: {
        backgroundColor: 'powderblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomHeaderItem: {
        // padding: 10
    },
    footerText:{ 
        color: 'black'
    }
})