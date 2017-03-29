import React, { Component } from 'react'
import $ from 'jquery'
import { Link,browserHistory } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
const history = createHistory()
import cookie from 'react-cookie'
import './header.less'

import LOGO from '../../img/logo.jpg'

export default class header extends Component {
	constructor(props) {
		super(props);
		this.state ={
			name: '',
			studentno: ''
		}
	}

	GetQueryString(name) {
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = browserHistory.getCurrentLocation().search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}

	loginOut() {
		cookie.remove('name', { path: '/' })
		cookie.remove('studentno', { path: '/' })
		cookie.remove('academy', { path: '/' })
		this.setState({
			name: '',
			studentno: ''
		})
		$.ajax({
			url: 'https://ia.szu.edu.cn/cas/logout',
			dataType: 'jsonp',
		})
		.done(function() {
		})
		
		
		this.refs.login.innerHTML = '登陆'
		this.refs.login.href = 'https://auth.szu.edu.cn/cas.aspx/login?service=http://swzx.szu.edu.cn'
	}

	componentDidMount() {
		let that = this
		let ticket = this.GetQueryString('ticket')
		// console.log(ticket)
		$.ajax({
			url: 'http://210.39.2.88:8080/qgzx',
			dataType: 'jsonp',
			data: {ticket: ticket},
		})
		.done(function(data) {
			if(data.name != null) {
				that.setState({
					name: '当前用户：'+data.name,
					studentno: '学号：'+data.studentno
				})
				cookie.save('name', data.name, { path: '/' })
				cookie.save('studentno', data.studentno, { path: '/' })
				cookie.save('academy', data.academy, { path: '/' })
				that.refs.login.innerHTML = '退出'
				that.refs.login.href = 'http://localhost:8080/'
			}
			else {
				that.loginOut()
			}
				
		})
		
	}
	render() {
		return (
		  <header>
		  	<div className="top">
		  		<Link to='/contact' style={{border: 0}}>联系我们</Link>
		  		<a>进驻部门
		  			<ul>
		  				<li><a>教务部</a></li>
		  				<li><a>后勤部</a></li>
		  				<li><a>信息中心</a></li>
		  				<li><a>就业指导中心</a></li>
		  				<li><a>研究所院</a></li>
		  				<li><a>学生部</a></li>
		  				<li><a>校团委</a></li>
		  			</ul>
		  		</a>
		  		
		  		<a href="https://auth.szu.edu.cn/cas.aspx/login?service=http://swzx.szu.edu.cn"  ref="login">登陆</a>
		  		<a>{this.state.name + ' ' + this.state.studentno}</a>
		  	</div>
		  	<div className="bottom">
		  		<div className="logo">
		  			<Link to="/">
		  				<img src={LOGO} />
		  			</Link>
		  		</div>
		  		<ul>
		  			<li><Link to='/'>首页</Link></li>
		  			<li><Link to='/intro'>中心介绍</Link></li>
		  			<li><Link to='/subpage/news'>新闻公告</Link></li>
		  			<li><Link to='/subpage/guide'>办事指南</Link></li>
		  			<li><Link to='/business'>事务查询／咨询</Link></li>
		  			<li>
		  				<Link>更多服务</Link>
		  				<ul>
		  					<li><a href="http://210.39.2.88:4000">勤工助学工资签领</a></li>
		  				</ul>
		  			</li>
		  		</ul>
		  	</div>
		  </header>
		)
	}
}