import React,{Component} from "react"
import "./index.css"
import Nav from "../../Common/Nav"
import axios from "axios"
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
const FormItem = Form.Item;
message.config({
	top:60,
});

class Login extends Component{
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Login">
			<Nav>
			<span onClick={this.go_back.bind(this)}><Icon type="left"/></span>
				登录
			</Nav>
			<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a href="/user/regist">register now!</a>
        </FormItem>
      </Form>
			</div>
		)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				let obj ={}
				obj.username=values.userName;
				obj.password=values.password;
				axios.post("/user_login/loginer",obj).then(res=>{
					if(res.data.user){
						let obj = {}
						obj.username = res.data.user
						sessionStorage.setItem("user",JSON.stringify(obj))
						//获取数据库购物号车信息
						axios.get("/my_info/get_cart").then(res=>{
							if(res.data.ok == 1){
								if(res.data.res.length>0){
									sessionStorage.setItem("cart",JSON.stringify(res.data.res))
								}
								message.success('登录成功！', 2, () => {
										this.props.history.push("/user")
									});
							}
						})
						
					}else{
						this.error()
					}
				})
			}
		});
	}
	go_back(){
		this.props.history.go(-1)
	}
	
	
	//登陆失败提示
	error(){
		message.error('用户名或密码错误！');
	};
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm