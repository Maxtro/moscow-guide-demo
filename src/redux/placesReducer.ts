import { resultsAPI } from '../api/api'
import cogoToast from 'cogo-toast'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { StateType } from './redaxStore'

let SET_PLACES_POPULAR = 'places/SET_PLACES_QUERY'
let SET_DETAIL_PLACE = 'places/SET_DETAIL_PLACE'
let IS_LOADING = 'places/IS_LOADING'
let HEADER_TEXT_CHANGE = 'places/HEADER_TEXT_CHANGE'
let IS_REDIRECT = 'places/IS_REDIRECT'

export type placeDetailType = {
    id: string
    name: string
    location: {
        address: string
        lat: number | null
        lng: number | null
        formattedAddress: Array<string>
    }
    categories: Array<string>
}

let initialState = {
    placeData: [] as Array<placeDetailType> ,
    placeDetail: {
        id: '',
        name: '',
        location: {
            address: '',
            lat: null as number | null,
            lng: null as number | null,
            formattedAddress: [] as Array<string>
        },
        categories: [] as Array<string>
    },
    isLoading: false,
    textHeader: '',
    isRedirect: false
}

type initialStateType = typeof initialState

const placesReduser = (state = initialState, action: ActionType):initialStateType => {

    switch (action.type) {

        case SET_PLACES_POPULAR: {
            return { ...state, placeData: action.newVenues }
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

type ActionType = setPlacesResultType & setDetailPlaceType & setIsLoadingType & setHeaderTextType & setRedirectType
type DispatchType = setPlacesResultType | setDetailPlaceType | setIsLoadingType | setHeaderTextType | setRedirectType
export type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionType>


type setPlacesResultType = {
    type: typeof SET_PLACES_POPULAR
    newVenues: Array<placeDetailType>
}
const setPlacesResult = (result: Array<placeDetailType>):setPlacesResultType => ({ type: SET_PLACES_POPULAR, newVenues: result })

type setDetailPlaceType = {
    type: typeof SET_DETAIL_PLACE
    placeDetail: placeDetailType
}
const setDetailPlace = (place: placeDetailType):setDetailPlaceType => ({ type: SET_DETAIL_PLACE, placeDetail: place })

type setIsLoadingType = {
    type: typeof IS_LOADING
    isLoading: boolean
}
const setIsLoading = (isLoading: boolean):setIsLoadingType => ({ type: IS_LOADING, isLoading })

type setHeaderTextType = {
    type: typeof HEADER_TEXT_CHANGE
    textHeader: string
}
const setHeaderText = (textHeader: string):setHeaderTextType => ({ type: HEADER_TEXT_CHANGE, textHeader })

type setRedirectType = {
    type: typeof IS_REDIRECT
    redirect: boolean
}
const setRedirect = (redirect: boolean): setRedirectType => ({ type: IS_REDIRECT, redirect })

export const getPlacesPopular = (query: string, redirect: boolean): ThunkType => async (dispatch: Dispatch<DispatchType>) => {
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
            cogoToast.error('Что-то пошло не так!', { position: 'top-center' })
        }
    }


export const getPlaceDetail = (placeId: string): ThunkType => async (dispatch: Dispatch<DispatchType>) => {
        dispatch(setIsLoading(true))
        try{
        let response = await resultsAPI.getDetailPlace(placeId)
            dispatch(setDetailPlace(response.data.response.venue))
            dispatch(setIsLoading(false))
        } catch(error){
            cogoToast.error('Что-то пошло не так!', { position: 'top-center' })
        }
    }


export default placesReduser