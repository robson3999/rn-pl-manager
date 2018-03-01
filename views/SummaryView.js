import React from 'react'
import { StyleSheet, View, TouchableHighlight, Modal } from 'react-native'
import { Container, Header, Content, Left, Body, List, ListItem, Spinner, Text, Title, Button, H1, Card, CardItem, Icon } from 'native-base';
import SortableListView from 'react-native-sortable-listview'


let order, songs
export default class SummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenSongs: props.navigation.state.params,
            overallCost: null,
            modalVisible: false
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

    setModalVisibility(visibility){
        this.setState({modalVisible: visibility})
    }

    render() {
        
        console.log(songs)
        return (
            <Container>
                <Header style={styles.headerBar} androidStatusBarColor={"#49a7cc"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MainView')}>
                            <Icon style={{ color: 'black' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color: 'black'}}>Podsumowanie</Title>
                    </Body>
                </Header>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisibility(false)
                  }}>
                  <View>
                    <View style={styles.modal}>
                    <Text>Sfinalizuj transakcję...</Text>
                    <Spinner color="#49a7cc"/>
                    <TouchableHighlight
                      onPress={() => {
                          this.setModalVisibility(!this.state.modalVisible)
                      }}>
                        <Text style={{ color: "#49a7cc"}}>Anuluj</Text>
                    </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
                <Text style={styles.queueInfo}>Jesteś 1 w kolejce</Text>
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
                <View style={styles.placeholder}></View>
                <View style={styles.bottomList}>
                    <View style={styles.bottomHeaderBar}>
                        <View style={styles.bottomHeaderItem}>
                            <Button transparent><Icon style={styles.footerText} name="ios-cash-outline" /><Text style={styles.footerText}>Suma: {this.state.overallCost} PLN</Text></Button>
                        </View>
                        <View style={styles.bottomHeaderItem}>
                            <Button onPress={() => this.setModalVisibility(true)} transparent><Text style={styles.footerText}>Zapłać </Text><Icon style={styles.footerText} name="arrow-forward" /></Button>
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
                        // backgroundColor: '#6ff9ff',
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
        backgroundColor: '#49a7cc',
        justifyContent: 'space-between',
    },
    queueInfo: {
        color: 'black',
        backgroundColor: '#80d8ff',
        padding: 10
    },
    listItem: {
        justifyContent: 'space-between'
    },
    bottomList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#49a7cc',
        maxHeight: 50
    },
    placeholder: {
        height: 50
    },
    bottomHeaderBar: {
        backgroundColor: '#49a7cc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomHeaderItem: {
        // padding: 10
    },
    footerText: { 
        color: 'black'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})