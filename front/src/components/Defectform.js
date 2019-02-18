import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, FormGroup } from 'react-bootstrap';

import { createDefect, editDefect, fetchDefect } from '../actions/defectActions';
import { fetchSupervise } from '../actions/superviseActions';
import { registerUser, loginUser, logoutUser  } from '../actions/userActions';


class DefectForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            correction: '',
            is_correct: false,
            supervise_id: 0,
            is_edit_mode: false,
            pk: 0,
            token: null,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        if (this.props.history.location.pathname.includes('/defect_add')) {
            let tmp = this.props.history.location.pathname.split('/').pop();
            this.setState({supervise_id: Number(tmp)})
        }
        if (this.props.history.location.pathname.includes('/defect_edit')) {
            let pk = this.props.history.location.pathname.split('/')[3];
            let supervise_id = this.props.history.location.pathname.split('/')[2];
            this.setState({pk:Number(pk), supervise_id:Number(supervise_id), is_edit_mode:true});
            this.props.fetchDefect(pk);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.defect).length !== 0) {
            Object.keys(nextProps.defect).map((item, i) => (
                this.setState({[item]: nextProps.defect[item],})
            ))
        }
        if (Object.keys(nextProps.userinfo).length !== 0) {
            if ('token' in nextProps.userinfo) {
                this.setState({'token': nextProps.userinfo.token,})
            } else {
                this.setState({'token': null,})
            }
        }
    }

    onChange(e) {
        if (!e.target.id.includes('is_correct')){
            this.setState({[e.target.name]: e.target.value})
        } else {
            if (e.target.id === 'is_correct_no') {
                this.setState({is_correct: ! e.target.checked })
            } else {
                this.setState({is_correct: e.target.checked })
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const defect = {
            description: this.state.description,
            correction: this.state.correction,
            is_correct: this.state.is_correct,
            supervise_id: this.state.supervise_id,
        }
        if (Object.keys(this.props.userinfo).length !== 0) {
            if (this.state.is_edit_mode) {
                this.props.editDefect(this.state.pk, defect, this.props.userinfo.token);
            } else {
                this.props.createDefect(this.state.supervise_id, defect, this.props.userinfo.token);
            }
        } else {
            alert("抱歉，您没有此操作的权限！")
        }
        this.props.history.push('/supervises/'+this.state.supervise_id);
    }

    onCancel() {
        if (this.state.is_edit_mode) {
            if (this.state.supervise_id>0) {
                this.props.history.push('/supervises/'+this.state.supervise_id)
            } else {
                this.props.history.push('/')
            }
        } else {
            this.props.history.push('/supervises/'+this.state.supervise_id);
        }
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <h3>
                        {this.state.is_edit_mode?('编辑'):('增加')}督导发现问题
                    </h3>
                </Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.onSubmit} className="form-element">
                        <label htmlFor="description">问题描述</label>
                        <input 
                            type="text" 
                            id="description" 
                            name="description" 
                            value={
                                this.state.description ? this.state.description : ''
                            } 
                            onChange={this.onChange} 
                        />    
                        <br />
                        <label htmlFor="correction">整改情况描述</label>
                        <input 
                            type="text" 
                            id="correction" name="correction"  
                            value={
                                this.state.correction ? this.state.correction:''
                            } 
                            onChange={this.onChange} 
                        />
                        <br />
                        <FormGroup>
                        <label htmlFor="is_correct_no">
                        <input 
                            id="is_correct_no" 
                            type="radio" 
                            name="is_correct" 
                            value={0} 
                            onChange={this.onChange} 
                            checked={
                                !this.state.is_correct
                            } 
                        />
                        未整改</label>
                        <label htmlFor="is_correct_yes">
                        <input 
                            id="is_correct_yes" 
                            type="radio" 
                            name="is_correct" 
                            value={1} 
                            onChange={this.onChange} 
                            checked={
                                this.state.is_correct
                            } 
                        />
                        已整改</label>
                        </FormGroup>
                        <button type="submit">保存</button>
                        <button type="button" onClick={()=>{this.onCancel()}}>取消</button>
                    </form>
                </Panel.Body>
                <Panel.Footer />
            </Panel>
        )
    }
}

DefectForm.propsTypes = {
    createDefect: propsTypes.func.isRequired,
    editDefect: propsTypes.func.isRequired,
    fetchDefect: propsTypes.func.isRequired,
    fetchSupervise: propsTypes.func.isRequired,
    registerUser: propsTypes.func,
    loginUser: propsTypes.func,
    logoutUser: propsTypes.sunc,
    userinfo: propsTypes.object.isRequired,
    defect: propsTypes.object
}

const mapStateToProps = state => ({
    defect: state.defects.item,
    userinfo: state.users.item
})

export default connect(mapStateToProps,{ createDefect, editDefect, fetchDefect, fetchSupervise, registerUser, loginUser, logoutUser })(DefectForm);