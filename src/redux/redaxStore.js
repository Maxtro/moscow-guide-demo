import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import placesReduser from './placesReducer'
import favoriteReducer from './favoriteReducer'
import { reducer as formReducer } from 'redux-form'


let redusers = combineReducers({
    placeResult: placesReduser,
    favorite: favoriteReducer,
    form: formReducer,
})

let store = createStore(redusers, applyMiddleware(thunkMiddleware))

export default store

