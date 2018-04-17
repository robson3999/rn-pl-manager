import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, NetInfo, ImageBackground, Image, Dimensions } from 'react-native'
import { Container, Content, Spinner, Header, Left, Body, Title, Button, Icon } from 'native-base'

const { height, width } = Dimensions.get('window');

export default class MoviesList extends Component {
    constructor(props){
        super()
    }

    static navigationOptions = {
        header: null
    }

    render(){
        return (
            <ImageBackground
                source={require('../../assets/bg_improved.png')}
                style={{ width: '100%', height: '100%' }}
            >
                <Header style={styles.headerBackground} androidStatusBarColor={"#000"}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MoviesHome')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ textAlign: 'center' }}>Wybierz gatunek</Title>
                    </Body>
                </Header>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedMoviesView')}>
                                <Image
                                    source={require('../../assets/movies/placeholder.png')}
                                    style={styles.button}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedMoviesView')}>
                                <Image
                                    source={require('../../assets/movies/placeholder.png')}
                                    style={styles.button}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedMoviesView')}>
                                <Image
                                    source={require('../../assets/movies/placeholder.png')}
                                    style={styles.button}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedMoviesView')}>
                                <Image
                                    source={require('../../assets/movies/placeholder.png')}
                                    style={styles.button}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedMoviesView')}>
                                <Image
                                    source={require('../../assets/movies/placeholder.png')}
                                    style={styles.button}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailedMoviesView')}>
                                <Image
                                    source={require('../../assets/movies/placeholder.png')}
                                    style={styles.button}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    button: {
        height: 0.25 * height,
        maxWidth: 0.4 * width,
        margin: 10,
    }
})