import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, NetInfo, ImageBackground, Image } from 'react-native'
import { Container, Content, Spinner, Header, Left, Body, Title, Button, Icon } from 'native-base'
import NoInternetView from '../helpers/NoInternetView'
import { images } from '../helpers/GenreImages'
export default class GenresList extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
        }
    }
    static navigationOptions = {
        header: null
    }
    async fetchGenres(){
        // let url = 'http://192.168.1.19:8080/genre/list'
        let url = 'http://192.168.1.4:8080/genre/list'
        await fetch(url)
            .then(response => {
                if (response.ok)
                 response.json().then(resp => {
                     this.setState({ data: resp })
                    })
                else this.setState({ isLoading: false })
                this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err)
                this.setState({ noInternet: true })
            })
    }

    async forceUpdateHandler() {
        await this.fetchGenres()
        this.setStateToStart()
        this.checkConnectionInfo()
    }
    setStateToStart() {
        this.setState({
            isLoading: true,
            data: []
        })
    }
    checkConnectionInfo() {
        NetInfo.isConnected.fetch().then(isOnline => {
            isOnline ? this.setState({ noInternet: false }) : this.setState({ noInternet: true })
        })
    }
    parseGenresToList(data){
        let id = 0
        return data.map(genre => {
            return {
                id: ++id,
                title: genre.title,
                data: genre.data,
            }
        })
    }

    selectGenreData(arg){
        let stateData = this.state.data
        return stateData.filter(genre => {
            return genre.id == arg
        })
    }

    updateGenresDataIfSongsWereChosen(data){
        const { params } = this.props.navigation.state
        let chosenGenre = data.filter(genre => {
            return genre.id === params.id
        })          
        chosenGenre[0].data = params.data
    }

    async componentDidMount(){
        this.checkConnectionInfo()
        if(!this.state.data) {
            await this.fetchGenres()
        }
        if(this.props.navigation.state.params)
            this.updateGenresDataIfSongsWereChosen(this.state.data)
    }

    _keyExtractor = (item, index) => item.id
    render() {
        if(this.state.isLoading){
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text>Ładuję dane...</Text>
                    <Spinner />
                </View>
            )
        } else {
            if (this.state.noInternet) {
                return <NoInternetView onTryReconnectRequest={() => this.forceUpdateHandler()} />
            } else {
                return (
                    <ImageBackground
                        source={require('../../assets/bg_improved.png')}
                        style={{ width: '100%', height: '100%' }}
                    >
                    
                    <Header style={styles.headerBackground} androidStatusBarColor={"#000"}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('Jukebox')}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ textAlign: 'center' }}>Wybierz kategorię</Title>
                        </Body>
                    </Header>
                        <ScrollView>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.selectGenreData(1))}>
                                        <Image
                                            source={require('../../assets/genres/classic.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.selectGenreData(2))}>
                                        <Image
                                            source={require('../../assets/genres/club.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.selectGenreData(3))}>
                                        <Image
                                            source={require('../../assets/genres/rock.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.selectGenreData(4))}>
                                        <Image
                                            source={require('../../assets/genres/jazz.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.selectGenreData(5))}>
                                        <Image
                                            source={require('../../assets/genres/metal.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.selectGenreData(6))}>
                                        <Image
                                            source={require('../../assets/genres/pop.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    headerBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    listStyles: {
        // flex: 1,
    },
    headerBar: {
        backgroundColor: 'white',
    },
    button: {
        height: 160,
        maxWidth: 160,
        margin: 10,
    },
    buttonText: {
        fontSize: 21,
        color: 'white'
    }
})