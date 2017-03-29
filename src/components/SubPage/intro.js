import React, { Component } from 'react'
import $ from 'jquery'
import {Link} from 'react-router'
import { Breadcrumb, Icon , Table, Input, Modal, Button} from 'antd';
import { CONFIG } from '../../config.js'

export default class footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content : ''
		}
		
	}

	componentDidMount() {
		let that = this
		$.ajax({
			url: {CONFIG}.CONFIG.server + '/apidescrition',
			dataType: 'jsonp',
		})
		.done(function(data) {
			that.setState({
				content: data.desc[0].content
			})
		})
	}
	render() {
		return (
			<div className="link">
				<div className="breadcrumb">
					<Breadcrumb>
					    <Breadcrumb.Item href="">
					      <Icon type="home" />
					     <Link to="/">首页</Link>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					    	<Icon type="file-text" />
					      <span>中心介绍</span>
					    </Breadcrumb.Item>
					  </Breadcrumb>
				</div>

				<div className="content" style={{padding: '30px', border: '1px solid #ebebeb'}}>
					<p dangerouslySetInnerHTML={{__html: this.state.content}}></p>
				</div>
				
			</div>
		)
	}
}