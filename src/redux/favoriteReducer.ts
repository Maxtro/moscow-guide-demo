import { favoriteAPI } from '../api/api'
import { getPlacesPopular } from './placesReducer'
import cogoToast from 'cogo-toast'
import { Dispatch } from 'redux'

let SET_FAVORITE_PLACE: string = 'favorite/SET_FAVORITE_PLACE'
let GET_FAVORITE_PLACE: string = 'favorite/GET_FAVORITE_PLACE'

type initialStateType = {
    favoritePlace: Array<string>
}

let initialState: initialStateType = {
    favoritePlace: [],
}

const favoriteReducer = (state = initialState, action: ActionType):initialStateType => {
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

type ActionType = setFavoritePlaceType & getFavoritePlaceType
type DispatchType = setFavoritePlaceType | getFavoritePlaceType

type setFavoritePlaceType =  {
    type: typeof SET_FAVORITE_PLACE
    newFavorite: Array<string>
}
export const setFavoritePlace = (favorite: Array<string>):setFavoritePlaceType => ({ type: SET_FAVORITE_PLACE, newFavorite: favorite })

type getFavoritePlaceType = {
    type: typeof GET_FAVORITE_PLACE
    newFavoritePlace: Array<string>
}
export const getFavoritePlace = (favoriteArray:Array<string>):getFavoritePlaceType => ({ type: GET_FAVORITE_PLACE, newFavoritePlace: favoriteArray })

export const saveFavorite = (favorite: any) => {

    return (dispatch: Dispatch<DispatchType>) => {
        let favoriteArray = []
        favoriteAPI.getFavorite() ? favoriteArray = favoriteAPI.getFavorite() : favoriteArray = []
        if (favorite === '') {
            dispatch(setFavoritePlace(favoriteArray))
        } else {
            if(favoriteArray.find((f:any) => f.id === favorite.id) === undefined){
                favoriteArray.unshift(favorite)
                favoriteAPI.setFavorite(favoriteArray)
                favoriteArray = favoriteAPI.getFavorite()
                dispatch(setFavoritePlace(favoriteArray))
                cogoToast.success('Добавлено в избранное', { position: 'top-center' })
            }else{
                cogoToast.error('Уже есть в избранном', { position: 'top-center' })
            }
        }
    }
}

export const getFavorite = () => {

    return (dispatch: Dispatch<DispatchType>) => {
        let newFavoriteArray = []
        favoriteAPI.getFavorite() ? newFavoriteArray = favoriteAPI.getFavorite() : newFavoriteArray = []
        dispatch(getFavoritePlace(newFavoriteArray))
        let query = ''
        getPlacesPopular(query, false)

    }
}

export const deleteFavorite = (idPlace: string) => {

    return (dispatch: Dispatch<DispatchType>) => {
        let deleteArray = []
        favoriteAPI.getFavorite() ? deleteArray = favoriteAPI.getFavorite() : deleteArray = []
        deleteArray.splice(idPlace, 1)
        favoriteAPI.setFavorite(deleteArray)
        dispatch(getFavoritePlace(deleteArray))
    }
}

export default favoriteReducer