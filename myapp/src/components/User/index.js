import React,{Component} from "react"
import "./index.css"
import {connect} from "react-redux"

class User extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="User">
			<div className="container">
			
			{
				this.props.children
			}
			</div>
			</div>
		)
	}
	componentWillMount(){
		this.props.bottom_active()
		this.props.hideNav()
		
	}
}
export default connect(null,{bottom_active:()=>{
	return {type:"bottom_active",payload:3}
},hideNav:()=>{
	return {type:"hideNav",payload:true}
}})(User)