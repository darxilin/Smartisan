import React,{Component} from "react"
import "./index.css"
import axios from "axios"
import {NavLink} from "react-router-dom"
import Nav from "../Common/Nav"
import ReactCSStransitionGroup from "react-addons-css-transition-group"
import { Carousel, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {Icon} from "antd"
import {connect} from "react-redux"

class Index extends Component{
	constructor(){
		super();
		this.state = {
			list:[{className:"iconfont icon-shangpingouwudai2",title:"锤子科技商城"},{className:"iconfont icon-shouji",title:"坚果 3"},{className:"iconfont icon-shouji",title:"坚果 Pro 2"},{className:"iconfont icon-chuizi",title:"Smartisan OS"},{className:"iconfont icon-xiazai1",title:"应用下载"},{className:"iconfont icon-luntan",title:"锤子科技论坛"}],
			showNav:false,
			bannerList:null,
			shortCut:null,
			floors:null,
			allItems:null,
		}
	}
	render(){
		
		function getlist(arr){
			var list = [];
			for(let i = 0;i<arr.length;i++){
				for(let j = 0;j<this.state.allItems.length;j++){
					if(this.state.allItems[j].id == arr[i]){
						list.push(this.state.allItems[j]);
					}
				}
				
			}
			return list
		}
		let list = this.state.list.map((item,index)=>
			<li key={index}><span className={item.className}></span><span>{item.title}</span></li>
		)
		//轮播
		const items =this.state.bannerList?this.state.bannerList.map((item,index)=>{
			return <div className="swiper-slide" key={index}><a href={item.linkUrl}><img src={item.src}/></a></div>
		}):null
		
		
		//首页导航
		let shortCut = this.state.shortCut?this.state.shortCut.map((item,index)=>{
			return <a key={index} href={item.linkUrl}><img src={item.src}/><span>{item.labelTitle}</span></a>
		}):null;
		
		//热门商品
		let rmsp = this.state.allItems?getlist.bind(this,this.state.floors[0].dataList)().map(item=>{
			return <NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink>
		}):null;
		//热门商品广告
		let rmsp_ad = this.state.allItems?this.state.floors[1].dataList.map((item,index)=>{
			return <NavLink key={index} to={item.linkUrl}><img src={item.src}/></NavLink>
		}):null;
		
		//热销机型
		let rxjx = this.state.allItems?getlist.bind(this,this.state.floors[2].dataList)().map(item=>{
			return <div className="swiper-slide" key={item.id}><NavLink  to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink></div>
		}):null;
		
		//热销机型广告
		let rxjx_ad = this.state.allItems?this.state.floors[3].dataList.map((item,index)=>{
			return <NavLink key={index} to={item.linkUrl}><img src={item.src}/></NavLink>
		}):null;
		
		//净化器及配件
		let jhq = this.state.allItems?getlist.bind(this,this.state.floors[4].dataList.carousel)().map(item=>{
			return <div className="swiper-slide" key={item.id}><NavLink  to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink></div>
		}):null;
		
		//配件
		let jhq_pj = this.state.allItems?getlist.bind(this,this.state.floors[4].dataList.recommend)().map(item=>{
			return <NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><span>{item.shop_info.sku_mobile_title}</span><span>></span></NavLink>
		}):null;
		
		//净化器广告
		let jhq_ad = this.state.allItems?this.state.floors[5].dataList.map((item,index)=>{
			return <NavLink key={index} to={item.linkUrl}><img src={item.src}/></NavLink>
		}):null;
		
		//坚果3及配件
		let jg3 = this.state.allItems?getlist.bind(this,this.state.floors[6].dataList)().map(item=>{
			return <NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink>
		}):null;
		
		//坚果2及配件
		let jg2 = this.state.allItems?getlist.bind(this,this.state.floors[7].dataList)().map(item=>{
			return <NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink>
		}):null;
		
		//品牌周边
		let ppzb = this.state.allItems?getlist.bind(this,this.state.floors[8].dataList)().map(item=>{
			return <NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink>
		}):null;
		
		//品牌周边广告
		let ppzb_ad = this.state.allItems?this.state.floors[9].dataList.map((item,index)=>{
			return <NavLink key={index} to={item.linkUrl}><img src={item.src}/></NavLink>
		}):null;
		
		//坚果pro广告
		let jg_pro_ad = this.state.allItems?this.state.floors[11].dataList.map((item,index)=>{
			return <NavLink key={index} to={item.linkUrl}><img src={item.src}/></NavLink>
		}):null;
		
		//品牌精选
		let ppjx = this.state.allItems?getlist.bind(this,this.state.floors[12].dataList)().map(item=>{
			return <NavLink key={item.id} to={`/item/${item.id}`}><img src={item.shop_info.ali_image}/><p>{item.shop_info.title}</p><p>{item.shop_info.sub_title}</p><p>￥{item.spu.price}</p></NavLink>
		}):null;
		
		
		return (
			
			<div className="Index">
			<Nav>
			<div className="nav_header">
				<span className="left iconfont icon-fenlei" onClick={this.showNavClick.bind(this)}></span>
				<span className="logo iconfont icon-chuizi"></span>
			</div>
			
			<ReactCSStransitionGroup transitionName="example" transitionEnterTimeout={500}
           transitionLeaveTimeout={400} component="div" className="nav_box">
			{
				this.state.showNav?
				<ul onClick={this.showNavClick.bind(this)}>
				{list}
				</ul>
				:null
			}
			
			</ReactCSStransitionGroup>
			</Nav>
			<div className="container">
				<div className="banner">
				{
					this.state.bannerList?
					<WingBlank>
					        <Carousel
					          autoplay={true}
					          infinite
					        >
					          {items}
					        </Carousel>
					      </WingBlank>:null
					
				}
					<div className="index_nav">
					{shortCut}
				</div>
				</div>
				{
					//热门商品
				}
				<div className="rmsp">
					{
						this.state.allItems?
						<p className="rmsp_title">{this.state.floors[0].floorName}<i>></i></p>
						:null
					}
					<div className="content_box">
						<div className="content_scroller">
							<ul>
								{rmsp}
							</ul>
							
						</div>
					</div>
					
				</div>
				{
					//热门商品广告
				}
				<div className="rmsp_ad">
					<div className="content_box">
						<div className="content_scroller">
							<ul>
								{rmsp_ad}
							</ul>
							
						</div>
					</div>
				</div>
				
				{
					//热销机型
				}
				<div className="rxjx">
					{
						this.state.allItems?
						<p className="rxjx_title">{this.state.floors[2].floorName}</p>:null
					}
					{
						this.state.allItems?
						<WingBlank>
					        <Carousel
					          autoplay={true}
					          infinite
					        >
					          {rxjx}
					        </Carousel>
					      </WingBlank>:null
					}
					
					
				</div>
				
				{
					//热销机型广告
				}
				<div className="rxjx_ad">
					<div className="content_box">
						<div className="content_scroller">
							<ul>
								{rxjx_ad}
							</ul>
							
						</div>
					</div>
				</div>
				
				{
					//净化器及配件
				}
				<div className="jhq">
					{
						this.state.allItems?
						<p className="jhq_title">{this.state.floors[4].floorName}</p>:null
					}
					{
						this.state.allItems?
						<WingBlank>
					        <Carousel
					          autoplay={true}
					          infinite
					        >
					          {jhq}
					        </Carousel>
					      </WingBlank>:null
					}
					<div className="jhq_pj">
						{jhq_pj}
					</div>
				</div>
				{
					//净化器广告
				}
				<div className="jhq_ad">
					{jhq_ad}
				</div>
				<div className="jg3">
					{
						this.state.allItems?
						<p className="jg3_title">{this.state.floors[6].floorName}<i>></i></p>
						:null
					}
					<div className="content_box">
					{jg3}
					</div>
				</div>
				
				<div className="jg2">
					{
						this.state.allItems?
						<p className="jg2_title">{this.state.floors[7].floorName}<i>></i></p>
						:null
					}
					<div className="content_box">
					{jg2}
					</div>
				</div>
				
				<div className="ppzb">
					{
						this.state.allItems?
						<p className="ppzb_title">{this.state.floors[8].floorName}<i>></i></p>
						:null
					}
					<div className="content_box">
					{ppzb}
					</div>
				</div>
				
				<div className="ppzb_ad">
					{ppzb_ad}
				</div>
				{
					//坚果pro广告
				}
				<div className="jg_pro_ad">
					<div className="content_box">
						<div className="content_scroller">
							<ul>
								{jg_pro_ad}
							</ul>
							
						</div>
					</div>
				</div>
				<div className="ppjx">
					{
						this.state.allItems?
						<p className="ppjx_title">{this.state.floors[12].floorName}<i>></i></p>
						:null
					}
					<div className="content_box">
					{ppjx}
					</div>
				</div>
				
				
			</div>
			</div>
			
		)
	}
	showNavClick(){
		this.setState({
			showNav:!this.state.showNav
		})
	}
	componentWillMount(){
		this.props.bottom_active()
		this.props.hideNav()
		axios.get("/marketing/mobile/index_5a50a9964b806e8007daf8dbab6e9028.json").then(res=>{
			let list = "";
			this.setState({
				bannerList:res.data.banner.dataList,
				shortCut:res.data.shortcut.dataList,
				floors:res.data.floors
			})
			//获取所有商品的id
			for(let i = 0;i<res.data.floors.length;i++){
				if(i%2==0){
					if(Array.isArray(res.data.floors[i].dataList)){
						
						for(let j=0;j<res.data.floors[i].dataList.length;j++){
							list += res.data.floors[i].dataList[j] + ",";
						}
					}else{
						for(let item in res.data.floors[i].dataList){
							for(let k = 0;k<res.data.floors[i].dataList[item].length;k++){
								list += res.data.floors[i].dataList[item][k] + ",";
							}
						}
					}
					
				}
			}
			axios.get(`/product/skus?ids=${list}&with_stock=true&with_spu=true`).then(res=>{
				this.setState({
					allItems:res.data.data.list
				})
			})
		})
		
	}
	componentDidMount(){
	
	}
}
export default connect(null,{bottom_active:()=>{
	return {type:"bottom_active",payload:0}
},hideNav:()=>{
	return {type:"hideNav",payload:true}
}})(Index)