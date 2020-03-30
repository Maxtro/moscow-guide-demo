import { favoriteAPI } from '../api/api'
import { getPlacesPopular } from './placesReducer'

let SET_FAVORITE_PLACE = 'favorite/SET_FAVORITE_PLACE'
let GET_FAVORITE_PLACE = 'favorite/GET_FAVORITE_PLACE'


let initialState = {
    favoritePlace: [],
}

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_FAVORITE_PLACE: {
            return { ...state, favoritePlace: action.newFavorite ? [...action.newFavorite] : initialState.favoritePlace }
        }

        case GET_FAVORITE_PLACE: {
            return { ...state, favoritePlace: [...action.newFavoritePlace] }
        }

        default:
            return state
    }

}

export const setFavoritePlace = (favorite) => ({ type: SET_FAVORITE_PLACE, newFavorite: favorite })
export const getFavoritePlace = (favoriteArray) => ({ type: GET_FAVORITE_PLACE, newFavoritePlace: favoriteArray })

export const saveFavorite = (favorite) => {

    return (dispatch) => {
        let favoriteArray = []
        favoriteAPI.getFavorite() ? favoriteArray = favoriteAPI.getFavorite() : favoriteArray = []

        if (favorite === '') {
            dispatch(setFavoritePlace(favoriteArray))
        } else {
            favoriteArray.push(favorite)
            favoriteAPI.setFavorite(favoriteArray)
            favoriteArray = favoriteAPI.getFavorite()
            dispatch(setFavoritePlace(favoriteArray))
        }
    }
}

export const getFavorite = () => {

    return (dispatch) => {
        let newFavoriteArray = []
        favoriteAPI.getFavorite() ? newFavoriteArray = favoriteAPI.getFavorite() : newFavoriteArray = []
        dispatch(getFavoritePlace(newFavoriteArray))
        let query = ''
        getPlacesPopular(query, false)

    }
}

export const deleteFavorite = (idPlace) => {

    return (dispatch) => {
        let deleteArray = []
        favoriteAPI.getFavorite() ? deleteArray = favoriteAPI.getFavorite() : deleteArray = []
        deleteArray.splice(idPlace, 1)
        favoriteAPI.setFavorite(deleteArray)
        dispatch(getFavoritePlace(deleteArray))
    }
}

export default favoriteReducer