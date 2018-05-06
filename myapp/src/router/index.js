import React from "react"
//import {Switch} from "react-router"
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import Cart from "../components/Cart"
import Category from "../components/Category"
import Detail from "../components/Common/Detail"
import Index from "../components/Index"
import User from "../components/User"
import Login from "../components/User/Login"
import Order from "../components/User/Order"
import Regist from "../components/User/Regist"
import My from "../components/User/My"
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
							<Route path="/user/my" component={My}/>
							<Route path="/user/order" component={Order}/>
							<Redirect from="/user" to="/user/my"/>
						</Switch>
					</User>
				}/>
				<Route path="/item/:id" component={Detail}/>
				<Route path="/index" component={Index}/>
                <Redirect path="*" to="/index"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)
export default router