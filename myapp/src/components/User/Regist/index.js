import React,{Component} from "react"
import "./index.css"
import Nav from "../../Common/Nav"
import axios from "axios"
import {Icon,message} from "antd"

class Regist extends Component{
	constructor(){
		super()
		this.state={
			isagree:false
		}
	}
	render(){
		return (
			<div className="Regist">
			<Nav>
			<span onClick={this.go_back.bind(this)}><Icon type="left"/></span>
			注册
			</Nav>
			<div className="regist_box">
				<input type="number" placeholder="请输入手机号" required="required" ref="username"/>
				<input type="password" placeholder="请输入密码" required="required" ref="password"/>
				<p onClick={this.isagree.bind(this)}><span className={this.state.isagree?"agree":""}><Icon type="check-circle" /></span>我已阅读并同意遵守<b>法律声明</b>和<b>隐私条款</b></p>
				<input type="button" value="注册" className={this.state.isagree?"regist":""} onClick={this.regist.bind(this)}/>
			</div>
			</div>
		)
	}
	go_back(){
		this.props.history.go(-1)
	}
	isagree(){
		this.setState({
			isagree:!this.state.isagree
		})
	}
	regist(){
		let username = this.refs.username.value;
		let password = this.refs.password.value;
		if(this.state.isagree){
			if(username && password) {
				axios.post("/user_regist/register", {
					username: username,
					password: password
				}).then(res => {
					if(res.data == 1){
						message.success("注册成功！",2,()=>{
							this.props.history.push("/user/login")
						})
					}else{
						message.error("注册失败！")
					}
				})
			} else {
				message.error("请输入正确用户名或密码！")
			}
		}
		
	}
}
export default Regist