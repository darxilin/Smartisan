import React,{Component} from "react"
import "./index.css"

class Nav extends Component{
	render(){
		return (
			<div className="Nav">
			{
				this.props.children
			}
			</div>
		)
	}
}
export default Nav