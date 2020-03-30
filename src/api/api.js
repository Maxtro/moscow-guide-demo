import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://api.foursquare.com/v2/venues/',
})

const client = {
    clientCode: 'client_secret=2OGXWCC0UM4ATFO5GTAN0SMCMQ5LXTTXGK2JMBTGHHKMKI4U&client_id=JVHYPBA5DG2GPTTKZT4WZTALYNMDCEO0Q4ZVQC2JSWUROWVW'
}

export const resultsAPI = {

    getResults(query = '') {
        return instance.get(`search?near=Moscow&query=${query}&v=20150214&m=foursquare&${client.clientCode}&limit=50`)
    },

    getDetailPlace(placeId) {
        return instance.get(`${placeId}?${client.clientCode}&v=20150214`)
    }

}

export const favoriteAPI = {
    setFavorite(favObj) {
        localStorage.setItem('favorite', JSON.stringify(favObj))
    },

    getFavorite() {
        return JSON.parse(localStorage.getItem('favorite'))
    }
}
