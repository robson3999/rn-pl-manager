import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Content, Spinner } from 'native-base'

let songs

export default class GenresList extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            data: []
        }
    }
    static navigationOptions = {
        title: "Gatunki"
    }
    async fetchGenres(){
        url = 'https://my-json-server.typicode.com/robson3999/songs-db/genres'
        // let url = 'http://192.168.1.101:8080/genre/list'
        await fetch(url)
            .then(response => {
                if (response.ok)
                 response.json().then(resp => {
                     this.setState({ data: resp })
                     console.log(this.state.data)
                    })
                else 
                 this.setState({ isLoading: false })
                this.setState({ isLoading: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    async componentDidMount(){
        await this.fetchGenres()
    }

    _keyExtractor = (item, index) => item.id
    render() {
        const genres = [
            { id: 1, title: "rock" },
            { id: 2, title: "metal" },
            { id: 3, title: "pop" },
            { id: 4, title: "classic" },
            { id: 5, title: "rap" },
            { id: 6, title: "folk" },
        ]
        const genresList = genres.map(genre => (
                <TouchableOpacity key={genre.id} style={styles.button} onPress={() => this.props.navigation.navigate('Jukebox')}>
                    <Text style={styles.buttonText}>{genre.title}</Text>
                </TouchableOpacity>
        ))

        if(this.state.isLoading){
            return (
                <Container>
                    <Content>
                        <Text>Ładuję dane...</Text>
                        <Spinner />
                    </Content>
                </Container>
            )
        } else {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        {genresList}
                    </View>
                </ScrollView>
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