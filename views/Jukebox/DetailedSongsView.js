import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, FlatList, NetInfo, Modal, TouchableOpacity, ImageBackground } from 'react-native'
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
        let url = 'http://192.168.1.101:8080/musicfile/add?ids='+ item.id
        fetch(url, {
            method: 'GET'
        })
            .then((resp) => {
                if(resp.status == 200 && resp.ok){
                this.setState({ modalComplete: true })
                }

            })
            .catch(err => console.log(err))
    }
    parseGenreTitle(genre){
        return genre[0].toUpperCase() + genre.slice(1)
    }

    componentDidMount(){
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
            <ImageBackground
                source={require('../../assets/bg_improved.png')}
                style={{ width: '100%', height: '100%' }}
            >
                    <Header searchBar rounded style={styles.headerBar} androidStatusBarColor={"#000"}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input
                                placeholder="Szukaj"
                                ref="searchFieldRef"
                                value={this.state.searchText}
                                onChange={this.setSearchText.bind(this)}
                            />
                        </Item>
                    </Header>
                    
                        <FlatList
                            data={this.state.filteredSongs}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, item)} style={styles.listItem}>
                                    <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                                        <Text style={{ color: '#FAE2EE', fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                                        <Text style={{ color: '#FAE2EE', marginRight: 10, fontWeight: 'bold' }}>PLN 0,99</Text>
                                    </View>
                                    <View renderToHardwareTextureAndroid={true}>
                                        <Text style={{ color: '#FAE2EE' }}>{item.author}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={this._keyExtractor}
                        />
                    
                    <Modal
                        animationType="slide"
                        transparent={true}
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
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
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
        backgroundColor: '#B53694',
        borderRadius: 15,
        elevation: 2,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 0
    },
    item: {
        maxWidth: '80%',
        fontSize: 16
    },
    modal: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
