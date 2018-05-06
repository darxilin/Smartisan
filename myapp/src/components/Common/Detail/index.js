import React,{Component} from "react"
import "./index.css"
import Nav from "../Nav"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import axios from "axios"
import { Modal,Button,message } from 'antd';
import 'antd/dist/antd.css'

class Detail extends Component{
	constructor(){
		super();
		this.state = {
			shop_info:null,
			allItems:null,
			detail_nav:["商品","详情","参数","推荐"],
			active_index:0,
			id:null,
			current_info:null,
			num:1,
			reletive:null,
			show_select:true,
			visible:false,
		}
	}
	render(){
		
		
		let detail_nav = this.state.detail_nav.map((item,index)=>
			<a key={index} className={this.state.active_index == index?"active":""} onClick={this.moveto.bind(this,index)}>{item}</a>
		)
		
		return (
			<div className="Detail">
			{
				this.state.shop_info?
				<Nav>
				<span className="go_back" onClick={this.go_back.bind(this)}>返回</span>
				<span className="title">{this.state.shop_info.name}</span>
				</Nav>:null
			}
			<div className="detail_nav">
				{detail_nav}
			</div>
			{
				this.state.current_info?
				<div className="container">
					<div className="ali_images">
						<img src={this.state.current_info.shop_info.ali_image}/>
					</div>
					<div className="shop_info">
						<p className="detail_info_title">商品信息</p>
						<p>{this.state.current_info.shop_info.title}</p>
						<p>{this.state.current_info.shop_info.sub_title}</p>
						<p>￥{this.state.current_info.price}</p>
					</div>
					<div className="selected" onClick={this.showModal.bind(this)}>
						<p>已选版本</p>
						<p>颜色: <b>{this.state.current_info.shop_info.spec_json[0].show_name}</b></p>
						<p>容量: <b>{this.state.current_info.shop_info.spec_json[1].show_name}</b><i>></i></p>
						{
							this.state.current_info.shop_info.spec_json[2]?
							<p>网络: <b>{this.state.current_info.shop_info.spec_json[2].show_name}</b></p>:null
						}
						<p>数量: <b>{this.state.num}</b></p>
					</div>
					<div className="reletive">
						<p className="reletive_title">
							相关推荐
						</p>
						{
							this.state.reletive?
							<div className="contentbox">
								{
									this.state.reletive.map(item=>
										<NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.price}</p></NavLink>
									)
								}
							</div>:null
						}
						
					</div>
				</div>:null
			}
			<div className="bottom">
				<span className="iconfont icon-shangpingouwudai2" onClick={this.tocart.bind(this)}></span>
				<div className="right">
					<a className="addCart" onClick={this.state.visible?this.addcart.bind(this):this.showModal.bind(this)}>加入购物车</a>
					<a className="buyNow">现在购买</a>
				</div>
			</div>
			
			{
        <Modal
          visible={this.state.visible}
          onOk={this.hideModal.bind(this)}
          onCancel={this.hideModal.bind(this)}
          footer={null}
          wrapClassName="modal"
          closable={false}
        >
        {
        	this.state.current_info?
        	<div className="pop_select">
        	<div className="select_info">
          	<div className="img_box">
          		<img src={this.state.current_info.shop_info.ali_image}/>
          	</div>
          	<p>{this.state.current_info.shop_info.title}</p>
          	<p>{this.state.current_info.shop_info.spec_json[0].show_name}{this.state.current_info.shop_info.spec_json[1].show_name}{this.state.current_info.shop_info.spec_json[2]?this.state.current_info.shop_info.spec_json[2].show_name:null}</p>
          	<p>￥{this.state.current_info.price}</p>
          </div>
          <div className="select_color">
          	<p>颜色选择</p>
          	<div className="color_box">
          		{
          			this.state.current_info.shop_info.spec_v2[0].spec_values.map(item=>
          				<a key={item.id} className={this.state.current_info.shop_info.spec_json[0].spec_value_id == item.id?"active":''}><img src={item.image} alt=""/><span>{item.show_name}</span></a>
          			)
          		}
          	</div>
          </div>
          <div className="select_storage">
          	<p>容量选择</p>
          	<div className="color_box">
          		{
          			this.state.current_info.shop_info.spec_v2[1].spec_values.map(item=>
          				<a key={item.id} className={this.state.current_info.shop_info.spec_json[1].spec_value_id == item.id?"active":''}><span>{item.show_name}</span></a>
          			)
          		}
          	</div>
          </div>
          {
          	this.state.current_info.shop_info.spec_v2[2]?
          	<div className="select_net">
          	<p>网络选择</p>
          	<div className="color_box">
          		{
          			this.state.current_info.shop_info.spec_v2[2].spec_values.map(item=>
          				<a key={item.id} className={this.state.current_info.shop_info.spec_json[2].spec_value_id == item.id?"active":''}><span>{item.show_name}</span></a>
          			)
          		}
          	</div>
          </div>:null
          }
          <div className="select_num">
          	<p>数量选择</p>
          	<div className="color_box">
          		<a>-</a><a>{this.state.num}</a><a>+</a>
          	</div>
          </div>
          
          
          </div>:null
        }
          
        </Modal>
				
			}
			
			
			</div>
		)
	}
	componentDidMount(){
		
  	}
	componentWillMount(){
		this.props.hideNav()
		let id = this.props.match.params.id;
		this.setState({
			id:id
		})
		id = id.substring(0,id.length - 2)
		axios.get(`/product/spus?ids=${id}`).then(res=>{
			this.setState({
				shop_info:res.data.data.list[0]
			})
			let list = "";
			for(let i = 0;i<res.data.data.list[0].sku_info.length;i++){
				list += res.data.data.list[0].sku_info[i].sku_id + ","
			}
			axios.get(`/product/skus?ids=${list}&with_stock=true&with_spu=true`).then(res=>{
				this.setState({
					allItems:res.data.data.list
				},()=>{
					this.findCurrent.bind(this,this.state.id)();
				})
				
			})
		})
		
		axios.get(`/store/serv/v1/pay/Installment`).then(res=>{
			let list = "";
			for(let i = 0;i<res.data.data.length;i++){
				list += res.data.data[i].pay_goods[0].sku + ","
			}
			axios.get(`/product/skus?ids=${list}&with_stock=true&with_spu=true`).then(res=>{
				this.setState({
					reletive:res.data.data.list
				})
				
			})
		})
		
	}
	
	
	//查找当前的id的信息
	findCurrent(id){
			for(let i = 0;i<this.state.allItems.length;i++){
				if(id == this.state.allItems[i].id){
					this.setState({
						current_info:this.state.allItems[i]
					})
				}
			}
		}
	go_back(){
		this.props.history.go(-1)
	}
	moveto(index){
		this.setState({
			active_index:index
		})
	}
	showModal(){
    this.setState({
      visible: true,
    });
  }
  hideModal(){
    this.setState({
      visible: false,
    });
  }
  tocart(){
  	this.props.history.push("/cart")
  }
  addcart(){
  	function add_cart(arr,obj){
  		
  		axios.post("/my_info/add_cart",obj).then(res=>{
  			if(res.data == 1){
  				message.success("已成功添加！")
  				sessionStorage.setItem("cart", JSON.stringify(arr))
  			}else{
  				message.error("添加购物车失败！")
  			}
  		})
  	}
  	function change_cart(arr,obj){
  		axios.post("/my_info/change_cart", obj).then(res => {
  			if(res.data == 1) {
  				message.success("已成功添加！")
  				sessionStorage.setItem("cart", JSON.stringify(arr))
  			} else {
  				message.error("添加购物车失败！")
  			}
  		})
  	}
  	//判断是否登录
  	if(sessionStorage.getItem("user")){
  		let id = this.state.id;
  		let username = JSON.parse(sessionStorage.getItem("user")).username
  		
  		//是否存在本地购物车列表
  		if(sessionStorage.getItem("cart")) {
  			var arr = JSON.parse(sessionStorage.getItem("cart"));
  			let flag = true
  			for(let i= 0;i<arr.length;i++){
  				if(arr[i].id == id){
  					arr[i].num += this.state.num;
  					//修改数据库
  					change_cart(arr,arr[i])
  					flag = false
  					break;
  				}
  			}
  			if(flag){
  				var obj = {}
  				obj.id = id;
  				obj.num = this.state.num
  				obj.username = username
  				arr.push(obj)
  				//修改数据库
  				add_cart(arr,obj)
  			}
  			
  		} else {
  			let arr = []
  			var obj = {}
  			obj.id = id;
  			obj.num = this.state.num
  			obj.username = username
  			arr.push(obj)
  			//修改数据库
  			add_cart(arr,obj)
  		}
  		
  	}else{
  		this.props.history.push("/user/login")
  	}
  	
  	
  }
}
export default connect(null,{hideNav:()=>{
	return {type:"hideNav",payload:false}
}})(Detail)
