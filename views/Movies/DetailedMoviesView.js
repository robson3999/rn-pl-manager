import React, { Component } from 'react';
import { View, FlatList, Modal, ImageBackground } from 'react-native';
import { Header, ListItem, Title, Item, Icon, Text, Input, Button, Left } from 'native-base';
import SummaryModalComplete from '../helpers/SummaryModalComplete';
import SummaryModalLoading from '../helpers/SummaryModalLoading';
import CustomListItem from './components/CustomListItemMovie';
import { detailedViewStyles } from '../helpers/styles';
import { getUUID, doTrnDirect } from '../helpers/PaymentMethods';
import { showFailedBoughtMovie, showSuccessBoughtMovie } from '../helpers/Toasts';
export default class DetailedMoviesView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // params: this.props.navigation.state.params[0],
            // genreTitle: this.props.navigation.state.params[0].title,
            // songsList: this.props.navigation.state.params[0].data,
            modalVisible: false,
            modalComplete: false,
            searchText: null,
            filteredSongs: []
        }
    }

    async fetchMovies() {
        let url = `${global.SERVERIP}/genre/list`
        await fetch(url)
            .then(response => {
                if (response.ok)
                    response.json().then(resp => {
                        let movies = resp.filter(genre => {
                            // genre.id = 7 => films in db
                            return genre.id == 7
                        })
                        this.setState({ data: movies[0].data })
                    })
                else this.setState({ isLoading: false })
                this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err)
                this.setState({ noInternet: true })
            })
    }

    async componentWillMount(){
        await this.fetchMovies()
        this.setState({ filteredSongs: this.state.data })
        
    }

    sendChosenSong(visible, item) {
        try {
            let url = `${global.SERVERIP}/musicfile/add?ids=${item.id}`;
            fetch(url, {
                method: 'GET'
            })
            .then((resp) => {
                if (resp.status == 200 && resp.ok) {
                    item.isSent = true
                    this.setState({ modalComplete: true });
                    this.props.navigation.navigate('MoviesHome');
                }
            })
            .catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }
    }

    setSearchText(event) {
        let searchText = event.nativeEvent.text
        // let songs = this.state.songsList
        let songs = this.state.data
        text = searchText.trim().toLowerCase()
        // prevent fucking up my app with '?' sign searching
        try {
            let newFilteredSongs = songs.filter(data => {
                return (data.title.toLowerCase().match(text))
            })
            this.setState({ filteredSongs: newFilteredSongs })
        } catch (err) {
            console.log(err)
        }
    }

    async handleElementTap(item) {
        let isSuccess = await doTrnDirect()
        if (isSuccess) {
            this.sendChosenSong(true, item);
            showSuccessBoughtMovie()
        } else {
            showFailedBoughtMovie()
        }
    }

    _keyExtractor = (item, index) => item.id

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/bg_improved.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <Header searchBar rounded style={detailedViewStyles.headerBar} androidStatusBarColor={"#000"}>
                    <Left style={{ justifyContent: 'space-around' }}>
                        <Button transparent onPress={() => this.props.navigation.navigate('MoviesHome')}>
                            <Icon name='arrow-back' />
                            <Title style={{ color: '#fff', width: '90%' }}>Filmy</Title>
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
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item, index }) =>
                        <CustomListItem key={item.id} props={item} onTapEmmited={() => this.handleElementTap(item)} />
                    }
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