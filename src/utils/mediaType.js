export const isAudioDrama = (id) => {
    const arr = [1, 4, 5]
    if (arr.includes(id)) {
        return true;
    }
    else {
        return false
    }
}
export const isAudioBook = (id) => {
    const arr = [2]
    if (arr.includes(id)) {
        return true;
    }
    else {
        return false
    }
}
export const isPodcast = (id) => {
    const arr = [3]
    if (arr.includes(id)) {
        return true;
    }
    else {
        return false
    }
}