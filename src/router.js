import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
const history = createHistory()

// 引入单个页面（包括嵌套的子页面）
import Template from './components/Template/template.js'
import Home from './components/Home/home.js'
import SubPage from './components/SubPage/subpage.js'
import Intro from './components/SubPage/intro.js'
import Contact from './components/contact/contact.js'
import Business from './components/business/business.js'
import Link from './components/link/link.js'
import Properties from './components/Properties/properties.js'
import MoreProperties from './components/Properties/more.js'

class Swzx extends React.Component {

  getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = browserHistory.getCurrentLocation().search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  } 
  componentDidMount() {
    let ticket = this.getQueryString('ticket')
    self.location='http://210.39.2.88:3000?ticket='+ticket;
  }
  render() {
    return(
      <div>正在跳转。。。</div>
    )
  }
}

class BAIKE extends React.Component {

  getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = browserHistory.getCurrentLocation().search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  } 
  componentDidMount() {
    let ticket = this.getQueryString('ticket')
    self.location='http://www.wacxt.cn/passport/cas.php?ticket='+ticket;
  }
  render() {
    return(
      <div>正在跳转。。。</div>
    )
  }
}

// 配置路由，并将路由注入到id为init的DOM元素中
ReactDOM.render(
    <Router history={browserHistory} >        
        <Route path="/" component={Template} >
           <IndexRoute component={Home} />
           <Router path="/subpage/:title" component={SubPage} />
           <Router path="/contact" component={Contact} />
           <Router path="/business" component={Business} />
          
           <Router path="/link" component={Link} />
           <Router path="/intro" component={Intro} />
           <Router path="/properties/:name" component={MoreProperties} />
        </Route>
         <Router path="/swzx" component={Swzx} />
         <Router path="/sdbk" component={BAIKE} />
    </Router>
    , document.querySelector('#app')
)