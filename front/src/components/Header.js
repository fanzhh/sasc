import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser, loginUser, logoutUser } from '../actions/userActions';


class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleLoginClick() {
        this.props.history.push('/user_login')
    }

    handleRegisterClick() {
        this.props.history.push('/user_register')
    }

    handleLogoutClick() {
        this.props.logoutUser();
        this.props.history.push('/')
    }
    
    render() {
        return (
            <div>
                <small className="userinfo">
                    { ((Object.keys(this.props.userinfo) !== 0) && ('token' in this.props.userinfo)) ? 
                        (<span>欢迎您,{this.props.userinfo.username}&nbsp;<a nohref="true" style={{"cursor":"pointer","color":"blue","textDecoration":"underline"}} onClick={this.handleLogoutClick}>注销</a></span>) 
                        :
                        (<span>
                            您尚未登录，请<a nohref="true" style={{"cursor":"pointer","color":"blue","textDecoration":"underline"}} onClick={this.handleLoginClick}>登录</a>
                            或<a nohref="true" style={{"cursor":"pointer","color":"blue","textDecoration":"underline"}} onClick={this.handleRegisterClick}>注册</a></span>)
                    }
                </small>
                <div style={{'align':'left'}}>
                    <h2>济宁市创建省级食品安全市督导检查台帐</h2>
                    <p>济宁市食品药品监督管理局</p>
                </div>
            </div>
        )
    }

}

Header.propsTypes = {
    loginUser: propsTypes.func.isRequired,
    registerUser: propsTypes.func.isRequired,
    logoutUser: propsTypes.func.isRequired,
    userinfo: propsTypes.object
}

const mapStateToProps = state => ({
    userinfo: state.users.item
})

export default withRouter(connect(mapStateToProps,{ loginUser, registerUser, logoutUser })(Header));