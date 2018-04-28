import React from "react"
//import {Switch} from "react-router"
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import Cart from "../components/Cart"
import Category from "../components/Category"
import Detail from "../components/Common/Detail"
import Index from "../components/Index"
import User from "../components/User"
import Login from "../components/User/Login"
import Regist from "../components/User/Regist"
import App from "../App"
import {Provider} from "react-redux"
import store from "../store"

const router = (
	<Provider store={store}>
	<Router>
		<App>
			<Switch>

				
				<Route path="/cart" component={Cart}/>
				<Route path="/category" component={Category}/>
				<Route path="/user" render={()=>
					<User>
						<Switch>
							<Route path="/user/login" component={Login}/>
							<Route path="/user/regist" component={Regist}/>
							<Redirect from="/user" to="/user/login"/>
						</Switch>
					</User>
				}/>
				<Route path="/item" component={Detail}/>
				<Route path="/index" component={Index}/>
                <Redirect path="*" to="/index"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)
export default router