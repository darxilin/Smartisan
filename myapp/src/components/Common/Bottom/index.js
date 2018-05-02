import React,{Component} from "react"
import "./index.css"
import connect from "react-redux"
import {NavLink} from "react-router-dom"

class Bottom extends Component{
	constructor(){
		super();
		this.state = {
			navList:[{name:"首页",className:"iconfont icon-zhuye",path:"/index"},{name:"分类",className:"iconfont icon-tubiao13",path:"/category"},{name:"购物车",className:"iconfont icon-shangpingouwudai2",badge:"",path:"/cart"},{name:"个人中心",className:"iconfont icon-geren6",path:"/user"}]
		}
	}
	render(){
		var list = this.state.navList.map((item)=>
			<NavLink key={item.name} to={item.path} activeClassName='active'><span className={item.className}></span><span className="tab_label">
			{item.name}
			</span>
			{item.badge?<span className="badge">{item.badge}</span>:null}
			
			</NavLink>
		)
		return (
			<div className="Bottom">
			<nav>
			  {list}
			</nav>
			</div>
		)
	}
}
export default Bottom


