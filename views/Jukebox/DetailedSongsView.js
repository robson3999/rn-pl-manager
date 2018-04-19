import React, { Component } from 'react';
import { View, FlatList, Modal, ImageBackground } from 'react-native';
import { Header, ListItem, Title, Item, Icon, Text, Input, Button, Left } from 'native-base';
import SummaryModalComplete from '../helpers/SummaryModalComplete';
import SummaryModalLoading from '../helpers/SummaryModalLoading';
import CustomListItem from './components/CustomListItemSong';
import { detailedViewStyles } from '../helpers/styles';
import { getUUID, doTrnDirect } from '../helpers/PaymentMethods';
import { showSuccessBoughtSong, showFailedBoughtSong } from '../helpers/Toasts';
import { BASE_URL } from '../helpers/Variables';

export default class DetailedSongsView extends Component {
    constructor(props){
        super(props)
        this.state = {
            params: this.props.navigation.state.params[0],
            genreTitle: this.props.navigation.state.params[0].title,
            songsList: this.props.navigation.state.params[0].data,
            modalVisible: false,
            modalComplete: false,
            searchText: null,
            filteredSongs: []
        }
    }
    
    sendChosenSong(visible, item){
        this.setState({ modalVisible: visible });
        this.setState({modalVisible: !visible});
        try{
            let url = `${BASE_URL}/musicfile/add?ids=${item.id}`;
            fetch(url, {
                method: 'GET'
            })
            .then((resp) => {
                if(resp.status == 200 && resp.ok){
                    item.isSent = true
                    this.setState({ modalComplete: true });
                    this.props.navigation.navigate('Jukebox', 'jukebox');                    
                }
            })
            .catch(err => console.log(err))
        } catch(err){
            console.log(err)
        }
    }
    parseGenreTitle(genre){
        return genre[0].toUpperCase() + genre.slice(1)
    }

    componentDidMount(){
        this.setState({ filteredSongs: this.state.songsList })
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
            this.setState({ filteredSongs: newFilteredSongs })
        } catch(err) {
            console.log(err)
        }
    }

    async handleElementTap(item){
        let isSuccess = await doTrnDirect()
        if (isSuccess){
            this.sendChosenSong(true, item);
            showSuccessBoughtSong();
        } else {
            showFailedBoughtSong();
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
                <Header searchBar rounded style={detailedViewStyles.headerBar} androidStatusBarColor={"#000"}>
                    <Left style={{ justifyContent: 'space-around' }}>
                        <Button transparent onPress={() => this.props.navigation.goBack(null, this.state.params)}>
                            <Icon name='arrow-back' />
                            <Title style={{ color: '#fff', width: '90%' }}>{this.state.genreTitle.slice(0, 1).toUpperCase() + this.state.genreTitle.slice(1) }</Title>
                        </Button>
                    </Left>
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
                    ref="songsFlatList"
                    data={this.state.filteredSongs}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <CustomListItem props={item} onTapEmmited={()=> this.handleElementTap(item)} />
                    }
                    keyExtractor={this._keyExtractor}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalComplete: true })
                    }}>
                    <View style={detailedViewStyles.modal}>
                    </View>
                </Modal>
            </ImageBackground>
        )
    }
}