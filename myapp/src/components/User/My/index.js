import React,{Component} from "react"
import "./index.css"
import Nav from "../../Common/Nav"
import {Icon,message} from "antd"
import default_user_avatar from "../../../img/default-user-avatar.png"

class My extends Component{
	constructor(){
		super()
		this.state={
			one_list:[{name:"全部订单",type:"profile",path:"/user/order"},{name:"待付款",type:"credit-card",path:"/user/order"},{name:"待收货",type:"car",path:"/user/order"},{name:"售后",type:"customer-service",path:"/user/order"}],
			two_list:[{name:"发起售后"},{name:"我的售后"}],
			three_list:[{name:"地址管理"},{name:"我的优惠券"},{name:"优先购买码"},{name:"提货兑换卡"}],
			four_list:[{name:"线下零售门店查询"},{name:"线下维修门店查询"},{name:"常见问题"}]
		}
	}
	render(){
		return (
			<div className="My">
			<Nav>
			<span onClick={this.go_back.bind(this)}><Icon type="left"/></span>
			个人中心
			</Nav>
			<div className="my_box">
				<div className="one">
					<div className="up">
						<p><img src={default_user_avatar} alt=""/></p>
						{
							sessionStorage.getItem("user")?
								JSON.parse(sessionStorage.getItem("user")).username
							:null
							}
						<span><Icon type="right"/></span>
					</div>
					<div className="down">
						{
							this.state.one_list.map(item=>
								<a href={item.path} key={item.name}><span><Icon type={item.type} /></span><span>{item.name}</span></a>
							)
						}
					</div>
				</div>
				<div className="two">
				{
					this.state.two_list.map(item=>
						<a key={item.name}>{item.name}<span><Icon type="right" /></span></a>
					)
				}
				</div>
				<div className="three">
				{
					this.state.three_list.map(item=>
						<a key={item.name}>{item.name}<span><Icon type="right" /></span></a>
					)
				}
				</div>
				<div className="four">
				{
					this.state.four_list.map(item=>
						<a key={item.name}>{item.name}<span><Icon type="right" /></span></a>
					)
				}
				</div>
			</div>
			</div>
		)
	}
	componentWillMount(){
		if(!sessionStorage.getItem("user")) {
			this.props.history.push("/user/login")
		}
	}
	go_back(){
		this.props.history.go(-1)
	}
}
export default My