import React from 'react';
import { StyleSheet, SectionList, TouchableHighlight, View, ScrollView, FlatList, Keyboard } from 'react-native'
import { 
        Container, 
        Header,
        H2,
        H3,
        Body,
        ListItem,
        Title,
        Item,
        Icon,
        Text,
        Input,
        Content,
        Button,
        Spinner,
        CheckBox,
        Toast,
        Right
     } from 'native-base';

export default class MainView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            searchText: null,
            customHeight: 50,
            songsList: [],
            filteredSongs: [],
            showToast: false,
            choosenSongs: [],
            overallCost: 0
        }
    }

    async componentDidMount(){
        let songs = []
        await fetch('http://192.168.1.101:3000/genres')
        .then(response => response.json())
        .then(response => {
            songs = response
        })
        .catch(err => console.log(err))
        this.setState({
            isLoading: false,
            songsList: songs,
            filteredSongs: songs
        })
    }

    static navigationOptions = {
        header: null
    }


    _keyExtractor = (item, index) => item.id
    
    setSearchText(event){
        let searchText = event.nativeEvent.text
        let songs = this.state.songsList
        text = searchText.trim().toLowerCase()
        let newFilteredSongs = songs.map(genre => {
            return genre
        }).map(data => {
            return {
                title: data.title,
                data: data.data.filter(item => {
                      // console.log(item.title.toLowerCase().match(text))
                      return item.title.toLowerCase().match(text)
                      })
            }
        })
        this.setState({ 
            filteredSongs: newFilteredSongs
        })
    }

    addSongToPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        if((actualPlaylist.filter(item => item.id !== song.id).length) == actualPlaylist.length){
            let actualCost = this.state.overallCost
            actualCost++
            let customHeight = this.state.customHeight
            customHeight += 50
            this.setState({
                choosenSongs: [...this.state.choosenSongs, song],
                overallCost: actualCost,
                customHeight: customHeight
            })
            Toast.show({
                text: `Dodano piosenkę: ${song.title}`,
                position: 'bottom',
                buttonText: 'OK'
            })
        } else {
            Toast.show({
                text: 'Już dodano tą piosenkę',
                position: 'bottom',
                buttonText: 'OK'
            })
        }

    }
    removeSongFromPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        let actualCost = this.state.overallCost
        actualCost--
        actualPlaylist = actualPlaylist.filter((item) => {
            return item.id !== song.id
        })
        this.setState({
            choosenSongs: actualPlaylist,
            overallCost: actualCost
        })
        console.log(this.state.choosenSongs)
    }

    
    render() {
        let _customHeight = {}
        let filteredSongsList = []
        if (this.state.isLoading){
            return (
                <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text>Loading...</Text>
                        <Spinner color='powderblue' />
                    </View>          
                </Container>
            )
        } else {
            if (this.state.filteredSongs.length > 0) {
                filteredSongsList = this.state.filteredSongs
            } else {
                filteredSongsList = []
            }
            return (
                <Container>
                    <Header searchBar rounded style={styles.headerBar} androidStatusBarColor={"powderblue"}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input 
                            placeholder="Szukaj"
                            value={this.state.searchText}
                            onChange={this.setSearchText.bind(this)}
                        />
                    </Item>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('SummaryView', this.state.choosenSongs)}><Icon style={{color: 'white'}} name="arrow-forward" /></Button>
                    </Right>
                </Header>
                <View style={{flex: 1}}>
                    <ScrollView>
                        <SectionList
                                sections={ filteredSongsList }
                        renderItem={({ item }) =>
                        <ListItem style={styles.listItem}>
                        <Text style={styles.item}>{item.author} - {item.title}</Text>
                        <Button light onPress={() => this.addSongToPlaylist(item)}>
                        <Icon name='ios-add' />
                        </Button>
                        </ListItem>
                        }
                        keyExtractor={(item, index) => item.id}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>}
                        />
                    </ScrollView>
                        <View style={[styles.placeholder ,{height: this.state.customHeight}]}></View>
                        <View style={[styles.bottomList, { height: this.state.customHeight }]}>
                        <View style={styles.bottomHeaderBar}>
                            <View style={styles.bottomHeaderItem}>
                                    <Text><Icon name="md-musical-notes" />  Playlista</Text>
                            </View>
                            <View style={styles.bottomHeaderItem}>
                                    <Text><Icon name="ios-cash-outline" />  Koszt: {this.state.overallCost} PLN</Text>
                            </View>
                        </View>
                        <ScrollView>
                        <FlatList
                          data={this.state.choosenSongs}
                                renderItem={({ item }) => 
                                <ListItem style={styles.listItem}>
                                    <Text>{item.author} - {item.title}</Text>
                                    <Button light onPress={() => this.removeSongFromPlaylist(item)}>
                                    <Icon name="ios-trash"/>
                                    </Button>
                                </ListItem>
                                }
                            />
                            </ScrollView>
                    </View>
                </View>
                </Container>
            );
        }        
    }
 }

const styles = StyleSheet.create({
    container: {
    },
    headerBar: {
        backgroundColor: 'powderblue',
        justifyContent: 'space-between'
    },
    bottomHeaderBar: {
        backgroundColor: 'powderblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    listItem: {
        justifyContent: 'space-between'
    },
    item: {
        padding: 10,
    },
    bottomHeaderItem: {
        padding: 10
    },
    bottomList: { 
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: '#F5F5F5',
        maxHeight: 200
    },
    placeholder: {
        maxHeight: 200        
    }
});
