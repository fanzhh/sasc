import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { createSupervise, editSupervise, fetchSupervise, fetchSupervises } from '../actions/superviseActions';
import { registerUser, loginUser, logoutUser } from '../actions/userActions';

class SuperviseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ddate: '',
            county: '',
            community: '',
            grid: '',
            grid_person: '',
            name: '',
            address: '',
            contact: '',
            tel: '',
            checker: '',
            correct_duty_dep: '',
            correct_duty_person: '',
            correct_date:'',
            photo: null,
            is_edit_mode: false,
            pk: 0,
            token: null
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
    }

    componentWillMount() {
        let pk = 0;
        if (this.props.match.params.pk) {
            pk = this.props.match.params.pk
        }
        if (pk > 0) {
            this.setState({pk:pk, is_edit_mode: true});
            fetchSupervise(pk)
        }
    }

    componentDidMount() {
        if (this.state.is_edit_mode) {
            Object.keys(this.props.supervise).map((item,i) => (
                this.setState({[item]:this.props.supervise[item],})
            )
        )}
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.supervise) !== JSON.stringify(nextProps.supervise)){
            this.props.history.push('/supervises/'+nextProps.supervise.id)
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onPhotoChange(e) {
        this.setState({photo: e.target.files[0]})
    }

    onSubmit(e) {
        e.preventDefault();
        const supervise = {
            ddate: this.state.ddate,
            county: this.state.county,
            community: this.state.community,
            grid: this.state.grid,
            grid_person: this.state.grid_person,
            name: this.state.name,
            address: this.state.address,
            contact: this.state.contact,
            tel: this.state.tel,
            checker: this.state.checker,
            correct_duty_dep: this.state.correct_duty_dep,
            correct_duty_person: this.state.correct_duty_person,
            photo: this.state.photo,
        }
        if (!this.state.is_edit_mode) {
            this.props.createSupervise(supervise, this.props.userinfo.token);
        } else {
            this.props.editSupervise(this.state.pk, supervise, this.props.userinfo.token);
        }    
    }

    render() {
        return (
            <Panel>
                <Panel.Heading><h3>{this.state.is_edit_mode?('编辑'):('新建')}督导记录</h3></Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.onSubmit} className="form-element" encType="multipart/form-data">
                        <label htmlFor="name">被督导单位名称</label>
                        <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="contact">联系人</label>
                        <input type="text" id="contact" name="contact" value={this.state.contact} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="address">被督导单位地址</label>
                        <input type="text" id="address" name="address" value={this.state.address} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="tel">联系电话</label>
                        <input type="text" id="tel" name="tel" value={this.state.tel} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="county">县/区</label>
                        <input type="text" id="county" name="county" value={this.state.county} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="community">街道/镇</label>
                        <input type="text" id="community" name="community" value={this.state.community} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="grid">网格</label>
                        <input type="text" id="grid" name="grid" value={this.state.grid?this.state.grid:''} onChange={this.onChange} />
                        <br />
                        <label htmlFor="grid_person">网格员</label>
                        <input type="text" id="grid_person" name="grid_person" value={this.state.grid_person?this.state.grid_person:''} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="ddate">督导日期</label>
                        <input type="date" id="ddate" name="ddate"  value={this.state.ddate} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="checker">督导组成员</label>
                        <input type="text" id="checker" name="checker"  value={this.state.checker} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="correct_duty_dep">整改责任单位</label>
                        <input type="text" id="correct_duty_dep" name="correct_duty_dep"  value={this.state.correct_duty_dep} onChange={this.onChange}/>
                        <br />
                        <label htmlFor="correct_duty_person">整改责任人</label>
                        <input type="text" id="correct_duty_person" name="correct_duty_person" value={this.state.correct_duty_person} onChange={this.onChange}/>
                        <br/>
                        <label htmlFor="photo">附件</label>
                        <input type="file" id="photo" name="photo" onChange={this.onPhotoChange} />
                        <img src = {this.state.photo} alt="" />
                        <hr />
                        <button type="submit">保存</button>
                        <button type="button" onClick={this.props.history.goBack}>取消</button>
                    </form>
                </Panel.Body>
            </Panel>
        )
    }
}

SuperviseForm.propsTypes = {
    createSupervise: propsTypes.func.isRequired,
    editSupervise: propsTypes.func.isRequired,
    fetchSupervise: propsTypes.func.isRequired,
    fetchSupervises: propsTypes.func.isRequired,
    supervise: propsTypes.object,
    registerUser: propsTypes.func,
    loginUser: propsTypes.func,
    logoutUser: propsTypes.func,
    userinfo: propsTypes.object
}

const mapStateToProps = state => ({
    supervise: state.supervises.item,
    userinfo: state.users.item,
})

export default withRouter(
    connect(mapStateToProps,{ createSupervise, editSupervise, fetchSupervise,fetchSupervises, registerUser, loginUser, logoutUser })(SuperviseForm));