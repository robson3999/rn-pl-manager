import { Toast } from 'native-base';

const showSuccessBoughtMovie = () => {
    Toast.show({
        text: 'Kupiono wybrany film',
        position: 'bottom',
        buttonText: 'OK',
    })
};

const showFailedBoughtMovie = () => {
    Toast.show({
        text: 'Nie udało się kupić wybranego filmu',
        position: 'bottom',
        buttonText: 'OK',
        duration: 3000
    })
};

const showSuccessBoughtSong = () =>{
    Toast.show({
        text: 'Kupiono wybraną piosenkę',
        position: 'bottom',
        buttonText: 'OK',
    })
};

const showFailedBoughtSong = () => {
    Toast.show({
        text: 'Nie udało się kupić piosenki',
        position: 'bottom',
        buttonText: 'OK',
        duration: 3000
    })
}

const showAlreadyAddedSong = () =>{
    Toast.show({
        text: 'Ta piosenka została już dodana',
        position: 'bottom',
        buttonText: 'OK',
    })
}

export { showFailedBoughtMovie, showSuccessBoughtMovie, showFailedBoughtSong, showSuccessBoughtSong };