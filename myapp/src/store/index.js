import {createStore,combineReducers,applyMiddleware} from "redux"
import redux_promise from "redux-promise"
const reducer =(prestate,action)=>{
	
}

let store = createStore(reducer,applyMiddleware(redux_promise))
export default store