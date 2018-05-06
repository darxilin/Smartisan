import React,{Component} from "react"
import "./index.css"
import Nav from "../Common/Nav"
import {connect} from "react-redux"
import axios from "axios"
import {Icon} from "antd"

class Cart extends Component{
	constructor(){
		super();
		this.state = {
			bianji:false,
			choose:false,
			del_choose:false,
			has_del_choose:false,
			has_choose:false,
			cart_list_d:null,
			cart_list_n:null,
			cart_list_c:null,
		}
	}
	render(){
		return (
			<div className="Cart">
			<Nav>
				购物车
				{
					this.state.cart_list_d?
					<span onClick={this.isbianji.bind(this)}>{this.state.bianji?"完成":"编辑"}</span>:null
				}
			</Nav>
			<div className="container">
			{
				this.state.cart_list_d?
				<div className="cart_bottom">
					<span onClick={this.state.bianji?(this.state.del_choose?this.choose_not.bind(this,"del_choose"):this.choose_yes.bind(this,"del_choose")):(this.state.choose?this.choose_not.bind(this,"choose"):this.choose_yes.bind(this,"choose"))}><Icon type={this.state.bianji?(this.state.del_choose?"check-circle":"check-circle-o"):(this.state.choose?"check-circle":"check-circle-o")}/></span>
					<span>已选<b className={this.state.bianji?"bianji":""}>{this.state.bianji?this.get_select_num.bind(this,"del_choose")():this.get_select_num.bind(this,"choose")()}</b>件</span>
					{
						this.state.bianji?
						null:<p><span><b>合计:</b>￥{this.count.bind(this)()}</span><span>已享免邮费</span></p>
					}
					
					<a className={this.state.bianji?(this.state.has_del_choose?"del_choose":""):(this.state.has_choose?"jiesuan":"")} onClick={this.state.bianji?(this.del_choose.bind(this)):this.jiesuan.bind(this)}>{this.state.bianji?"删除所选":"现在结算"}
					</a>
				</div>:null
			}
				<div className="cart_box">
				
				{
					this.state.cart_list_d?
					(this.state.cart_list_d.length>0?
				
				(
						//编辑模式
						this.state.cart_list_d.map(item =>
							<div className="cart_item" key={item.id}>
							<span onClick={this.state.bianji?this.change_choose.bind(this,item.id,"del_choose"):this.change_choose.bind(this,item.id,"choose")}>
								<Icon type={this.state.bianji?this.ischeck.bind(this,item.id,"del_choose")():this.ischeck.bind(this,item.id,"choose")()}/>
							</span>
							<div>
								<a><img src={item.shop_info.ali_image} alt=""/></a>
								<div className="right">
									<p>{item.shop_info.title}</p>
									<p>{"▪ "+item.shop_info.spec_json[0].show_name} {"▪ "+item.shop_info.spec_json[1].show_name} {item.shop_info.spec_json[2]?("▪ "+item.shop_info.spec_json[2].show_name):""}</p>
									{
										this.state.bianji?
										<p>
										<span className="min" onClick={this.decrese.bind(this,item.id)}>
											<Icon type="minus-circle-o" />
										</span>
										<input ref={"ref"+item.id} type="number" onChange={this.changenum.bind(this,item.id)} value={this.getnum.bind(this,item.id)()} />
										<span className="plus" onClick={this.plus.bind(this,item.id)}>
											<Icon type="plus-circle-o" /></span><span>￥{item.price}
										</span>
									</p>
										:<p>
										<span className="count">￥{item.price}
										<b><Icon type="close"/> {this.getnum.bind(this,item.id)()}</b></span>
									</p>
									}
									
								</div>
							</div>
							</div>
						)
				):<div className="cart_empty">
						购物车里还没有商品
					</div>):<div className="cart_empty">
						购物车里还没有商品
					</div>
				}	
				</div>
			</div>
			</div>
		)
	}
	componentWillMount(){
		
		this.props.bottom_active()
		this.props.hideNav()
		if(sessionStorage.getItem("cart")){
			let arr = JSON.parse(sessionStorage.getItem("cart"))
			let arr2 = [...arr]
			let arr1 =[];
			this.setState({
				cart_list_n:arr
			})
			let str = ""
			for(let i=0;i<arr2.length;i++){
				arr1.push(arr2[i])
				arr1[i].choose = true;
				arr1[i].del_choose = false;
				str += arr2[i].id + ",";
			}
			this.setState({
				cart_list_c:arr1
			})
			axios.get(`/product/skus?ids=${str}&with_stock=true&with_spu=true`).then(res => {
				this.setState({
					cart_list_d:res.data.data.list
				})
			})
		}
		
	}
	componentDidMount(){
		this.state_del_choose("choose")
	}
	isbianji(){
		this.setState({
			bianji:!this.state.bianji
		})
	}
	
	
	//删除所选商品
	del_choose(){
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			if(list[i].del_choose){
				//删除存有详细信息列表里的商品
				for(let j=0;j<this.state.cart_list_d.length;j++){
					if(list[i].id == this.state.cart_list_d[j].id){
						/*axios.get("my_info/test").then(res=>[
							if(res.data == 1){
								
							}
						])*/
						axios.post("/my_info/del_cart",{id:list[i].id}).then(res=>{
							if(res.data == 1){
								//删除存有数量信息列表里的商品
				for(let k=0;k<this.state.cart_list_c.length;k++){
					if(list[i].id == this.state.cart_list_c[k].id){
								let list_2 = [...this.state.cart_list_c]
								list_2.splice(k, 1)
								this.setState({
									cart_list_c: list_2
								},()=>{
									
								})
								
					}
					
				}
				
								
								let list1 = [...this.state.cart_list_d]
								console.log(list1,j)
						list1.splice(j,1)
						this.setState({
							cart_list_d:list1
						
								}, () => {
									this.state_del_choose("del_choose")
									let arr = JSON.parse(sessionStorage.getItem("cart"))
									for(let m=0;m<arr.length;m++){
										if(arr[m].id == list[i].id){
											arr.splice(m,1)
										}
									}
									sessionStorage.setItem("cart",JSON.stringify(arr))
								})
								
							}
						})
						
					}
				}
				
				
			}
		}
	}
	jiesuan(){
		console.log("jiesuan")
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			if(list[i].choose){
				
				//提交订单并删除购物车
				for(let k=0;k<this.state.cart_list_d.length;k++){
					if(list[i].id == this.state.cart_list_d[k].id){
						let date = new Date().getTime() + list[i].id
						axios.post("/my_info/add_order",{id:list[i].id,order_id:date,num:list[i].num}).then(res=>{
							if(res.data == 1){
								//删除存有详细信息列表里的商品
								for(let j = 0; j < this.state.cart_list_c.length; j++) {
									if(list[i].id == this.state.cart_list_c[j].id) {
								
										let list1 = [...this.state.cart_list_c]
										list1.splice(j, 1)
										this.setState({
											cart_list_c: list1
										}, () => {
								
										})
									}
								}
								
								let list2 = [...this.state.cart_list_d]
								list2.splice(k, 1)
								this.setState({
									cart_list_d: list2
								}, () => {
									this.state_del_choose("choose")
									let arr = JSON.parse(sessionStorage.getItem("cart"))
									for(let m=0;m<arr.length;m++){
										if(arr[m].id == list[i].id){
											arr.splice(m,1)
										}
									}
									sessionStorage.setItem("cart",JSON.stringify(arr))
								})
								axios.post("/my_info/del_cart",{id:list[i].id}).then(res=>{
							if(res.data == 1){}
						})
								
							}
						})
						
					}
				}
				
			}
		}
		
	}
	
	//全选中
	choose_yes(state){
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			list[i][state] = true
		}
		this.setState({
			cart_list_c:list
		})
		this.state_del_choose(state)
	}
	
	//全不选中
	choose_not(state){
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			list[i][state] = false
		}
		this.setState({
			cart_list_c:list
		})
		this.state_del_choose(state)
	}
	
	//判断编辑模式下是否全选中
	state_del_choose(state){
		console.log(this.state.cart_list_c,this.state.cart_list_d,this.state.cart_list_n)
		let flag1 = true;
		let flag =false;
		if(this.state.cart_list_c){
			if(this.state.cart_list_c.length>0){
			for(let i = 0; i < this.state.cart_list_c.length; i++) {
				if(!this.state.cart_list_c[i][state]) {
					flag1 = false
				}
				if(this.state.cart_list_c[i][state]) {
					flag = true
				}
			}
			}else{
				flag1 = false
				this.setState({
					choose: false,
					has_choose:false
				})
			}
		}else{
			flag1 = false
			this.setState({
					choose: false,
					has_choose:false
				})
		}
		
		if(state === "del_choose"){
			if(flag1) {
				this.setState({
					del_choose: true,
				})
			}
			else {
				this.setState({
					del_choose: false,
				})
			}
			if(flag){
				this.setState({
					has_del_choose: true
				})
			}else{
				this.setState({
					has_del_choose: false,
				})
			}
			
		}else if(state === "choose"){
			if(flag1) {
				this.setState({
					choose: true
				})
			} else {
				this.setState({
					choose: false
				})
			}
			if(flag){
				this.setState({
					has_choose: true
				})
			}else{
				this.setState({
					has_choose: false
				})
			}
		}
		
	}
	
	//判断是否勾选
	ischeck(id,state){
		for(let i = 0;i<this.state.cart_list_c.length;i++){
			if(this.state.cart_list_c[i].id == id){
				if(this.state.cart_list_c[i][state]){
					return "check-circle"
				}else{
					return "check-circle-o"
				}
			}
		}
	}
	
	//改变选中状态
	change_choose(id,state){
		console.log(state)
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			if(list[i].id == id) {
				list[i][state] = !list[i][state]
				this.setState({
					cart_list_c:list
				})
			}
		}
		this.state_del_choose(state)
	}
	
	//获取数量
	getnum(id){
		for(let i = 0; i < this.state.cart_list_c.length; i++) {
			if(this.state.cart_list_c[i].id == id) {
				return this.state.cart_list_c[i].num
			}
		}
	}
	
	change_db(id,num){
		num = Number(num)
		let flag = 0
		axios.post("/my_info/change_cart",{id:id,num:num}).then(res=>{
			if(res.data == 1){
				flag = 1
				let arr = JSON.parse(sessionStorage.getItem("cart"))
				for(let j = 0;j<arr.length;j++){
					if(id == arr[j].id){
						arr[j].num = num
					}
				}
				sessionStorage.setItem("cart",JSON.stringify(arr));
			}
		})
		return flag
	}
	
	//改变数量
	changenum(id){
		let ref = "ref"+id
		let num = this.refs[ref].value
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			if(list[i].id == id) {
				if(num>=1){
					list[i].num = Number(num)
				}else{
					list[i].num = 1
				}
				this.change_db(id,list[i].num)
					this.setState({
						cart_list_c:list
					})
				
				
				
			}
		}
		
	}
	
	//减少数量
	decrese(id){
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			if(list[i].id == id) {
				if(list[i].num>1){
					list[i].num--
				}else{
					list[i].num = 1
				}
				this.change_db(id,list[i].num)
					this.setState({
						cart_list_c:list
					})
				
				
						
					
			}
		}
	}
	
	//增加数量
	plus(id){
		let list = [...this.state.cart_list_c]
		for(let i = 0; i < list.length; i++) {
			
			if(list[i].id == id) {
				list[i].num ++				
				
				this.change_db(id,list[i].num)
					this.setState({
						cart_list_c:list
					})
				
						
			}
		}
	}
	get_select_num(state){
		let num = 0
		for(let i = 0; i < this.state.cart_list_c.length; i++) {
			if(this.state.cart_list_c[i][state]) {
				num += this.state.cart_list_c[i].num
			}
		}
		return num
	}
	
	count(){
		let num = 0
		for(let i = 0; i < this.state.cart_list_c.length; i++) {
			if(this.state.cart_list_c[i].choose) {
				for(let j = 0;j<this.state.cart_list_d.length;j++){
					if(this.state.cart_list_c[i].id ==this.state.cart_list_d[j].id){
						num += this.state.cart_list_c[i].num*this.state.cart_list_d[j].price
					}
				}
			}
		}
		return num
	}
}
export default connect(null,{bottom_active:()=>{
	return {type:"bottom_active",payload:2}
},hideNav:()=>{
	return {type:"hideNav",payload:true}
}})(Cart)

