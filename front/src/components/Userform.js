import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

import { registerUser, loginUser } from '../actions/userActions';


class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            username: '',
            password: ''
        }
	this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this)
    }

    componentDidMount() {
        if (this.props.history.location.pathname.includes('/user_login')) {
            this.setState({isLogin: true})
        } else {
            this.setState({isLogin: false})
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        if ((this.props.history.location.pathname.includes('/user_login'))) {
            this.props.loginUser(userData);
        } else {
            this.props.registerUser(userData);
        }
        this.props.history.push('/')
    }

    onCancel() {
        this.props.history.push('/')
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <h3>
                        请{(this.props.history.location.pathname.includes('/user_login')) ? ('登录'):('注册')}
                    </h3>
                </Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.onSubmit} className="form-element">
                        <label htmlFor="username">用户名</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            onChange={this.onChange} 
                        /><small>{(this.props.history.location.pathname.includes('/user_login'))?'':'仅支持英文字符，建议使用姓名全拼'}</small>   
                        <br />
                        <label htmlFor="password">密码</label>
                        <input 
                            type="password" 
                            id="password" name="password"  
                            onChange={this.onChange} 
                        /><small>{(this.props.history.location.pathname.includes('/user_login'))?'':'英文字符或数字组合'}</small>
                        <hr />
                        <button type="submit">{(this.props.history.location.pathname.includes('/user_login'))?'登录':'注册'}</button>
                        <button type="button" onClick={()=>{this.onCancel()}}>取消</button>
                    </form>
                </Panel.Body>
                <Panel.Footer />
            </Panel>
        )
    }
}

UserForm.propsTypes = {
    loginUser: propsTypes.func.isRequired,
    registerUser: propsTypes.func.isRequired,
    userinfo: propsTypes.object
}

const mapStateToProps = state => ({
    userinfo: state.users.item
})

export default connect(mapStateToProps,{ loginUser, registerUser })(UserForm);
