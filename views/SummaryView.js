import React from 'react'
import { StyleSheet, View, TouchableHighlight, Modal } from 'react-native'
import { Container, Header, Content, Left, Body, List, ListItem, Spinner, Text, Title, Button, H1, Card, CardItem, Icon, Toast } from 'native-base';
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
    }
    removeSongFromPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        actualPlaylist = actualPlaylist.filter((item) => {
            return item.id !== song.id
        })
        this.setState((previousState) => {
            return {
                choosenSongs: actualPlaylist,
                overallCost: --previousState.overallCost
            }
        })
    }

    setModalVisibility(visibility){
        this.setState({modalVisible: visibility})
    }

    render() {
        // TODO: divide to smaller components => Modal
        return (
            <Container style={styles.container}>
                <Header style={styles.headerBar} androidStatusBarColor={"#49a7cc"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MainView', this.state.choosenSongs)}>
                            <Icon style={{ color: 'black' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', fontFamily: 'MuktaMalar' }}>Podsumowanie</Title>
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
                      }}
                        <Text style={{ color: "#49a7cc"}}>Anuluj</Text>
                    </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
                <Text style={styles.queueInfo}>Jesteś 1 w kolejce</Text>
                <View style={{flex: 1}}>
                    <SortableListView
                    style={{ flex: 1, marginBottom: 0 }}
                    data={this.state.choosenSongs}
                    order={order}
                    onRowMoved={e => {
                        order.splice(e.to, 0, order.splice(e.from, 1)[0]);
                        this.forceUpdate();
                        }}
                    renderRow={ row => <RowComponent data={row} onRemoveRequest={(song) => this.removeSongFromPlaylist(song)} /> }
                    />
                </View>
                <View style={styles.placeholder}></View>
                <View style={styles.bottomList}>
                    <View style={styles.bottomHeaderBar}>
                        <View style={styles.bottomHeaderItem}>
                            <Button transparent><Text style={styles.footerText}><Icon style={styles.footerText} name="ios-cash-outline" />  Suma: {this.state.overallCost} PLN</Text></Button>
                        </View>
                        <View style={styles.bottomHeaderItem}>
                            <Button onPress={() => this.setModalVisibility(true)} transparent><Text style={styles.footerText}>Zapłać <Icon style={styles.footerText} name="arrow-forward" /></Text></Button>
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
        Toast.show({
            text: 'Usunięto piosenkę',
            position: 'bottom',
            buttonText: 'OK',
        })
    }

    render(){
        const song = this.props.data
        if (song){
            return (
                <ListItem style={styles.listItem}>
                    <TouchableHighlight
                        underlayColor={'#eee'}
                        style={{
                            padding: 10,
                            borderColor: '#eee',
                        }}
                        {...this.props.sortHandlers}
                    >
                        <Icon name="md-menu" />
                    </TouchableHighlight>
                    <Text style={{ width: '75%', fontFamily: 'MuktaMalar' }}>{song.author} - {song.title}</Text>
                    <Button transparent onPress={() => this.handleDeletingSong(song)}>
                        <Icon style={{ color: 'black' }} name="md-trash" />
                    </Button>
                </ListItem>
            )
        } else { //filthy workaround o.o
            return (
                <View></View>
            )
        }
        }
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    headerBar: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    queueInfo: {
        color: 'black',
        backgroundColor: '#eff8fc',
        padding: 10,
        fontFamily: 'MuktaMalar',
    },
    listItem: {
        justifyContent: 'space-between',
        padding: 10,
        marginLeft: 0
    },
    bottomList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        maxHeight: 70,
        borderTopColor: '#efefef',
        borderTopWidth: 1
    },
    placeholder: {
        height: 50
    },
    bottomHeaderBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomHeaderItem: {
    },
    footerText: {
        // height: 70,
        color: 'black',
        paddingTop: 10,
        fontSize: 18,
        fontFamily: 'MuktaMalar',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})
