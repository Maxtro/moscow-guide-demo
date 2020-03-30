import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { getPlacesPopular } from '../redux/placesReducer'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { getFavoriteArrayLength, getIsRedirect } from '../redux/selectors'

const SearchForm = reduxForm({form: 'search'})(Header)

const HeaderContainer = (props) => {
   
    const onSubmit = (data) => {
        props.getPlacesPopular(data.query, true)
    }

    return <SearchForm onSubmit={onSubmit} favorite={props.favorite} />
}

let mapStateToProps = (state) => {
    return {
        favorite: getFavoriteArrayLength(state),
        isRedirect: getIsRedirect(state)
    }
}



export default compose(
    connect(mapStateToProps, { getPlacesPopular }),
    )(HeaderContainer)