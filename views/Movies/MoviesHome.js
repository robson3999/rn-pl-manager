import React, { Component } from 'react'
import { View, FlatList, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, NativeModules } from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Card,
    CardItem,
    Body,
    Left,
    Text,
    ListItem,
    Icon,
    Button
} from 'native-base'

import * as Progress from 'react-native-progress'
import DownloadingView from '../helpers/DownloadingView'
import { BASE_URL } from '../helpers/Variables';

export default class MoviesHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            actualSongs: [],
            isLoading: false,
            actualSongTime: '0:00',
            totalSongTime: '0:00'
        }
    }

    static navigationOptions = {
        header: null
    }

    parseMilisecondsToTime(time) {
        return new Date(time).getMinutes().toString() + ":" + (new Date(time).getSeconds() < 10 ? '0' : '').toString() + new Date(time).getSeconds()
    }
    parseActualSongTime(songTime) {
        let actualTime = this.parseMilisecondsToTime(songTime)
        this.setState({ actualSongTime: actualTime })
    }
    parseTotalSongTime(songTime) {
        let totalTime = this.parseMilisecondsToTime(songTime)
        this.setState({ totalSongTime: totalTime })
    }

    _keyExtractor = (item, index) => item.id

    async fetchActualMoviesAPI() {
        let listUrl = `${BASE_URL}/musicfile/list`
        let currentUrl = `${BASE_URL}/musicfile/current`
        await fetch(listUrl)
            .then(response => {
                if (response.ok)
                    response.json().then(resp => {
                        let movies = resp.filter(item => {
                            // return 'video' named files -> workaround 'till api's not ready
                            return item.musicFile.title[0].toLowerCase() == 'v'
                        })
                        this.setState({ actualSongs: movies })
                    })
                        .catch(err => console.log(err))
                else
                    this.setState({ isLoading: false })
                this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err)
                this.setState({ noInternet: true })
            })
        await fetch(currentUrl)
            .then(response => {
                if (response.ok)
                    response.json().then(resp => {
                        if (resp.current == -1 && resp.total == -1) {
                            actuallyPlaying.musicFile.title
                            this.setState({ actuallyPlaying: { musicFile: { "title": '', "author": '' } } })
                        }
                        this.setState({ actuallyPlaying: resp, totalSongTimeInMs: resp.total, actualSongTimeInMs: resp.current })
                        this.parseTotalSongTime(resp.total)
                        this.parseActualSongTime(resp.current)
                        if (this.state.actuallyPlaying.musicFile.title[0].toLowerCase() !== 'v') {
                            this.setState({
                                actuallyPlaying: {
                                    musicFile: {
                                        title: 'Aktualnie odtwarza piosenkę',
                                        author: ''
                                    }
                                }
                            })
                        } else {
                            this.setState({ actualSongs: this.state.actualSongs.slice(1) })
                        }
                    })
                        .catch(err => {
                            this.setState({ actuallyPlaying: { musicFile: { "title": '', "author": '' } } })
                        })
                else {
                    this.setState({ actuallyPlaying: { musicFile: { "title": '', "author": '' } } })
                }
            })
            .catch(err => {
                console.log(err)
                // this.setState({ actuallyPlaying: { musicFile: {"title": '', "author": ''} } })
            })
        
    }

    navigateToMoviesList() { this.props.navigation.replace('DetailedMoviesView') }
    backToJukebox() { this.props.navigation.goBack() }

    computeActualSongTime() {
        if (this.state.actualSongTimeInMs <= this.state.totalSongTimeInMs) {
            let time = this.state.actualSongTimeInMs + 1000
            let newTime = this.parseMilisecondsToTime(time)
            this.computeProgress()
            this.setState({ actualSongTime: newTime, actualSongTimeInMs: time })
        } else {
            clearInterval(this.interval)
            this.fetchActualMoviesAPI()
            this.interval = setInterval(() => this.computeActualSongTime(), 1000)
        }
    }

    async componentDidMount() {
        try {
            await this.fetchActualMoviesAPI()
            this.interval = setInterval(() => this.computeActualSongTime(), 1000)
        } catch (err) {
            console.log(err)
        }
    }

    computeProgress() {
        let completed = this.state.totalSongTimeInMs
        let actual = this.state.actualSongTimeInMs
        let newProg = actual / completed
        this.setState({
            progress: newProg
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        if (this.state.isLoading)
            return <DownloadingView />
        else
            return (
                <ImageBackground
                    source={require('../../assets/bg_improved.png')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Header style={styles.headerBackground} androidStatusBarColor={"#000"}>
                        <Left>
                            <Button transparent style={{ paddingRight: 80 }} onPress={() => this.props.navigation.popToTop()}>
                                <Icon name="md-arrow-round-back" style={{ color: "#fff" }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Aktualnie odtwarzane</Title>
                        </Body>
                    </Header>
                    <Container>
                        <View style={styles.nowPlayingCard}>
                            <CardItem style={styles.transparentBackground}>
                                <Left>
                                    <View style={styles.songPlayingIconBox}>
                                        <Icon name="ios-videocam" style={{ color: '#fff', fontSize: 54 }} />
                                    </View>
                                    { this.state.actuallyPlaying &&                                        
                                        <Body>
                                            <Text style={[{ fontSize: 28 }, styles.whiteText]}>{ this.state.actuallyPlaying.musicFile.title }</Text>
                                        <Text style={styles.whiteText}>{this.state.actuallyPlaying.musicFile.author }</Text>
                                        </Body>
                                    }
                                </Left>
                            </CardItem>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                <Text style={[styles.whiteText, { margin: 10, marginTop: -10, fontWeight: 'bold' }]}>
                                    {this.state.actualSongTime}
                                </Text>
                                <View style={{ width: '65%' }}>
                                    <Progress.Bar
                                        progress={this.state.progress}
                                        indeterminate={this.state.indeterminate}
                                        width={null}
                                        height={8}
                                        color="#EE3587"
                                        borderRadius={0}
                                        borderWidth={0}
                                        unfilledColor="#000"
                                    />
                                </View>
                                <Text style={[styles.whiteText, { margin: 10, marginTop: -10, fontWeight: 'bold' }]}>
                                    {this.state.totalSongTime}
                                </Text>
                            </View>
                            <CardItem footer style={styles.transparentBackground}>
                                <View>
                                    <Text style={[{ fontSize: 18, fontWeight: 'bold' }, styles.whiteText]}>Następne w kolejce:</Text>
                                </View>
                            </CardItem>
                        </View>
                        <Content>
                            <View style={styles.nextSongsList}>
                                <ScrollView>
                                    <FlatList
                                        data={this.state.actualSongs}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={(item, index) =>
                                            <ListItem style={styles.listItem}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: '#FAE2EE', fontSize: 20, fontWeight: 'bold' }}>{item.item.musicFile.title}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                                    <Text style={{ color: '#FAE2EE' }}>{item.item.musicFile.author}</Text>
                                                </View>
                                                <View style={styles.bottomBlurredBorder}></View>
                                            </ListItem>
                                        }
                                    />
                                </ScrollView>
                            </View>
                        </Content>
                        <View style={styles.placeholder}></View>
                        <View style={styles.footer}>
                            <ProceedButton onNavigateRequest={() => this.navigateToMoviesList()} onBackRequest={() => this.backToJukebox()} props={this.props.navigation.state.params} />
                        </View>
                    </Container>
                </ImageBackground>
            )
    }
}

class ProceedButton extends Component {
    constructor(props) {
        super(props)
        this.state = this.props
    }

    goBackRequest() {
        this.props.onBackRequest()
    }
    goNavigateRequest() {
        this.props.onNavigateRequest()
    }

    render() {
        if (this.state.props == 'jukebox') {
            return (
                <TouchableOpacity
                    style={styles.orderSongButton}
                    onPress={
                        () => this.goBackRequest()
                    }>
                    <Icon name="md-play" style={{ color: '#fff', fontSize: 42, marginRight: 10 }} />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>
                        Zamów film
                        </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={styles.orderSongButton}
                    onPress={
                        () => this.goNavigateRequest()
                    }>
                    <Icon name="md-play" style={{ color: '#fff', fontSize: 42, marginRight: 10 }} />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>
                        Zamów film
                    </Text>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        elevation: 5
    },
    songPlayingIconBox: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    nowPlayingCard: {
        padding: 10,
        backgroundColor: 'transparent',
        elevation: 10
    },
    nextSongsList: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    listItem: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 0
    },
    bottomBlurredBorder: {
        backgroundColor: "#B53694",
        height: 2,
        opacity: 0.5,
        elevation: 2,
        width: '100%'
    },
    orderSongButton: {
        backgroundColor: '#B53694',
        flexDirection: 'row',
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        height: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    placeholder: {
        height: 100
    },
    transparentBackground: {
        backgroundColor: 'transparent'
    },
    whiteText: {
        color: '#fff'
    }
})