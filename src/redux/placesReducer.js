import { resultsAPI } from './../api/api'
import cogoToast from 'cogo-toast'

let SET_PLACES_POPULAR = 'places/SET_PLACES_QUERY'
let SET_DETAIL_PLACE = 'places/SET_DETAIL_PLACE'
let IS_LOADING = 'places/IS_LOADING'
let HEADER_TEXT_CHANGE = 'places/HEADER_TEXT_CHANGE'
let IS_REDIRECT = 'places/IS_REDIRECT'

let initialState = {
    placeData: [],
    placeDetail: {},
    isLoading: false,
    textHeader: '',
    isRedirect: false
}

const placesReduser = (state = initialState, action) => {

    switch (action.type) {

        case SET_PLACES_POPULAR: {
            return { ...state, placeData: [...action.newVenues] }
        }

        case IS_LOADING: {
            return { ...state, isLoading: action.isLoading }
        }

        case HEADER_TEXT_CHANGE: {
            return { ...state, textHeader: action.textHeader }
        }

        case SET_DETAIL_PLACE: {
            return { ...state, placeDetail: action.placeDetail }
        }

        case IS_REDIRECT: {
            return { ...state, isRedirect: action.redirect }
        }


        default:
            return state

    }
}

const setPlacesResult = (result) => ({ type: SET_PLACES_POPULAR, newVenues: result })
const setDetailPlace = (place) => ({ type: SET_DETAIL_PLACE, placeDetail: place })
const setIsLoading = (isLoading) => ({ type: IS_LOADING, isLoading })
const setHeaderText = (textHeader) => ({ type: HEADER_TEXT_CHANGE, textHeader })
const setRedirect = (redirect) => ({ type: IS_REDIRECT, redirect })


export const getPlacesPopular = (query, redirect) => async (dispatch) => {
        dispatch(setHeaderText(''))
        dispatch(setIsLoading(true))
        dispatch(setRedirect(redirect))
        try{
        let response =  await resultsAPI.getResults(query)
            dispatch(setPlacesResult(response.data.response.venues))
            dispatch(setIsLoading(false))
            response.data.response.venues.length === 0 ? dispatch(setHeaderText('НИЧЕГО НЕ НАЙДЕНО')) : dispatch(setHeaderText('ВОТ ЧТО УДАЛОСЬ НАЙТИ'))
            if (response.data.response.venues.length !== 0 && query === '') dispatch(setHeaderText('ПОПУЛЯРНЫЕ МЕСТА'))
            dispatch(setRedirect(false))
        } catch(error){
            cogoToast.error('Что-то пошло не так!', { position: 'bottom-center' })
        }
    }


export const getPlaceDetail = (placeId) => async (dispatch) => {
        dispatch(setIsLoading(true))
        try{
        let response = await resultsAPI.getDetailPlace(placeId)
            dispatch(setDetailPlace(response.data.response.venue))
            dispatch(setIsLoading(false))
        } catch(error){
            cogoToast.error('Что-то пошло не так!', { position: 'bottom-center' })
        }
    }


export default placesReduser