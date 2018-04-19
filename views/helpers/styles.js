import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');
const textColor = '#FAE2EE'

export const activityHomeStyles = StyleSheet.create({
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
    listItemTitle: { 
        color: textColor, 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    listItemAuthorContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%' 
    },
    listItemAuthor: { 
        color: textColor, 
        fontSize: 16 
    },
    bottomBlurredBorder: {
        backgroundColor: "#B53694",
        height: 2,
        opacity: 0.5,
        elevation: 2,
        width: '100%'
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

export const homeScreenStyles = StyleSheet.create({
    headerBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'black'
    },
    mainTile: {
        maxWidth: 0.78 * width,
        maxHeight: 0.78 * width
    },
    smallTile: {
        maxWidth: 0.35 * width,
        maxHeight: 0.35 * width,
        margin: 20
    },
    tilesRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        maxHeight: 0.4 * width
    }
})

export const jukeboxCustomItemStyles = StyleSheet.create({
    listItem: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        elevation: 2,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        borderBottomWidth: 0
    },
    cardAligment: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    itemTitle: {
        color: textColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemPrice: {
        color: textColor,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    itemAuthor: {
        color: textColor, 
        fontSize: 16 
    }
});

export const detailedViewStyles = StyleSheet.create({
    headerBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    item: {
        maxWidth: '80%',
        fontSize: 16
    },
    modal: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


