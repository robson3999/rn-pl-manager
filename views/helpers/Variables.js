export const BASE_URL = 'http://192.168.1.77:8080'

const parseMilisecondsToTime = (time) => {
    return new Date(time).getMinutes().toString() + ":" + (new Date(time).getSeconds() < 10 ? '0' : '').toString() + new Date(time).getSeconds()
}

const parseActualSongTime = songTime => parseMilisecondsToTime(songTime)

const parseTotalSongTime = songTime => parseMilisecondsToTime(songTime)

const computeProgress = (completed, actual) => {
    return actual / completed
}

export { parseMilisecondsToTime, parseActualSongTime, parseTotalSongTime, computeProgress }