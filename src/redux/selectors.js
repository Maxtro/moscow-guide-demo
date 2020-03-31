export const getPlaces = (state) => {
    return state.placeResult.placeData
}

export const getIsLoading = (state) => {
    return state.placeResult.isLoading
}

export const getTextHeader = (state) => {
    return state.placeResult.textHeader
}

export const getIsRedirect = (state) => {
    return state.placeResult.isRedirect
}

export const getDetailPlace = (state) => {
    return state.placeResult.placeDetail
}

export const getFavoriteArrayLength = (state) => {
    return state.favorite.favoritePlace.length
}

export const getFavoritePlaces = (state) => {
    return state.favorite.favoritePlace
}
