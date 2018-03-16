import  React, { Component } from 'react'
import { View, FlatList, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
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
    H1,
    H3,
    ListItem,
    Icon,
    Button
} from 'native-base'

import * as Progress from 'react-native-progress'

const testSongs = [
    { "id": 1, "title": "Tytul piosenki1", "author": "Author1" },
    { "id": 2, "title": "Tytul piosenki2", "author": "Author2" },
    { "id": 3, "title": "Tytul piosenki3", "author": "Author3" },
    { "id": 4, "title": "Tytul piosenki4", "author": "Author4" },
    { "id": 5, "title": "Tytul piosenki1", "author": "Author1" },
    { "id": 6, "title": "Tytul piosenki2", "author": "Author2" },
    { "id": 7, "title": "Tytul piosenki3", "author": "Author3" },
    { "id": 8, "title": "Tytul piosenki4", "author": "Author4" }
]
export default class JukeboxHome extends Component {

    constructor(props){
        super(props)
        this.state = {
            progress: 0.1,
            // indeterminate: true,
        }
    }

    static navigationOptions = {
        header: null
    }

    _keyExtractor = (item, index) => item.id

    componentDidMount() {
    }

    printSongsCount(){
        
    }

    increaseProgress(){
        let newProg = this.state.progress + 0.1
        this.setState({
            progress: newProg
        })
    }
    render () {
        return (
            <ImageBackground
                source={require('../../assets/bg.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <Header style={styles.headerBackground} androidStatusBarColor={"#000"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Home') }>
                        <Icon name="md-arrow-round-back" style={{color: "#fff"}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Aktualnie gramy</Title>
                    </Body>
                </Header>
                <Container>
                <View style={styles.nowPlayingCard}>
                    <CardItem style={styles.transparentBackground}>
                        <Left>
                            <View style={styles.songPlayingIconBox}>
                                <Icon name="ios-musical-notes" style={{ color:'#fff', fontSize: 54 }} />
                            </View>
                            <Body>
                                <Text style={[{ fontSize: 32 }, styles.whiteText]}>In the end</Text>
                                <Text style={styles.whiteText}>Linkin Park</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                        <Text style={[styles.whiteText, { margin: 10, marginTop: -10, fontWeight: 'bold' }]}>XX:XX</Text>
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
                        <Text style={[styles.whiteText, { margin: 10, marginTop: -10, fontWeight: 'bold' }]}>XX:XX</Text>                        
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
                                data={testSongs}
                                keyExtractor={this._keyExtractor}
                                renderItem={(item) =>
                                    <ListItem style={styles.listItem}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: '#FAE2EE', fontSize: 20, fontWeight: 'bold' }}>{item.item.title}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                            <Text style={{ color: '#FAE2EE' }}>{item.item.author}</Text>
                                            <Text style={{ color: '#FAE2EE' }}>XX:XX</Text>
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
                        <TouchableOpacity
                          style={styles.orderSongButton}
                          onPress={
                            () => this.props.navigation.navigate('GenresList')
                            }>
                            <Icon name="md-play" style={{ color: '#fff', fontSize: 42, marginRight: 10 }} />
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>
                                Zamów piosenkę
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            </ImageBackground>
        )
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
        paddingRight: 40,
        paddingLeft: 40,
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