import {createStore,combineReducers,applyMiddleware} from "redux"
import promise from "redux-promise"

var changeTitle = (state="小米商城",action)=>{
	let {type,payload} = action;
	if(type=="changeTitle"){
		return payload;
		
	}else if(type=="normal"){
		console.log(payload)
		return payload
	}
	else{
		return state
	}
}
var showNav = (state="true",action)=>{
	let {type,payload} = action;
	if(type=="hideNav"){
		return payload;
		
	}
	else{
		return state
	}
}
var bottom_active = (state=0,action)=>{
	let {type,payload} = action;
	if(type=="bottom_active"){
		return payload;
		
	}
	else{
		return state
	}
}
var reducer =combineReducers({
	changeTitle,
	showNav,
	bottom_active
})


let store = createStore(reducer,applyMiddleware(promise))
export default store