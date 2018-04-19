export const BASE_URL = 'http://192.168.1.77:8080'

function parseMilisecondsToTime(time) {
    return new Date(time).getMinutes().toString() + ":" + (new Date(time).getSeconds() < 10 ? '0' : '').toString() + new Date(time).getSeconds()
}

function parseActualSongTime(songTime) {
    return parseMilisecondsToTime(songTime)
}
function parseTotalSongTime(songTime) {
    return parseMilisecondsToTime(songTime)
}

function computeProgress(completed, actual){
    let progress = actual / completed
    return progress
}

export { parseMilisecondsToTime, parseActualSongTime, parseTotalSongTime, computeProgress }