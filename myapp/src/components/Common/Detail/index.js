import React,{Component} from "react"
import "./index.css"

class Detail extends Component{
	constructor(){
		super();
		this.state = {
			id:null,
		}
	}
	render(){
		return (
			<div className="Detail">
			Detail----{this.state.id}
			</div>
		)
	}
	componentDidMount(){
		console.log(this.props.match.params)
  	this.setState({id:this.props.match.params.id})
  }
}
export default connect()(Detail)
