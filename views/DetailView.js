import React from 'react'
import { Container, Header, Body, Left, Title, Content, Icon, Button, Text, Card, CardItem, H1 } from 'native-base';



export default class DetailView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            songTitle: props.navigation.state.params
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount(){
        console.log(this.state)
        console.log(this.props)
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('MainView')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Choosen song</Title>
                    </Body>
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <H1>{ this.state.songTitle }</H1>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                 Lorem ipsumblbalb ablbl albablblal balbalbl abblalb blab bla
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button rounded success><Text>Order this song!</Text></Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}