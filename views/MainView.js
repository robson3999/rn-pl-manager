import React from 'react';
import { StyleSheet, SectionList } from 'react-native'
import { Container, Header, Body, Title, Item, Icon, Input, Content, Button, Text } from 'native-base';

export default class MainView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchText: null,
            songsList: [
                   { title: 'A', data: ['Abracadabra', 'Aaaaa'] },
                   { title: 'B', data: ['B is the title', 'BombsAway'] },
                   { title: 'D', data: ['Devin'] },
                   { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
                   { title: 'Z', data: ['ZZ TOP', 'Zimbabwe'] },
               ]
        }
    }

    static navigationOptions = {
        header: null
    }

    setSearchText(event){
        let searchText = event.nativeEvent.text
        this.setState({searchText})
        this.filterSongs(searchText)
    }

    filterSongs(searchText){
        if(searchText){
          let text = searchText.toLowerCase()
          return this.state.songsList.filter((s) => {
              console.log(s)
              return s == text
          })
        } else {
            return 0
        }

    }
    
    render() {
        
        return (
            <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input 
                        placeholder="Search"
                        value={this.state.searchText}
                        onChange={this.setSearchText.bind(this)}
                    />
                </Item>
            </Header>
            <Content>
            <SectionList
            sections={this.state.songsList}
            renderItem={({ item }) => <Button full light onPress={() => this.props.navigation.navigate('DetailView', item)}
                style={styles.item} 
                title={item}>
            <Text>{item}</Text>
            </Button>}
            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
            />
            </Content>
            </Container>
        );
    }
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 30,
        height: 64,
    },
});
