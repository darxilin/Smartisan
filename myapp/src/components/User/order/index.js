import React,{Component} from "react"
import "./index.css"
import Nav from "../../Common/Nav"
import axios from "axios"
import {Icon} from "antd"

class Order extends Component{
	constructor(props){
		super(props);
		this.state={
			order:null,
			orderList:null,
		}
	}
	render(){
		return (
			<div className="Order">
			<Nav>
				<span className="go_back" onClick={this.go_back.bind(this)}><Icon type="left"/></span>
				我的订单
			</Nav>
			<div className="container">
			{
				this.state.orderList?
				this.state.orderList.map(item =>
							<div className="cart_item" key={item.id}>
							<div>
								<a><img src={item.shop_info.ali_image} alt=""/></a>
								<div className="right">
									<p>{item.shop_info.title}</p>
									<p>{"▪ "+item.shop_info.spec_json[0].show_name} {"▪ "+item.shop_info.spec_json[1].show_name} {item.shop_info.spec_json[2]?("▪ "+item.shop_info.spec_json[2].show_name):""}</p>
									<p>
										<span className="count">￥{item.price}
										<b><Icon type="close"/> {this.getnum.bind(this,item.id)()}</b></span>
									</p>
									
								</div>
							</div>
							</div>
						):null
			}
			</div>
			</div>
		)
	}
	componentWillMount(){
		axios.get("/my_info/get_order").then(res=>{
			let str = ""
			if(res.data.length>0){
				for(let i = 0;i<res.data.length;i++){
					str += res.data[i].id + ","
				}
				this.setState({
					order:res.data
				})
			}
			axios.get(`/product/skus?ids=${str}&with_stock=true&with_spu=true`).then(res=>{
				this.setState({
					orderList:res.data.data.list
				})
			})
		})
		
	}
	
	getnum(id){
		for(let i = 0; i < this.state.order.length; i++) {
			if(this.state.order[i].id == id) {
				return this.state.order[i].num
			}
		}
	}
	
	go_back(){
		this.props.history.go(-1)
	}
}
export default Order


