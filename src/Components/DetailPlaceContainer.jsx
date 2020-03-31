import React, { useEffect } from 'react'
import DetailPlace from './DetailPlace'
import { getPlaceDetail } from '../redux/placesReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { saveFavorite } from '../redux/favoriteReducer'
import { compose } from 'redux'
import { getDetailPlace, getIsLoading, getIsRedirect } from './../redux/selectors'

const DetailPlaceContainer = (props) => {

    const { getPlaceDetail, saveFavorite } = props;
    let placeId = props.match.params.placeId

    useEffect(() => {
       getPlaceDetail(placeId)
       saveFavorite('')
    }, [getPlaceDetail, saveFavorite, placeId])

        return <DetailPlace {...props} />
}

let mapStateToProps = (state) => {

    return {
        detailPlace: getDetailPlace(state),
        isLoading: getIsLoading(state),
        isRedirect: getIsRedirect(state)
    }
}

export default compose(
    connect(mapStateToProps, { getPlaceDetail, saveFavorite }), 
    withRouter
    )(DetailPlaceContainer)
