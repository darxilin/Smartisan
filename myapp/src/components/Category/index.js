import React,{Component} from "react"
import "./index.css"
import Nav from "../Common/Nav"
import axios from "axios"
import {connect} from "react-redux"
import {Icon} from "antd"

class Category extends Component{
	constructor(){
		super()
		this.state={
			list:null,
			list_detail:null
		}
	}
	render(){
		//获取模块下的商品信息
		function getlist(arr){
			var list = [];
			for(let i = 0;i<arr.length;i++){
				for(let j = 0;j<this.state.list_detail.length;j++){
					if(this.state.list_detail[j].id == arr[i].sku){
						list.push(this.state.list_detail[j]);
					}
				}
				
			}
			return list
		}
		return (
			<div className="Category">
			<Nav>
				分类
			</Nav>
			{
				this.state.list_detail?
			<div className="container">
				{
					this.state.list.map(item=>
					
				<div className="content_box" key={item.name}>
					<p className="title">{item.name}</p>
					<p className="img"><a href={item.image.linkUrl}><img src={item.image.src} alt=""/></a></p>
					{
						getlist.bind(this,item.layout.dataList)().map(item=>
							<a className="item" key={item.id} href={`/item/${item.id}`}><span><img src={item.shop_info.ali_image} alt=""/></span><span>{item.shop_info.sku_mobile_title}</span> <span><Icon type="right"/></span></a>
						)
					}
				</div>
				)
				}
			</div>:null
			}
			</div>
		)
	}
	componentWillMount(){
		this.props.bottom_active()
		this.props.hideNav()
		
		axios.get("/marketing/mobile/category_cb549675cc49e8a1dd636e981b997bbc.json").then(res=>{
			this.setState({
				list:res.data
			})
			let str = ""
			for(let i = 0;i<res.data.length;i++){
				for(let j=0;j<res.data[i].layout.dataList.length;j++){
					str += res.data[i].layout.dataList[j].sku + ","
				}
			}
			axios.get(`/product/skus?ids=${str}&with_stock=true&with_spu=true`).then(res=>{
				this.setState({
					list_detail:res.data.data.list
				})
			})
		})
	}
}
export default connect(null,{bottom_active:()=>{
	return {type:"bottom_active",payload:1}
},hideNav:()=>{
	return {type:"hideNav",payload:true}
}})(Category)