import { StateType } from "./redaxStore"

export const getPlaces = (state: StateType) => {
    return state.placeResult.placeData
}

export const getIsLoading = (state: StateType) => {
    return state.placeResult.isLoading
}

export const getTextHeader = (state: StateType) => {
    return state.placeResult.textHeader
}

export const getIsRedirect = (state: StateType) => {
    return state.placeResult.isRedirect
}

export const getDetailPlace = (state: StateType) => {
    return state.placeResult.placeDetail
}

export const getFavoriteArrayLength = (state: StateType) => {
    return state.favorite.favoritePlace.length
}

export const getFavoritePlaces = (state: StateType) => {
    return state.favorite.favoritePlace
}

