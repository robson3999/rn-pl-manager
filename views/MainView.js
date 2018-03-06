import React from 'react';
import { StyleSheet, SectionList, TouchableHighlight, View, ScrollView, FlatList, NetInfo } from 'react-native'
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
        Right
     } from 'native-base';

import DownloadingView from './helpers/DownloadingView'
import NoInternetView from './helpers/NoInternetView'

let songs
let errorMessage = null

export default class MainView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            searchText: null,
            songsList: [],
            filteredSongs: [],
            showToast: false
        }
    }

    async makeApiCall(){
        await fetch('https://my-json-server.typicode.com/robson3999/songs-db/genres')
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
                let calculatedHeight = overallCost*50+50
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
                    customHeight: prevState.customHeight+50
                }
            })
            Toast.show({
                text: `Dodano piosenkę: ${song.title}`,
                position: 'bottom',
                buttonText: 'OK',
                // type: 'success'
            })
        } else {
            Toast.show({
                text: 'Już dodano tą piosenkę',
                position: 'bottom',
                buttonText: 'OK',
                // type: 'warning'
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
                overallCost: --prevState.overallCost,
                customHeight: prevState.customHeight-50
            }
        })
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
                            value={this.state.searchText}
                            onChange={this.setSearchText.bind(this)}
                        />
                    </Item>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('SummaryView', this.state.choosenSongs)}><Icon style={{color: 'black'}} name="arrow-forward" /></Button>
                    </Right>
                    </Header>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <SectionList
                                    sections={ this.state.filteredSongs }
                            renderItem={({ item }) =>
                            <ListItem style={styles.listItem}>
                            <Text style={styles.item}>{item.author} - {item.title}</Text>
                            <Button  transparent style={styles.addButton} onPress={() => this.addSongToPlaylist(item)}>
                            <Icon style={{ color: 'black' }} name='md-add' />
                            </Button>
                            </ListItem>
                            }
                            keyExtractor={this._keyExtractor}
                            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>}
                            />
                        </ScrollView>
                            <View style={[styles.placeholder ,{height: this.state.customHeight}]}></View>
                            <View style={[styles.bottomList, { height: this.state.customHeight }]}>
                                <View style={styles.bottomHeaderBar}>
                                    <View style={styles.bottomHeaderItem}>
                                            <Icon style={styles.bottomHeaderText} name="md-musical-notes" />
                                    </View>
                                    <View style={styles.bottomHeaderItem}>
                                            <Text style={styles.bottomHeaderText}>
                                                <Icon style={styles.bottomHeaderText} name="ios-cash-outline" />  {this.state.overallCost} PLN
                                            </Text>
                                    </View>
                                </View>
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
                    </View>
                </Container>
            );
            }
        }
    }
 }

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    headerBar: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    bottomHeaderBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#efefef',
        borderBottomWidth: 1
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 18,
        // fontWeight: 'bold',
        backgroundColor: '#eaf9ff',
        fontFamily: 'MuktaMalar',
    },
    listItem: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        backgroundColor: '#eff8fc',
        borderRadius: 20,
    },
    item: {
        fontFamily: 'MuktaMalar',
        maxWidth: '80%',
        fontSize: 16
    },
    addButton: {
        // backgroundColor: '#80d8ff'
    },
    bottomHeaderItem: {
        padding: 10
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
    }
});
