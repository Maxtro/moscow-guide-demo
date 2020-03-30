import React, { useEffect } from 'react'
import Result from './Result'
import { connect } from 'react-redux'
import { getPlacesPopular } from '../redux/placesReducer'
import { saveFavorite } from '../redux/favoriteReducer'
import { getPlaces, getIsLoading, getTextHeader } from '../redux/selectors'

const ResultContainer = (props) => {

    const { getPlacesPopular, saveFavorite } = props;
    
    useEffect(() => {
        let query = ''
        getPlacesPopular(query)
        saveFavorite('') 
    }, [getPlacesPopular, saveFavorite])

    
        return <>
            {<Result {...props} />}
        </>

}

let mapStateToProps = (state) => {
    return {
        popularPlaces: getPlaces(state),
        isLoading: getIsLoading(state),
        textHeader: getTextHeader(state),
    }
}

export default connect(mapStateToProps, { getPlacesPopular, saveFavorite })(ResultContainer)