import React from 'react'
import { StyleSheet, View, TouchableHighlight, Modal, Alert } from 'react-native'
import { Container, Header, Content, Left, Body, List, ListItem, Spinner, Text, Title, Button, H1, Card, CardItem, Icon, Toast } from 'native-base';
import SortableListView from 'react-native-sortable-listview'
import SummaryModalLoading from './helpers/SummaryModalLoading'
import SummaryModalComplete from './helpers/SummaryModalComplete'


export default class SummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenSongs: this.props.navigation.state.params,
            overallCost: null,
            modalVisible: false,
            modalComplete: false
        }
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
        // playlist upload 
        // song.yid instead song.id (not working with fake backend)
        let playList = this.state.choosenSongs.map((song) => song.id)
        console.log(playList)
        let url = 'https://my-json-server.typicode.com/robson3999/songs-db/playlists'
        // let url = 'http://192.168.1.101:8080/musicfile/add?ids='+ playList.toString()
        fetch(url, {
            method: 'GET'
        })
        .then((resp) => {
            // if(resp.status == 200 && resp.ok){
                console.log("Wyslano:")
                // console.log(JSON.parse(playList))
                this.setState({modalComplete: true})
            // }
            console.log(resp)
        })
        .catch(err => console.log(err))
    }
    

    navigateToHomeScreen(){
        this.setState({ modalVisible: false })
        this.props.navigation.navigate('SongsList')
    }

    reorderChoosenSongs(e){
        let songs = this.state.choosenSongs
        return songs.splice(e.to, 0, songs.splice(e.from, 1)[0]);
    }

    render() {
        // TODO: divide to smaller components => Modal
        return (
            <Container style={styles.container}>
                <Header style={styles.headerBar} androidStatusBarColor={"#49a7cc"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('SongsList', this.state.choosenSongs)}>
                            <Icon style={{ color: 'black' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black' }}>Podsumowanie</Title>
                    </Body>
                </Header>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisibility(false)
                  }}>
                    <View style={styles.modal}>
                        { this.state.modalComplete &&
                            <SummaryModalComplete onNavigateToHomescreen={() => this.navigateToHomeScreen()} />
                        }
                        { !this.state.modalComplete &&
                            <SummaryModalLoading />
                        }
                  </View>
                </Modal>
                <View style={{flex: 1}}>
                    <SortableListView
                    style={{ flex: 1, marginBottom: 0 }}
                    data={this.state.choosenSongs}
                    onRowMoved={e => {
                        this.reorderChoosenSongs(e)
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
                            {this.state.choosenSongs.length > 0 &&                        
                                <Button onPress={() => this.setModalVisibility(true)} transparent><Text style={styles.footerText}>Zapłać <Icon style={styles.footerText} name="arrow-forward" /></Text></Button>
                            }
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

    handleDeletingSong(song){
        this.props.onRemoveRequest(song)
        Toast.show({
            text: `Usunięto ${song.title}`,
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
                    <Text style={{ width: '75%' }}>{song.author} - {song.title}</Text>
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
    footerText: {
        color: 'black',
        padding: 10,
        fontSize: 16
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})
