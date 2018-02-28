import React from 'react'
import { StyleSheet, ScrollView, FlatList, View } from 'react-native'
import { Container, Header, Content, Left, Body, ListItem, Text, Title, Button, H1, Card, CardItem, Icon } from 'native-base';



export default class DetailView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenSongs: props.navigation.state.params
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        console.log(this.state)
        console.log(this.props)
    }
    removeSongFromPlaylist(song){
        let actualPlaylist = this.state.choosenSongs
        // let actualCost = this.state.overallCost
        // actualCost--
        actualPlaylist = actualPlaylist.filter((item) => {
            return item.id !== song.id
        })
        this.setState({
            choosenSongs: actualPlaylist,
            // overallCost: actualCost
        })
        console.log(this.state.choosenSongs)
    }

    render() {
        return (
            <Container>
                <Header style={styles.headerBar} androidStatusBarColor={"powderblue"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MainView')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Podsumowanie</Title>
                    </Body>
                </Header>
                <View>
                        <ScrollView>
                            <FlatList
                                data={this.state.choosenSongs}
                                renderItem={({ item }) =>
                                    <ListItem style={styles.listItem}>
                                        <Text>{item.author} - {item.title}</Text>
                                        <Button light onPress={() => this.removeSongFromPlaylist(item) }>
                                            <Icon name="ios-trash" />
                                        </Button>
                                    </ListItem>
                                }
                            />
                        </ScrollView>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    headerBar: {
        backgroundColor: 'powderblue',
        justifyContent: 'space-between'
    },
    listItem: {
        justifyContent: 'space-between'
    },
})