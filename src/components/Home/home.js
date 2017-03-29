import React, { Component } from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import Carousel from 'react-bootstrap/lib/Carousel'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import './home.less'
import { CONFIG } from '../../config'
import HomeCarouselImg1 from '../../img/1.jpg'
import HomeCarouselImg2 from '../../img/2.jpg'
import HomeCarouselImg3 from '../../img/3.jpg'
import HomeCarouselImg4 from '../../img/4.jpg'

import ZHONGXIN from '../../img/zhongxin.jpg'
import XINWEN from '../../img/xinwen.png'
import SHIWU from '../../img/shiwu.png'
import ZHINAN from '../../img/zhinan.png'
import XIAOYUAN from '../../img/xiaoyuan.png'
import XIAZAI from '../../img/xiazai.png'
import WENTI from '../../img/wenti.png'
import LIANJIE from '../../img/lianjie.png'

export default class header extends Component {
	constructor(props) {
		super(props);
		this.state = {  
			pictures: []
		}
	}

	componentDidMount() {
		let that = this
		$.ajax({
			url: {CONFIG}.CONFIG.server + '/apipicture',
			dataType: 'jsonp',
		})
		.done(function(data) {
			that.setState({
				pictures: data.picture
			})
		})
		
	}

	render() {
		return (
			<div className="home">
			  <Carousel>
			  	{this.state.pictures.map((picture) => 
			    <Carousel.Item>
			      <img src={picture.path}/>
			      <Carousel.Caption>
			        <p>{picture.content}</p>
			      </Carousel.Caption>
			    </Carousel.Item>
			    )}

			  </Carousel>

			  <div className="card-container">
			  	<Link to="/intro" className="card">
			  		<h2>中心介绍</h2>
			  		<p>去哪 一目了然</p>
			  		<img src={ZHONGXIN} />
			  	</Link>

			  	<Link to="/subpage/news" className="card">
			  		<h2>新闻公告</h2>
			  		<p>对待NEWS 从不奔放</p>
			  		<img src={XINWEN} />
			  	</Link>

			  	<Link to="/business" className="card">
			  		<h2>事务咨询</h2>
			  		<p>问尽你想</p>
			  		<img src={SHIWU} />
			  	</Link>

			  	<Link to="/subpage/guide" className="card">
			  		<h2>办事指南</h2>
			  		<p>方向比速度更重要</p>
			  		<img src={ZHINAN} />
			  	</Link>

			  	<Link to="/subpage/school" className="card">
			  		<h2>校园信息</h2>
			  		<p>放大你所不见</p>
			  		<img src={XIAOYUAN} />
			  	</Link>

			  	<Link to="/subpage/data" className="card">
			  		<h2>资料下载</h2>
			  		<p>无限 无繁琐 只有你最想要</p>
			  		<img src={XIAZAI} />
			  	</Link>

			  	<Link to="/subpage/question" className="card">
			  		<h2>常见问题</h2>
			  		<p>不套路 只走心</p>
			  		<img src={WENTI} />
			  	</Link>

			  	<Link to="/link" className="card">
			  		<h2>常见链接</h2>
			  		<p>1秒到达下一站</p>
			  		<img src={LIANJIE} />
			  	</Link>

			  </div>
		  </div>
		)
	}
}