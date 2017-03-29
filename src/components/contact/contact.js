import React, { Component } from 'react'
import {Link} from 'react-router'
import { Breadcrumb, Icon , Table, Input, Modal, Button} from 'antd';

import './contact.less'
import XIA from '../../img/xia.jpg'
import DONG from '../../img/dong.jpg'
import BK from '../../img/bk.jpg'
import GR1 from '../../img/gr1.jpg'
import GR2 from '../../img/gr2.jpg'

export default class footer extends Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		return (
			<div className="contact">
				<div className="breadcrumb">
					<Breadcrumb>
					    <Breadcrumb.Item href="">
					      <Icon type="home" />
					           <Link to="/">首页</Link>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>
					    	<Icon type="file-text" />
					      <span>联系我们</span>
					    </Breadcrumb.Item>
					  </Breadcrumb>
				</div>
				<div className="content">
					<span style={{ marginLeft: 130}}>(夏季开放时间)</span>
					<span style={{ marginLeft: 420}}>(冬季开放时间)</span>
					<br />
					<img src={XIA} />
					<img src={DONG} style={{ marginLeft: 150}} />
					<br />
					<br />
					<br />
					<p>地址：学生活动中心一楼</p>
					<p>电话：0755-26535653</p>
					<p>微博：<a href="http://weibo.com/szuswzx">@深大事务服务中心</a></p>
					<p>信箱：<a href="http://www.szu.edu.cn/view.asp?id=95">校务信箱</a></p>
					<p>写信：<Link to="/business">站内写信</Link></p>
					<p>地址：学生活动中心一楼</p>
					<p className="weixin">微信：
						<a>深大百科 <img src={BK} /></a>

						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<a>深大事务君（2016级专用咨询，微信号：szushiwujun2016) <img src={GR1} /></a>
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<a>深大事务君（其他年级专用咨询，微信号：szushiwujun）<img src={GR2} /> </a>
					</p>
				</div>
			</div>
		)
	}
}