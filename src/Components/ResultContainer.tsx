import React, { useEffect } from 'react'
import Result from './Result'
import { connect } from 'react-redux'
import { getPlacesPopular, placeDetailType} from '../redux/placesReducer'
import { saveFavorite } from '../redux/favoriteReducer'
import { getPlaces, getIsLoading, getTextHeader } from '../redux/selectors'
import { StateType } from '../redux/redaxStore'

type MapStateToPropsType = {
    popularPlaces: Array<placeDetailType>
    isLoading: boolean
    textHeader: string
}

type MapDispatchToPropsType = {
    getPlacesPopular: any
    saveFavorite: (favorite: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const ResultContainer: React.FC<PropsType> = (props) => {

    const { getPlacesPopular, saveFavorite } = props;
    
    useEffect(() => {
        let query = ''
        let favorite = ''
        getPlacesPopular(query)
        saveFavorite(favorite) 
    }, [getPlacesPopular, saveFavorite])


        return <>
            {<Result  {...props} />}
        </>

}

let mapStateToProps = (state: any): MapStateToPropsType => {
    return {
        popularPlaces: getPlaces(state),
        isLoading: getIsLoading(state),
        textHeader: getTextHeader(state),
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, StateType >(mapStateToProps, { getPlacesPopular, saveFavorite })(ResultContainer)