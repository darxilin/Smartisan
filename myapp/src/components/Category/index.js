import React,{Component} from "react"
import "./index.css"
import Nav from "../Common/Nav"
import {connect} from "react-redux"

class Category extends Component{
	render(){
		return (
			<div className="Category">
			<Nav>
				分类
			</Nav>
			<div className="container">
				分类
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
	return {type:"bottom_active",payload:1}
},hideNav:()=>{
	return {type:"hideNav",payload:true}
}})(Category)