import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import placesReduser from './placesReducer'
import favoriteReducer from './favoriteReducer'
import { reducer as formReducer } from 'redux-form'


let rootReduser = combineReducers({
    placeResult: placesReduser,
    favorite: favoriteReducer,
    form: formReducer,
})

type ReduserType = typeof rootReduser
export type StateType = ReturnType<ReduserType>

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

export default store

