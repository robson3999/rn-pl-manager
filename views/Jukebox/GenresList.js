import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Content, Spinner, Header, Left, Body, Title, Button, Icon } from 'native-base'

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
        let url = 'http://192.168.1.112:8080/genre/list'
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
            })
    }

    parseGenresToList(data){
        let id = 0
        return data.map(genre => {
            return {
                id: ++id,
                title: genre.title,
                data: genre.data
            }
        })
    }

    async componentDidMount(){
        await this.fetchGenres()
    }

    _keyExtractor = (item, index) => item.id
    render() {
        const genresList = this.parseGenresToList(this.state.data).map(genre => (
                <TouchableOpacity key={genre.id} style={styles.button} onPress={() => this.props.navigation.navigate('DetailedSongsView', genre)}>
                    <Text style={styles.buttonText}>{genre.title}</Text>
                </TouchableOpacity>
        ))

        if(this.state.isLoading){
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text>Ładuję dane...</Text>
                    <Spinner />
                </View>
            )
        } else {
            return (
                <View>
                    <Header style={styles.headerBar} androidStatusBarColor={"#49a7cc"}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('Jukebox')}>
                                <Icon style={{ color: 'black' }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: 'black', textAlign: 'center' }}>Wybierz gatunek</Title>
                        </Body>
                    </Header>
                    <ScrollView>
                        <View style={styles.container}>
                            {genresList}
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listStyles: {
        // flex: 1,
    },
    headerBar: {
        backgroundColor: 'white',
        // justifyContent: 'space-between'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: '40%',
        margin: 10,
        // flex: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'teal'
    },
    buttonText: {
        fontSize: 21,
        color: 'white'
    }
})