import  React, { Component } from 'react'
import { View, FlatList, StyleSheet, ScrollView } from 'react-native'
import {
    Container,
    Header,
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
        console.log(testSongs)
    }
    increaseProgress(){
        let newProg = this.state.progress + 0.1
        this.setState({
            progress: newProg
        })
    }
    render () {
        

        return (
            <Container>
                <View style={styles.nowPlayingCard}>
                    <CardItem header>
                        <H1>Aktualnie gramy</H1>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <View style={styles.songPlayingIconBox}>
                                <Icon name="ios-musical-notes-outline" style={{ fontSize: 54 }} />
                            </View>
                            <Body>
                                <H3>Tytul</H3>
                                <Text>Wykonawca</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <Progress.Bar progress={this.state.progress}
                        indeterminate={this.state.indeterminate} width={null} color="black" />
                    <CardItem footer>
                        <View>
                            <H3>Następne w kolejce:</H3>
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
                                <ListItem><Text>{item.item.author} - {item.item.title}</Text></ListItem>
                                }
                        />
                        </ScrollView>                        
                    </View>
                    </Content>
                    <View style={styles.footer}>
                        <Button bordered dark onPress={
                        () => this.props.navigation.navigate('SongsList')
                        }>
                            <Text>
                                Zamów piosenkę
                            </Text>
                        </Button>
                    </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    songPlayingIconBox: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    nowPlayingCard: {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1
    },
    nextSongsList: {
        padding: 10,
        backgroundColor: 'white'
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        maxHeight: 200,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    }
 })