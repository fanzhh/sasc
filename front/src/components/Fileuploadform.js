import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { registerUser, loginUser } from '../actions/userActions';
import { newDefectAttachment } from '../actions/defectActions';
import { fetchSupervise } from '../actions/superviseActions';


class FileUploadForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            name: '',
            img: null,
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onChange(e) {
        this.setState({name: e.target.value})
    }

    onFileChange(e) {
        this.setState({img: e.target.files[0]})
    }

    onSubmit(e){
        e.preventDefault();
        let pk = this.props.match.params.pk;
        let token = this.props.userinfo.token;
        const attachment = {
            name: this.state.name,
            img: this.state.img
        }
        let operation = '';
        if (this.props.history.location.pathname.includes('/defect_description_photo_upload')) {
            operation = 'defect_description';
        } 
        if (this.props.history.location.pathname.includes('/defect_correct_photo_upload')) {
            operation = 'defect_correction';
        }
        if (operation === '') {
            this.props.history.push('/supervises/'+this.props.supervise.id)
        }
        this.props.newDefectAttachment(pk,operation,attachment,token);
        this.props.history.push('/supervises/'+this.props.supervise.id)
    }

    onCancel() {
        this.props.history.push('/');
    }      

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <h3>
                        请上传文件
                    </h3>
                </Panel.Heading>
                <Panel.Body>
                <form onSubmit={this.onSubmit} encType="multipart/form-data" >
                    <label htmlFor="name">请输入附件名称</label>
                    <br/>
                    <input type="text" id="name" name="name" onChange={this.onChange} />
                    <br/>
                    <br/>
                    <label htmlFor="img">请选择文件</label>
                    <br/>
                    <input type="file" id="img" name="img" onChange={this.onFileChange} />
                    <hr/>
                    <button type="submit">提交</button>
                </form>
                </Panel.Body>
                <Panel.Footer />
            </Panel>
        )
    }
}

FileUploadForm.propsTypes = {
    loginUser: propsTypes.func.isRequired,
    registerUser: propsTypes.func.isRequired,
    userinfo: propsTypes.object,
    newDefectAttachment: propsTypes.func.isRequired,
    defects: propsTypes.object,
    supervise: propsTypes.object
}

const mapStateToProps = state => ({
    userinfo: state.users.item,
    attachment: state.defects.item,
    supervise: state.supervises.item,
})

export default withRouter(connect(mapStateToProps,{ loginUser, registerUser, newDefectAttachment, fetchSupervise })(FileUploadForm));
