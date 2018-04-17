import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, FlatList, NetInfo, Modal, TouchableOpacity, ImageBackground, NativeModules } from 'react-native'
import {
    Container,
    Header,
    Body,
    Card,
    CardItem,
    ListItem,
    Title,
    Item,
    Icon,
    Text,
    Input,
    Button,
    Spinner,
    Left,
    Right,
    Toast,
    Thumbnail    
} from 'native-base'

import SummaryModalComplete from '../helpers/SummaryModalComplete'
import SummaryModalLoading from '../helpers/SummaryModalLoading'

let P24LibModule = NativeModules.P24LibModule

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
        let url = 'http://192.168.1.77:8080/genre/list'
        await fetch(url)
            .then(response => {
                if (response.ok)
                    response.json().then(resp => {
                        let movies = resp.filter(genre => {
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
        this.setState({ modalVisible: visible });
        this.setState({ modalVisible: !visible });

        try {
            let url = 'http://192.168.1.77:8080/musicfile/add?ids=' + item.id
            fetch(url, {
                method: 'GET'
            })
                .then((resp) => {
                    if (resp.status == 200 && resp.ok) {
                        item.isSent = true
                        this.setState({ modalComplete: true })
                    }
                })
                .catch(err => console.log(err))
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
        await this.doTrnDirect()
        if (this.state.transactionCompleted) {
            this.sendChosenSong(true, item);
            Toast.show({
                text: 'Kupiono wybrany film',
                position: 'bottom',
                buttonText: 'OK',
            })
        } else {
            Toast.show({
                text: 'Nie udało się kupić wybranego filmu',
                position: 'bottom',
                buttonText: 'OK',
                duration: 3000
            })
        }
    }

    _keyExtractor = (item, index) => item.id

    static navigationOptions = {
        header: null
    }

    // przelewy24 functions
    getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    async doTrnDirect() {
        let settingsParams = {
            saveBankCredentials: true,
            readSmsPasswords: true,
            enableBanksRwd: true,
            banksRwdConfigUrl: "https://bh.przelewy24.pl/p24lib/getdata2.php"
        }
        let testTransactionParams = {
            merchantId: 64195,
            crc: 'd27e4cb580e9bbfe',
            sessionId: this.getUUID(),
            amount: 999,
            currency: "PLN",
            description: "Płatność za film w aplikacji Jukebox",
            email: "test@test.pl",
            country: "PL",
            client: "John Smith",
            address: "Test street",
            zip: "60-600",
            city: "Poznań",
            phone: "1246423234",
            language: "pl"
        }
        let trnDirectParams = {
            transactionParams: testTransactionParams,
            isSandbox: true,
            settingsParams: settingsParams
        }
        let {
            isSuccess,
            isCanceled,
            errorCode
        } = await P24LibModule.startTrnDirect(trnDirectParams)

        if (isSuccess) {
            this.setState({ transactionCompleted: true })
        } else if (isCanceled) {
            this.setState({ transactionCompleted: false })
        } else {
            console.log("Transfer error. Code: " + errorCode);
            this.setState({ transactionCompleted: false })
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/bg_improved.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <Header searchBar rounded style={styles.headerBar} androidStatusBarColor={"#000"}>
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
                    <View style={styles.modal}>
                    </View>
                </Modal>
            </ImageBackground>
        )
    }
}

class CustomListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props
        }
    }
    onChosenClicked() {
        Toast.show({
            text: 'Ten film został już dodany',
            position: 'bottom',
            buttonText: 'OK',
        })
    }
    onTapEmmited() {
        this.props.onTapEmmited()
    }
    render() {
            return (
                <Card key={this.state.item.props.id} style={[styles.listItem]}>
                    <CardItem button onPress={() => this.onTapEmmited(true, this.props)} style={{ backgroundColor: '#B53694', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                    <Left>
                        <Thumbnail large square source={{ uri: 'https://ia.media-imdb.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg' }}></Thumbnail>
                        <Body>
                            <Text style={{ color: '#FAE2EE', fontSize: 20, fontWeight: 'bold' }}>{this.state.item.props.title}</Text>
                            <Text style={{ width: '80%', color: '#FAE2EE' }}>Phasellus pellentesque massa nisi, ut venenatis nulla rhoncus sed...</Text>
                        </Body>
                    </Left>
                        <Text style={{ color: '#FAE2EE', fontWeight: 'bold', fontSize: 18 }}>PLN 9,99</Text>
                    </CardItem>
                </Card>
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
        borderRadius: 15,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#B53694'
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
