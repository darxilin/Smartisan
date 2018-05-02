import React,{Component} from "react"
import "./index.css"
import Nav from "../Common/Nav"

class User extends Component{
	render(){
		return (
			<div className="User">
			<Nav>
				个人中心
			</Nav>
			<div className="container">
				用户信息界面
			</div>
			{
				this.props.children
			}
			</div>
		)
	}
}
export default User