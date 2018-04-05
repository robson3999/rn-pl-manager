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
    Right,
    Toast
} from 'native-base'

import SummaryModalComplete from '../helpers/SummaryModalComplete'
import SummaryModalLoading from '../helpers/SummaryModalLoading'

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
    
    setModalVisible(visible, item){
        this.setState({modalVisible: visible})
        try{
            // let url = 'http://192.168.1.19:8080/musicfile/add?ids='+ item.id
            let url = 'http://192.168.1.4:8080/musicfile/add?ids=' + item.id
            fetch(url, {
                method: 'GET'
            })
            .then((resp) => {
                if(resp.status == 200 && resp.ok){
                    item.isSent = true
                    this.setState({ modalComplete: true })
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
        console.log(this.props.navigation.state)
        this.setState({ filteredSongs: this.state.songsList })
    }

    navigateToHomeScreen(){
        this.setState({ modalVisible: false })
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

    handleElementTap(item){
        this.setModalVisible(true, item)
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
                    <Left style={{ justifyContent: 'space-between' }}>
                        <Button transparent onPress={() => this.props.navigation.goBack(null, this.state.params)}>
                            <Icon name='arrow-back' />
                            <Title style={{ color: '#fff', marginLeft: '20%' }}>{ this.state.genreTitle.toUpperCase() }</Title>
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

class CustomListItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            item: this.props
        }
    }
    onChosenClicked(){
        Toast.show({
            text: 'Ta piosenka została już dodana',
            position: 'bottom',
            buttonText: 'OK',
        })
    }
    onTapEmmited(){
        this.props.onTapEmmited()
    }
    render() {
        if(this.state.item.props.isSent){
            return (
                <TouchableOpacity onPress={() => this.onChosenClicked()} style={[styles.listItem, { backgroundColor: "#fff" }]}>
                    <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                        <Text style={{ color: '#898989', fontSize: 20, fontWeight: 'bold' }}>{this.state.item.props.title}</Text>
                        <Text style={{ color: '#898989', marginRight: 10, fontWeight: 'bold', fontSize: 20 }}>PLN 0,99</Text>
                    </View>
                    <View renderToHardwareTextureAndroid={true}>
                            <Text style={{ color: '#898989' }}>{this.state.item.props.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.onTapEmmited(true, this.props)} style={[styles.listItem, { backgroundColor: "#B53694" }]}>
                    <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                        <Text style={{ color: '#FAE2EE', fontSize: 20, fontWeight: 'bold' }}>{this.state.item.props.title}</Text>
                        <Text style={{ color: '#FAE2EE', marginRight: 10, fontWeight: 'bold', fontSize: 20 }}>PLN 0,99</Text>
                    </View>
                    <View renderToHardwareTextureAndroid={true}>
                        <Text style={{ color: '#FAE2EE' }}>{this.state.item.props.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
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
