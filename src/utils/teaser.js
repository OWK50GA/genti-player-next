const liked_teaser = []
const played_teaser = []


export const setDefaultTeaser = () => {
    const likedTeaser = localStorage.getItem('user_liked_teaser')
    const playedTeaser = localStorage.getItem('user_played_teaser')
    if (!likedTeaser) {
        localStorage.setItem("user_liked_teaser", JSON.stringify(liked_teaser))
    }
    if (!playedTeaser) {
        localStorage.setItem("user_played_teaser", JSON.stringify(played_teaser))

    }
}

// export const userLikedTeaser = JSON.parse(localStorage.getItem('user_liked_teaser'))
// export const userPlayedTeaser = JSON.parse(localStorage.getItem('user_played_teaser'))


// export const setUserLikedTeaser = (id) => {
//     if (!userLikedTeaser.includes(id)) {
//         userLikedTeaser.push(id)
//         localStorage.setItem("user_liked_teaser", userLikedTeaser)
//     }
// }

// export const setUserPlayedTeaser = (id) => {
//     if (!userPlayedTeaser.includes(id)) {
//         userPlayedTeaser.push(id)
//         localStorage.setItem("user_played_teaser", userPlayedTeaser)
//     }
// }