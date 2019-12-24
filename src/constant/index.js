
export let serverURL = 'https://dnguyen-combo-manager.herokuapp.com'
// if(process.env.NODE_ENV === 'development') {
//     serverURL = 'http://localhost:3000'
// }
export const RankURL = 'https://safe-caverns-44957.herokuapp.com/API/Rank/GetAllRank?fbclid=IwAR0TkTWszWKE4GXIPvLpVLk_8C8H6LCYhu5TY5vUbXq2IAh1pJbON87ijrs'

export const limitDelete = 2; // year limit delete 
export const formatOfDateFromDB = 'YYYY/MM/DD'
export const dateFormat = 'DD/MM/YYYY'

export const services = [
    'food','move','shopping','bike'
]
export const persentList = Array.from({length: 11}, (_, i) => i * 10)
