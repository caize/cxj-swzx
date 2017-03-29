import React, { Component } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import cookie from 'react-cookie'
import { Breadcrumb, Icon , Table, Input, Modal, Button} from 'antd';
import { CONFIG } from '../../config.js'

import './subpage.less'
export default class subpage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subpageName: '',
			searchInputValue: '',
			loading: false,
    		visible: false,
    		news: [],
    		temp_news: [],
    		aNews: {}
		}
		this.searchHandleChange = this.searchHandleChange.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	getSubPage() {
		let title = this.props.params.title
		let that = this
		if(title == 'center') {
			this.setState({
				subpageName: '中心介绍'
			})
			
		}
		else if(title == 'news') {
			let tmp = []
			this.setState({
				subpageName: '新闻公告'
			})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apinewsgg',
				dataType: 'jsonp'
			})
			.done(function(data) {
				
		    	that.setState({
					news: data.news,
					temp_news: data.news
				})
			})
		}
		else if(title == 'guide') {
			let tmp = []
			this.setState({
				subpageName: '办事指南'
			})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apinewsguide',
				dataType: 'jsonp'
			})
			.done(function(data) {
				
		    	that.setState({
					news: data.news,
					temp_news: data.news
				})
			})
		}

		else if(title == 'school') {
			let tmp = []
			this.setState({
				subpageName: '校园信息'
			})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apinews',
				dataType: 'jsonp',
				data: {
					smallclassid: 3
				}
			})
			.done(function(data) {
				
		    	that.setState({
					news: data.news,
					temp_news: data.news
				})
			})
		}

		else if(title == 'question') {
			let tmp = []
			this.setState({
				subpageName: '常见问题'
			})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apinews',
				dataType: 'jsonp',
				data: {
					smallclassid: 4
				}
			})
			.done(function(data) {
				
		    	that.setState({
					news: data.news,
					temp_news: data.news
				})
			})
		}

		else if(title == 'data') {
			let tmp = []
			this.setState({
				subpageName: '资料下载'
			})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apinews',
				dataType: 'jsonp',
				data: {
					smallclassid: 6
				}
			})
			.done(function(data) {
				
		    	that.setState({
					news: data.news,
					temp_news: data.news
				})
			})
		}

	}

	searchHandleChange(event) {

		this.setState({searchInputValue: event.target.value});
    	let input = event.target.value
    	let reg = new RegExp(input)
    	let tmp = []
    	this.state.news.map(function(elem, index) {
    		if((elem.Title).match(reg)) {
    			tmp.push(elem)
    		}
    	})
    	this.setState({
    		temp_news: tmp
    	})

  //   	this.setState({searchInputValue: event.target.value});
  //   	let input = event.target.value
  //   	let reg = new RegExp(input)
  //   	console.log(reg)
  //   	$('.subpage-table tbody tr').each(function(){
  //   		if($(this).find('a').html().match(reg)) {
  //   			$(this).show()
  //   		}
  //   		else {
  //   			$(this).hide()
  //   		}
    		
		// });

    	// if($('.subpage-table .title p').html().match(reg)) {
    	// 	console.log(1)
    	// }
  	}

  	showModal(Newsid) {
  		
  		
	    this.setState({
	      visible: true,
	    });
	    let that = this
	    $.ajax({
  			url: {CONFIG}.CONFIG.server + '/apinews',
  			dataType: 'jsonp',
  			data: {newsid: Newsid},
  		})
  		.done(function(data) {
  			// console.log(data.news[0]);
  			that.setState({
  				aNews: data.news[0]
  			}, ()=>{
  				var imgs = $('.a-news img[src^=http]');
  				// console.log(imgs)
  				for(var i=0;i<imgs.length;i++) {
  					imgs[i].src = (imgs[i].src.replace(/swzx.szu.edu.cn/,'210.39.2.95'))

  				}
  			})
  		})
	}

	handleCancel() {
    	this.setState({ visible: false });
  	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.params.title != this.props.params.title) {
			this.getSubPage()
		}
	}

	componentDidMount() {
		this.getSubPage()		
	}

	render() {
		Date.prototype.format = function(fmt) { 
	     var o = { 
	        "M+" : this.getMonth()+1,                 //月份 
	        "d+" : this.getDate(),                    //日 
	        "h+" : this.getHours(),                   //小时 
	        "m+" : this.getMinutes(),                 //分 
	        "s+" : this.getSeconds(),                 //秒 
	        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	        "S"  : this.getMilliseconds()             //毫秒 
	    }; 
	    if(/(y+)/.test(fmt)) {
	            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	    }
	     for(var k in o) {
	        if(new RegExp("("+ k +")").test(fmt)){
	             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	         }
	     }
	    return fmt; 
}       

		const columns = [{
		  title: '标题',
		  dataIndex: 'Title',
		  dataIndex: 'Newsid',
		  key: 'title',
		  className: 'title',
		  render: (text,record, index) => <a onClick={this.showModal.bind(this, record.Newsid)}>{record.Title}</a>,
		}, {
		  title: '标签',
		  dataIndex: 'icon',
		  key: 'icon',
		  className: 'icon',
		  render: text => <Icon type="paper-clip" />,
		}, {
		  title: '时间',
		  dataIndex: 'UpdateTime',
		  key: 'time',
		  className: 'time',
		  render: (text,record, index) => <div><Icon type="clock-circle-o" style={{ color: '#2db7f5', marginRight: 10 }} />{new Date(text).format("yyyy-MM-dd hh:mm")}</div>,
		  

		}];

		return(
			<div className="sub-page">
				<div className="breadcrumb">
					<Breadcrumb>
					    <Breadcrumb.Item>
					      <Icon type="home" />
					      <Link to="/">首页</Link>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					    	<Icon type="file-text" />
					      <span>{this.state.subpageName}</span>
					    </Breadcrumb.Item>
					  </Breadcrumb>
				</div>
				<div className="search-container">
					<Input placeholder="输入关键字搜索" onChange={this.searchHandleChange} />
				</div>
				<div className="subpage-table">
					<Table dataSource={this.state.temp_news} columns={columns} pagination={{pageSize: 12}} />
				</div>
				<Modal
          			visible={this.state.visible}
		          	title={this.state.aNews.Title}
		          	onOk={this.handleOk}
		          	onCancel={this.handleCancel}
		          	width={900}
		          	footer={[
		            	<Button key="back" size="large" onClick={this.handleCancel}>知道了</Button>,
		          	]}
		        	>
			          <div className="a-news" dangerouslySetInnerHTML={{__html: this.state.aNews.Content}}></div>
        		</Modal>
			</div>
		)
	}
}