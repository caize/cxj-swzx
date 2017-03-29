//webpack 入口文件
import React, { Component } from 'react'
import Header from '../Header/header.js'
import Footer from '../Footer/footer.js'

import './template.less'
// 配置整体组件
export default class template extends Component {
    constructor(props) {
        super(props);        
    } 

    render() {
        return (
            <div>
                <div id="main">
                    <Header />
                    {this.props.children} 
                    <Footer />               
                </div>
            </div>
        )
    }
}

