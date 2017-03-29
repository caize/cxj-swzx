import React, { Component } from 'react'
import $ from 'jquery'
import {Link} from 'react-router'
import { Breadcrumb, Icon , Table, Input, Modal, Button} from 'antd';
import { CONFIG } from '../../config.js'

import './link.less'

export default class footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			links : []
		}
		
	}

	componentDidMount() {
		let that = this
		$.ajax({
			url: {CONFIG}.CONFIG.server + '/apinews',
			dataType: 'jsonp',
			data: {smallclassid: 10},
		})
		.done(function(data) {
			console.log(data.news)
			that.setState({
				links: data.news
			})
		})
	}
	render() {
		const columns = [{
		  title: 'title',
		  dataIndex: 'Title',
		  dataIndex: 'Content',
		  render: (text,record, index) => <a target="Blank" href={record.Content.replace(/<p>(.*?)<\/p>/g,"$1")}>{record.Title}</a>,
		}]

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
					      <span>常见链接</span>
					    </Breadcrumb.Item>
					  </Breadcrumb>
				</div>

				<div className="content">
					<div className="item">
						<Table columns={columns} dataSource={this.state.links} pagination={false} scroll={{ y: 240 }} />
					</div>
					<div className="item">
						<Table columns={columns} dataSource={this.state.links} pagination={false} scroll={{ y: 240 }} />
					</div>
					<div className="item">
						<Table columns={columns} dataSource={[]} pagination={false} scroll={{ y: 240 }} />
					</div>
					<div className="item">
						<Table columns={columns} dataSource={[]} pagination={false} scroll={{ y: 240 }} />
					</div>
				</div>
				
			</div>
		)
	}
}