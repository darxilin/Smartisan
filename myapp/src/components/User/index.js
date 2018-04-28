import React,{Component} from "react"
import "./index.css"

class User extends Component{
	render(){
		return (
			<div className="User">
			User
			{
				this.props.children
			}
			</div>
		)
	}
}
export default User