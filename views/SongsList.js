import React from 'react';
import { StyleSheet, SectionList, TouchableHighlight, View, ScrollView, FlatList, NetInfo, Modal, TouchableOpacity } from 'react-native'
import {
        Container,
        Header,
        Body,
        ListItem,
        Title,
        Item,
        Icon,
        Text,
        Input,
        Content,
        Button,
        Spinner,
        Toast,
        Right,
        Left
     } from 'native-base';

import DownloadingView from './helpers/DownloadingView'
import NoInternetView from './helpers/NoInternetView'

let songs
let errorMessage = null
var SONGS

export default class SongsList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            searchText: null,
            songsList: [],
            filteredSongs: [],
            showToast: false,
            modalVisible: false
        }
    }

    async makeApiCall(){
        url = 'https://my-json-server.typicode.com/robson3999/songs-db/genres'
        // let url = 'http://192.168.1.101:8080/genre/list'
        await fetch(url)
            .then(response => {
                response.ok ? response.json().then(resp => songs = resp) : this.setState({ isLoading: false, noInternet: true })
            })
            .catch(err => {
                console.log(err)
                this.setState({ noInternet: true })
            })
    }

    async forceUpdateHandler(){
        await this.makeApiCall()
        this.setStateToStart()
        this.checkConnectionInfo()
    }

    async componentDidMount(){
        songs = []
        let passedData = this.props.navigation.state.params
        await this.makeApiCall()
        if (passedData){
            if (passedData.length > 0){
                let overallCost = passedData.length
                // let calculatedHeight = overallCost*50+100
                let calculatedHeight = 50
                this.setState({
                    isLoading: false,
                    songsList: songs,
                    filteredSongs: songs,
                    choosenSongs: passedData,
                    customHeight: calculatedHeight,
                    overallCost: overallCost
                })
            } else {
                this.setStateToStart()
            }
        } else {
            this.setStateToStart()
        }
        // this.checkConnectionInfo()
    }

    setStateToStart(){
        this.setState({
            isLoading: false,
            songsList: songs,
            filteredSongs: songs,
            choosenSongs: [],
            customHeight: 50,
            overallCost: 0
        })
    }

    checkConnectionInfo(){
        NetInfo.isConnected.fetch().then(isOnline => {
            isOnline ? this.setState({ noInternet: false }) : this.setState({ noInternet: true })
        })
    }

    static navigationOptions = {
        header: null
    }


    _keyExtractor = (item, index) => item.id

    setSearchText(event){
        let searchText = event.nativeEvent.text
        let songs = this.state.songsList
        text = searchText.trim().toLowerCase()
        let newFilteredSongs = songs.map(genre => {
           return genre
        }).map(data => {
            return {
                title: data.title,
                data: data.data.filter(item => {
                      return (item.title.toLowerCase().match(text) || item.author.toLowerCase().match(text))
                      })
            }
        })
        this.setState({
            filteredSongs: newFilteredSongs
        })
    }

    addSongToPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        if((actualPlaylist.filter(item => item.id !== song.id).length) == actualPlaylist.length){
            this.setState((prevState) => {
                return {
                    choosenSongs: [...this.state.choosenSongs, song],
                    overallCost: ++prevState.overallCost,
                    filteredSongs: prevState.songsList
                }
            })
            this.refs.searchFieldRef.setNativeProps({text: ''})
            Toast.show({
                text: `Dodano piosenkę: ${song.title}`,
                position: 'bottom',
                buttonText: 'OK',
            })
        } else {
            Toast.show({
                text: 'Już dodano tą piosenkę',
                position: 'bottom',
                buttonText: 'OK',
            })
        }
    }

    removeSongFromPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        actualPlaylist = actualPlaylist.filter((item) => {
            return item.id !== song.id
        })
        this.setState((prevState) => {
            return {
                choosenSongs: actualPlaylist,
                overallCost: --prevState.overallCost
            }
        })
        Toast.show({
            text: 'Usunięto piosenkę',
            position: 'bottom',
            buttonText: 'OK',
        })
    }

    setModalVisible(modalState){
        this.setState({modalVisible: modalState})
    }

    // TODO: simplify render function (divide to smaller components)
    render() {
        if (this.state.isLoading){
            return <DownloadingView />
        } else {
            if(this.state.noInternet){
                return <NoInternetView onTryReconnectRequest={() => this.forceUpdateHandler()} />
            } else {
            return (
                <Container style={styles.container}>
                    <Header searchBar rounded style={styles.headerBar} androidStatusBarColor={"#49a7cc"}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Szukaj"
                            ref="searchFieldRef"
                            value={this.state.searchText}
                            onChange={this.setSearchText.bind(this)}
                        />
                    </Item>
                    <Right>
                    { this.state.choosenSongs.length > 0 &&
                                <Button style={ styles.proceedButton } transparent onPress={() => this.props.navigation.navigate('SummaryView', this.state.choosenSongs)}>
                                    <Text style={{ paddingTop: 7 }}>Dalej</Text><Icon style={{color: 'black'}} name="arrow-forward" />
                                </Button>
                    }
                    </Right>
                    </Header>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <SectionList
                                    sections={ this.state.filteredSongs }
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.addSongToPlaylist(item)} style={styles.listItem}>
                            <View>
                                <Text style={styles.item}>{item.author} - {item.title}</Text>
                                <Button  transparent style={styles.addButton}>
                                <Icon style={{ color: 'black' }} name='ios-star' />
                                </Button>
                            </View>
                            </TouchableOpacity>
                            }
                            keyExtractor={this._keyExtractor}
                            renderSectionHeader={({section}) => 
                                <View style={styles.sectionHeader}>
                                    <Icon name="ios-musical-notes" />
                                    <Text style={styles.sectionHeaderText}>{section.title[0].toUpperCase() + section.title.slice(1)}</Text>
                                </View>
                            }
                            />
                        </ScrollView>
                        <View style={[styles.placeholder ,{height: this.state.customHeight}]}></View>
                        <View style={[styles.bottomList, { height: this.state.customHeight }]}>
                            <View style={styles.bottomHeaderBar}>
                                <View style={styles.bottomHeaderItemOne}>
                                { this.state.choosenSongs.length > 0 &&
                                    <Button transparent dark 
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                    }}>
                                        <Icon style={{ marginRight: -5 }} name="md-star" /> 
                                    <Text>Ulubione</Text></Button>
                                    }
                                </View>
                                <View style={styles.bottomHeaderItemTwo}>
                                    <Icon style={{ marginRight: 10 }} name="ios-cash-outline" />  
                                    <Text>
                                        {this.state.overallCost} PLN
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}
                            >
                            <View style={styles.modal}>
                                <Header style={styles.headerBar} androidStatusBarColor={"#49a7cc"}>
                                    <Left>
                                        <Button transparent onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                            <Icon style={{ color: 'black' }} name='md-close' />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title>
                                            <Text>Twoja playlista</Text>
                                        </Title>
                                    </Body>
                                </Header>
                                <ScrollView>
                                <FlatList
                                data={this.state.choosenSongs}
                                    renderItem={({ item }) =>
                                    <ListItem style={styles.listItem}>
                                        <Text style={styles.item}>{item.author} - {item.title}</Text>
                                        <Button transparent style={styles.addButton} onPress={() => this.removeSongFromPlaylist(item)}>
                                        <Icon style={{ color: 'black' }} name="md-trash"/>
                                        </Button>
                                    </ListItem>
                                    }
                                    keyExtractor={this._keyExtractor}
                                />
                                </ScrollView>
                            </View>
                        </Modal>
                        </View>
                        </Container>
                    );
            }
        }
    }
 }

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#eff8fc'
    },
    headerBar: {
        backgroundColor: 'white',
        // justifyContent: 'space-between'
    },
    bottomHeaderBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#BDBDBD',
        borderTopWidth: 1
    },
    proceedButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeaderText: {
        fontSize: 22,
        padding: 10,
    },
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
        backgroundColor: 'white',
        borderRadius: 20,
        borderLeftWidth: 7,
        borderColor: '#49a7cc',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 2
    },
    item: {
        maxWidth: '80%',
        fontSize: 16
    },
    bottomHeaderItemOne: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bottomHeaderItemTwo: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bottomList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        maxHeight: 200,
        borderTopColor: '#efefef',
        borderTopWidth: 1,
    },
    placeholder: {
        maxHeight: 200
    },
    modal: {
        backgroundColor: '#fff',
        height: '93%'
    }
});
