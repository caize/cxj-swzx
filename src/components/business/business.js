import React, { Component } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import cookie from 'react-cookie'
import { Breadcrumb, Icon , Table, Input, Modal, Button, Form, Checkbox, Radio,  message} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { CONFIG } from '../../config.js'
import './business.less'

const info = function () {
  message.info('上传成功');
};

class NormalLoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
		    value: 1,
		}

	}

	 onChange(e){
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit (e){
  	let that = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	values.businessinfo = that.refs.businessinfo.props.value
      	if(values.businessinfo && values.telphone && values.title && values.content) {
      		this.props.closeModal()
      	}
      	values.name = cookie.load('name')
      	values.studentno = cookie.load('studentno')
      	values.academy = cookie.load('academy')
      	

        $.ajax({
        	url: 'http://210.39.2.88:3000/apipostbusiness',
        	dataType: 'jsonp',
        	data: {businessForm: values},
        })
        .done(function(data) {
        	info()
        })
        
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="business-form">
      	 <FormItem
          {...formItemLayout}
          label="事务是否公开"
          hasFeedback
        >
            <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value} ref="businessinfo">
		        <Radio value={1}>公开</Radio>
		        <Radio value={0}>保密</Radio>
	        </RadioGroup> 
         
	        <br />
	        （为方便其他同学参考，一般情况下请选择公开）
	      
      	</FormItem>

        <FormItem
          {...formItemLayout}
          label="手机号码"
          hasFeedback
        >
          {getFieldDecorator('telphone', {
            rules: [{ required: true, message: '请输入手机号码' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="事务标题"
          hasFeedback
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入事务标题' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="事务内容"
          hasFeedback
        >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入事务内容' }],
          })(
            <Input  type="textarea" rows={4} />
          )}
        </FormItem>
        <div style={{ textAlign: 'center' }}>
        	<Button type="primary" htmlType="submit" className="login-form-button">
             提交
          </Button>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default class subpage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subpageName: '',
			searchInputValue: '',
			loading: false,
    		visible: false,
    		send_visible: false,
    		news: [],
    		temp_news: [],
    		aNews: {}
		}
		this.searchHandleChange = this.searchHandleChange.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.sendHandleCancel = this.sendHandleCancel.bind(this);
		this.showPerBusiness = this.showPerBusiness.bind(this);
	}

	getSubPage() {
		let that = this
		this.setState({
			subpageName: '事务咨询／查询'
		})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apibusiness',
				dataType: 'jsonp'
			})
			.done(function(data) {
				that.setState({
					news: data.business,
					temp_news: data.business
				})
			})

	}

	showPerBusiness() {
		let that = this
		if(!cookie.load('studentno')) {
			message.info('请先登录');
			return
		}
		this.setState({
			subpageName: '事务咨询／查询'
		})
			$.ajax({
				url: {CONFIG}.CONFIG.server + '/apibusiness',
				dataType: 'jsonp',
				data: {
					number: cookie.load('studentno')
				}
			})
			.done(function(data) {
				that.setState({
					news: data.business,
					temp_news: data.business
				})
				// console.log(data)
			})

	}

	searchHandleChange(event) {
    	this.setState({searchInputValue: event.target.value});
    	let input = event.target.value
    	let reg = new RegExp(input)
    	let tmp = []
    	this.state.news.map(function(elem, index) {
    		if((elem.msg_title).match(reg)) {
    			tmp.push(elem)
    		}
    	})
    	this.setState({
    		temp_news: tmp
    	})

    	// if($('.subpage-table .title p').html().match(reg)) {
    	// 	console.log(1)
    	// }
  	}

  	showSendModal() {
  		if(!cookie.load('studentno')) {
			message.info('请先登录');
			return
		}
  		this.setState({
  			send_visible: true
  		})
  	}

  	closeModal() {
  		this.setState({
  			send_visible: false
  		})
  	}

  	sendHandleCancel() {
    	this.setState({ send_visible: false });
  	}

  	showModal(Newsid) {
  		
  		
	    this.setState({
	      visible: true,
	    });
	    let that = this
	    $.ajax({
  			url: {CONFIG}.CONFIG.server + '/apibusiness',
  			dataType: 'jsonp',
  			data: {msg_id: Newsid},
  		})
  		.done(function(data) {
  			console.log(data);
  			that.setState({
  				aNews: data.business[0]
  			})
  		})
  		.fail(function() {
  			console.log("error");
  		})
  		.always(function() {
  			console.log("complete");
  		});
	}

	handleCancel() {
    	this.setState({ visible: false });
  	}

  	handleSubmit (e) {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
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
		  dataIndex: 'msg_title',
		  dataIndex: 'msg_id',
		  key: 'title',
		  className: 'title',
		  render: (text,record, index) => <a onClick={this.showModal.bind(this, record.msg_id)}>{record.msg_title}</a>,
		}, {
		  title: '标签',
		  dataIndex: 'icon',
		  key: 'icon',
		  className: 'icon',
		  render: text => <Icon type="paper-clip" />,
		}, {
		  key: 'state1',
		  dataIndex: 'msg_stime',
		  render: text => <span className='state' style={{ color: 'red', display: text[0]=='0'?'block':'none'}}>未办理</span>,
		},{
		  key: 'state2',
		  dataIndex: 'msg_stime',
		  render: text => <span className='state' style={{ color: 'green', display: text[0]!='0'?'block':'none'}}>已办理</span>,
		},{
		  key: 'id',
		  dataIndex: 'msg_id',
		  render: text => <span className='id'>{text}</span>,
		}, {
		  title: '时间',
		  dataIndex: 'msg_rtime',
		  key: 'time',
		  className: 'time',
		  render: (text,record, index) => <div><Icon type="clock-circle-o" style={{ color: '#2db7f5', marginRight: 10 }} />{new Date(text).format("yyyy-MM-dd hh:mm")}</div>,
		  

		}];

		return(

			<div className="sub-page1">
				<div className="breadcrumb">

					<Breadcrumb>
					    <Breadcrumb.Item href="/">
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
					<div className="button-group">
					<Button onClick={this.showPerBusiness.bind(this)}>我的事务</Button>
					<Button onClick={this.getSubPage.bind(this)}>所有事务</Button>
					<Button type="primary" onClick={this.showSendModal.bind(this)}>我要咨询</Button>
					
					</div>
					<Input placeholder="输入关键字搜索" onChange={this.searchHandleChange} />
				</div>
				<div className="subpage-table">
					<Table dataSource={this.state.temp_news} columns={columns} pagination={{pageSize: 12}} />
				</div>
				<Modal
          			visible={this.state.visible}
		          	title={this.state.aNews.msg_title}
		          	onOk={this.handleOk}
		          	onCancel={this.handleCancel}
		          	width={800}
		          	footer={[
		            	<Button key="back" size="large" onClick={this.handleCancel}>知道了</Button>,
		          	]}
		        	>
			          <span style={{ fontWeight: 700}}>事务详情：</span><div className="a-business" dangerouslySetInnerHTML={{__html: this.state.aNews.msg_content}}></div>
			          <br />
			          <span style={{ fontWeight: 700}}>回复内容：</span><div id="business-record"><p className="a-news" dangerouslySetInnerHTML={{__html: this.state.aNews.msg_scontent}}></p><div className="record-depart">回复部门：{this.state.aNews.msg_sbmname}</div></div>
        		</Modal>

        		<Modal
          			visible={this.state.send_visible}
		          	title='请认真填写以下内容'
		          	onCancel={this.sendHandleCancel}
		          	width={800}
		          	footer={null}
		        	>
		        	<WrappedNormalLoginForm closeModal={this.closeModal.bind(this)} />
        		</Modal>

			</div>
		)
	}
}
