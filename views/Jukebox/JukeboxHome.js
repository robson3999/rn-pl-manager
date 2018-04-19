import  React, { Component } from 'react';
import { View, FlatList, ScrollView, Image, ImageBackground } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Body, Left, Text, ListItem, Icon, Button } from 'native-base';
import * as Progress from 'react-native-progress';
import DownloadingView from '../helpers/DownloadingView';
import ActuallyPlayingListItem from '../helpers/ActuallyPlayingListItem';
import ProceedButton from './components/ProceedButton';
import { BASE_URL } from '../helpers/Variables';
import { parseMilisecondsToTime ,parseActualSongTime, parseTotalSongTime, computeProgress } from '../helpers/Variables';
import { activityHomeStyles } from '../helpers/styles';

export default class JukeboxHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            progress: 0,
            actualSongs: [],
            isLoading: true,
            actualSongTime: '0:00',
            totalSongTime: '0:00',
        }
    }

    static navigationOptions = {
        header: null
    }

    _keyExtractor = (item, index) => item.id

    async fetchActualSongsAPI() {
        const listUrl = `${BASE_URL}/musicfile/list`
        const currentUrl = `${BASE_URL}/musicfile/current`

        await fetch(listUrl)
            .then(response => {
                if (response.ok)
                    response.json().then(resp => {
                        let songs = resp.filter(item => {
                            // return 'video' named files -> workaround 'till api's not ready
                            return item.musicFile.title[0].toLowerCase() !== 'v'
                        })
                        this.setState({ actualSongs: songs })
                    })
                    .catch(err => console.log(err))
                else
                    this.setState({ isLoading: false })
                this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err)
                // this.setState({ noInternet: true })
            })
        await fetch(currentUrl)
          .then(response => {
              if(response.ok)
                response.json().then(resp => {
                    if(resp.current == -1 && resp.total == -1 ){
                    this.setState({ actuallyPlaying: { musicFile: {"title": '', "author": ''} } })
                    } else {
                        this.setState({ 
                            actuallyPlaying: resp, 
                            totalSongTimeInMs: resp.total, 
                            actualSongTimeInMs: resp.current,
                            totalSongTime: parseTotalSongTime(resp.total),
                            actualSongTime: parseActualSongTime(resp.current)
                        })
                    }
                    if (this.state.actuallyPlaying.musicFile.title[0].toLowerCase() == 'v') {
                        this.setState({
                            actuallyPlaying: {
                                musicFile: {
                                    title: 'Aktualnie odtwarza film',
                                    author: ''
                                }
                            }
                        })
                    } else {
                        this.setState({ actualSongs: this.state.actualSongs.slice(1) })                        
                    }
                })
                .catch(err => {
                    this.setState({ actuallyPlaying: { musicFile: {"title": '', "author": ''} } })
                    // console.error(err)
                })
              else {
                  this.setState({ actuallyPlaying: { musicFile: {"title": '', "author": ''} } })
                }
          })
          .catch(err => {
              console.log(err)
            // this.setState({ actuallyPlaying: { musicFile: {"title": '', "author": ''} } })
          })
    }

    navigateToJukebox(){ this.props.navigation.navigate('GenresList') }
    backToJukebox(){ this.props.navigation.goBack() }

    computeActualSongTime(){
        if(this.state.actualSongTimeInMs <= this.state.totalSongTimeInMs){
            let time = this.state.actualSongTimeInMs + 1000
            let newTime = parseMilisecondsToTime(time)
            this.setState({ 
                progress: computeProgress(this.state.totalSongTimeInMs, this.state.actualSongTimeInMs),
                actualSongTime: newTime, 
                actualSongTimeInMs: time
            })
        } else {
            clearInterval(this.interval)
            this.fetchActualSongsAPI()
            this.interval = setInterval(() => this.computeActualSongTime(), 1000)
        }
    }

    async componentDidMount() {
        try {
            await this.fetchActualSongsAPI()
            this.interval = setInterval(() => this.computeActualSongTime(), 1000)
        } catch (err){
            console.log(err)
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render () {
        if(this.state.isLoading)
            return <DownloadingView />
        else
            return (
                <ImageBackground
                    source={require('../../assets/bg_improved.png')}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Header style={activityHomeStyles.headerBackground} androidStatusBarColor={"#000"}>
                        <Left>
                            <Button transparent style={{ paddingRight: 80 }} onPress={() => this.props.navigation.popToTop() }>
                            <Icon name="md-arrow-round-back" style={{color: "#fff"}} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Aktualnie gramy</Title>
                        </Body>
                    </Header>
                    <Container>
                    <View style={activityHomeStyles.nowPlayingCard}>
                        <CardItem style={activityHomeStyles.transparentBackground}>
                            <Left>
                                <View style={activityHomeStyles.songPlayingIconBox}>
                                    <Icon name="ios-musical-notes" style={{ color:'#fff', fontSize: 54 }} />
                                </View>
                                { this.state.actuallyPlaying &&
                                    <Body>
                                        <Text style={[{ fontSize: 32 }, activityHomeStyles.whiteText]}>{ this.state.actuallyPlaying.musicFile.title }</Text>
                                        <Text style={activityHomeStyles.whiteText}>{ this.state.actuallyPlaying.musicFile.author }</Text>
                                    </Body>
                                }
                            </Left>
                        </CardItem>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                            <Text style={[activityHomeStyles.whiteText, { margin: 10, marginTop: -10, fontWeight: 'bold' }]}>
                                    {this.state.actualSongTime}
                            </Text>
                            <View style={{ width: '65%' }}>
                                <Progress.Bar 
                                progress={this.state.progress}
                                width={null}
                                height={8}
                                color="#EE3587"
                                borderRadius={0}
                                borderWidth={0}
                                unfilledColor="#000"
                                />
                            </View>
                            <Text style={[activityHomeStyles.whiteText, { margin: 10, marginTop: -10, fontWeight: 'bold' }]}>
                                    { this.state.totalSongTime }
                            </Text>                        
                        </View>
                        <CardItem footer style={activityHomeStyles.transparentBackground}>
                            <View>
                                <Text style={[{ fontSize: 18, fontWeight: 'bold' }, activityHomeStyles.whiteText]}>Następne w kolejce:</Text>
                            </View>
                        </CardItem>
                    </View>
                    <Content>
                            <View style={activityHomeStyles.nextSongsList}>
                                <ScrollView>
                                <FlatList
                                    data={this.state.actualSongs}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={(item, index) =>
                                        <ActuallyPlayingListItem props={item} />
                                        }
                                />
                                </ScrollView>                        
                            </View>
                        </Content>
                        <View style={activityHomeStyles.placeholder}></View>
                        <View style={activityHomeStyles.footer}>
                            <ProceedButton onNavigateRequest={() => this.navigateToJukebox()} onBackRequest={() => this.backToJukebox()} props={this.props.navigation.state.params} />
                        </View>
                    </Container>
                </ImageBackground>
            )
    }
}