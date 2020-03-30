import React from 'react'
import Favorite from './Favorite'
import { connect } from 'react-redux'
import { getFavorite, deleteFavorite, saveFavorite } from '../redux/favoriteReducer'
import { getPlacesPopular } from '../redux/placesReducer'
import { getFavoritePlaces, getIsRedirect, getPlaces, getIsLoading } from './../redux/selectors'


class FavoriteContainer extends React.Component {

    componentDidMount(){
        this.props.getFavorite()
    }

    componentDidUpdate(prevProps){
        if(prevProps.favoritePlace !== this.props.favoritePlace){
            let query = this.props.favoritePlace.length !== 0 && this.props.favoritePlace ? this.props.favoritePlace[Math.floor(Math.random() * this.props.favoritePlace.length )].categories : ''
            if(this.props.favoritePlace.length !== 0 && this.props.favoritePlace) this.props.getPlacesPopular(query !== null ? query : '', false) 
        }
    }

    render(){
        return <Favorite {...this.props} />
    }
}

let mapStateToProps = (state) => {
    
    return {
        favoritePlace: getFavoritePlaces(state),
        isRedirect: getIsRedirect(state),
        placesTips: getPlaces(state),
        isLoading: getIsLoading(state)
    }
}

export default connect(mapStateToProps, { 
    getFavorite, deleteFavorite, getPlacesPopular, saveFavorite })
    (FavoriteContainer)