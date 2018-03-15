import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, FlatList, NetInfo, Modal, TouchableOpacity } from 'react-native'
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
    Button,
    Spinner,
    Left,
    Right
} from 'native-base'

import SummaryModalComplete from '../helpers/SummaryModalComplete'
import SummaryModalLoading from '../helpers/SummaryModalLoading'


export default class DetailedSongsView extends Component {
    constructor(props){
        super(props)
        this.state = {
            genreTitle: this.props.navigation.state.params.title,
            songsList: this.props.navigation.state.params.data,
            modalVisible: false,
            modalComplete: false,
            searchText: null,
            filteredSongs: []
        }
    }
    
    setModalVisible(visible, item){
        this.setState({modalVisible: visible})
        let url = 'http://192.168.1.112:8080/musicfile/add?ids='+ item.id
        fetch(url, {
            method: 'GET'
        })
            .then((resp) => {
                // if(resp.status == 200 && resp.ok){
                console.log("Wyslano:")
                // console.log(JSON.parse(playList))
                this.setState({ modalComplete: true })
                // }
                console.log(resp)
            })
            .catch(err => console.log(err))
    }
    parseGenreTitle(genre){
        return genre[0].toUpperCase() + genre.slice(1)
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params)
        this.setState({ filteredSongs: this.state.songsList })
    }

    navigateToHomeScreen(){
        this.setState({ modalVisible: false })
        this.props.navigation.navigate('Jukebox')
    }

    setSearchText(event) {
        let searchText = event.nativeEvent.text
        let songs = this.state.songsList
        text = searchText.trim().toLowerCase()
        // prevent fucking up my app with '?' sign searching
        try{
            let newFilteredSongs = songs.filter(data => {
                return (data.title.toLowerCase().match(text) || data.author.toLowerCase().match(text))
            })
            this.setState({
                filteredSongs: newFilteredSongs
            })
        } catch(err) {
            console.log(err)
        }
        
    }

    _keyExtractor = (item, index) => item.id

    static navigationOptions = {
        header: null
    }
    render () {
        return (
            <View>
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
                    <Right></Right>
                </Header>
            <View>
                <ScrollView>
                    <FlatList
                        data={this.state.filteredSongs}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.setModalVisible(true, item)} style={styles.listItem}>
                                <View>
                                    <Text style={styles.item}>{item.author} - {item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={this._keyExtractor}
                    />
                </ScrollView>
            </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <View style={styles.modal}>
                        {this.state.modalComplete &&
                            <SummaryModalComplete onNavigateToHomescreen={() => this.navigateToHomeScreen()} />
                        }
                        {!this.state.modalComplete &&
                            <SummaryModalLoading />
                        }
                    </View>
                </Modal>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: 'white'
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
        paddingTop: 20,
        paddingBottom: 20,
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
    modal: {
        marginTop: '40%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
