import React,{Component} from "react"
import "./index.css"
import connect from "react-redux"

class Nav extends Component{
	constructor(){
		super();
		this.state = {
			navList:[{name:"首页",className:"iconfont icon-zhuye"},{name:"分类",className:"iconfont icon-tubiao13"},{name:"购物车",className:"iconfont icon-shangpingouwudai2",badge:""},{name:"个人中心",className:"iconfont icon-geren6"}]
		}
	}
	render(){
		var list = this.state.navList.map((item)=>
			<a key={item.name}><span className={item.className}><span className="tab_label">{item.name}</span>
			{item.badge?<span className="badge">{item.badge}</span>:null}
			</span></a>
		)
		return (
			<div className="Nav">
			<nav className="bar bar-tab">
			  {list}
			</nav>
			</div>
		)
	}
}
export default Nav