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
            data: []
        }
    }
    static navigationOptions = {
        header: null
    }
    async fetchGenres(){
        // url = 'https://my-json-server.typicode.com/robson3999/songs-db/genres'
        let url = 'http://192.168.1.101:8080/genre/list'
        await fetch(url)
            .then(response => {
                if (response.ok)
                 response.json().then(resp => {
                     this.setState({ data: resp })
                    })
                else 
                 this.setState({ isLoading: false })
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
    appendImageToGenre(genreId){

    }

    async componentDidMount(){
        this.checkConnectionInfo()
        await this.fetchGenres()
    }

    _keyExtractor = (item, index) => item.id
    render() {
        // const genresList = this.parseGenresToList(this.state.data).map(genre => (
        //         <TouchableOpacity key={genre.id} onPress={() => this.props.navigation.navigate('DetailedSongsView', genre)}>
        //         {}    
        //         <Image
        //                 source= DYNAMICALLY ALOCATED SOURCE DOES NOT WORK :CCC
        //                 style={styles.button}
        //                 resizeMode="contain"
        //             />
        //         </TouchableOpacity>
        // ))

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
                        renderToHardwareTextureAndroid={true}
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
                            <View style={styles.container} renderToHardwareTextureAndroid={true}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.state.data[0])}>
                                        <Image
                                            source={require('../../assets/genres/classic.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.state.data[1])}>
                                        <Image
                                            source={require('../../assets/genres/club.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.state.data[2])}>
                                        <Image
                                            source={require('../../assets/genres/rock.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.state.data[3])}>
                                        <Image
                                            source={require('../../assets/genres/jazz.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.state.data[4])}>
                                        <Image
                                            source={require('../../assets/genres/metal.png')}
                                            style={styles.button}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedSongsView', this.state.data[4])}>
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