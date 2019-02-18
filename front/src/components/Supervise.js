import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Panel, Button, Glyphicon } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import { fetchSupervise, deleteSupervise, fetchSupervises } from '../actions/superviseActions';
import { deleteDefect, editDefect, createDefect, fetchDefectsBySupervise } from '../actions/defectActions';
import { registerUser, loginUser, logoutUser } from '../actions/userActions';
import { getDefectAttachmentsBySupervise } from '../actions/defectAttachmentActions';

import { UURL } from '../actions/types';


class Supervise extends Component {

    constructor(props) {
        super(props);
        this.state = { 'token':null, imgs:[], isOpen:false };
        this.superviseDelete = this.superviseDelete.bind(this);
        this.superviseEdit = this.superviseEdit.bind(this);
        this.defectDelete = this.defectDelete.bind(this);
        this.addDefectClick = this.addDefectClick.bind(this);
        this.editDefectClick = this.editDefectClick.bind(this);
        this.addDefectAttachment = this.addDefectAttachment.bind(this);
        this.addDefectCorrectAttachment = this.addDefectCorrectAttachment.bind(this);
    }

    componentWillMount() {
        this.props.fetchSupervise(this.props.match.params.pk);
        this.props.fetchDefectsBySupervise(this.props.match.params.pk);
        this.props.getDefectAttachmentsBySupervise(this.props.match.params.pk)
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.userinfo).length !== 0) {
            if ('token' in nextProps.userinfo) {
                this.setState({'token': nextProps.userinfo.token,})
            } else {
                this.setState({'token': null,})
            }
        }
        if (JSON.stringify(this.props.defect) !== JSON.stringify(nextProps.defect)) {
            this.props.fetchDefectsBySupervise(this.props.match.params.pk)
        }
    }

    superviseDelete(e) {
        if (window.confirm('您要删除这条督导记录吗？') === true) {
            this.props.deleteSupervise(this.props.match.params.pk, this.state.token);
            this.props.fetchSupervises();
            this.props.history.push('/')
        }
    }

    superviseEdit(e) {
        this.props.history.push('/supervise_edit/'+this.props.match.params.pk)
    }

    defectDelete(e) {
        if (window.confirm('您要删除这条问题吗？') === true) {
            this.props.deleteDefect(e.target.id,this.state.token);
            this.props.fetchDefectsBySupervise(this.props.match.params.pk);
            this.props.history.push('/supervises/'+this.props.supervise.id);
        }
    }

    addDefectClick() {
        this.props.history.push('/defect_add/'+this.props.supervise.id);
    }

    editDefectClick(e) {
        this.props.history.push('/defect_edit/'+this.props.supervise.id+'/'+e.target.id)
    }

    addDefectAttachment(e) {
        this.props.history.push('/defect_description_photo_upload/'+e.target.id)
    }

    addDefectCorrectAttachment(e) {
        this.props.history.push('/defect_correction_photo_upload/'+e.target.id)
    }

    render() {
        const defects_list = [];
        const defects = this.props.defects;
        let description_attachments_list = [];
        let correction_attachments_list = [];
        if (Object.keys(this.props.attachments).length !== 0) {
            this.props.attachments.forEach((attachment)=>{
                let obj1 = {'id':attachment.id,'description':[]};
                attachment.description.forEach((desc)=>{
                    obj1['description'].push(
                        <Glyphicon key={desc.id} id={desc.id} glyph="picture" onClick={()=>this.setState({imgs:[UURL+desc.img.substring(1,200)],isOpen:true})} />
                    )
                });
                description_attachments_list.push(obj1);
                let obj2 = {'id':attachment.id,'correct':[]};
                attachment.correct.forEach((correct)=>{
                    obj2['correct'].push(
                        <Glyphicon key={correct.id} id={correct.id} glyph="picture" onClick={()=>this.setState({imgs:[UURL+correct.img.substring(1,200)],isOpen:true})} />
                    )
                })
                correction_attachments_list.push(obj2);
            }); 
        }
        /*console.log(description_attachments_list,correction_attachments_list);*/
        if (defects) {
            defects.forEach((defect)=>{
                defects_list.push(
                    <tr key={defect.id}>
                        <td>{defect.description}</td>
                        <td>
                            {
                                (description_attachments_list.length>0)?
                                    (description_attachments_list.find(x=>x.id===defect.id)) ?
                                        description_attachments_list.find(x=>x.id===defect.id).description
                                    :
                                        ''
                                :
                                    ''
                            }
                            {
                                this.state.token?
                                <span>&nbsp;<Glyphicon id={defect.id} glyph="paperclip" title="添加" onClick={this.addDefectAttachment} /></span>
                                    :
                                    ""
                            }
                        </td>
                        <td>{defect.correction}</td>
                        <td>
                            {
                                (correction_attachments_list.length>0)?
                                    (correction_attachments_list.find(x=>x.id===defect.id)) ?
                                        correction_attachments_list.find(x=>x.id===defect.id).correct
                                        :
                                        ''
                                    :
                                    ''
                            }
                        {
                            this.state.token?
                            <span>&nbsp;<Glyphicon id={defect.id} glyph="paperclip" title="添加" onClick={this.addDefectCorrectAttachment}  
                                /></span>
                                :
                                ""
                        }
                        </td>
                        <td>{defect.is_correct?'✓':''}</td>
                        <td>
                            {this.state.token?(<span>
                            <button id={defect.id} onClick={this.editDefectClick}
                                ><Glyphicon id={defect.id} glyph="pencil" title="编辑"/>
                            </button>
                            <button id={defect.id} onClick={this.defectDelete}
                                ><Glyphicon id={defect.id} glyph="remove" title="删除"/>
                            </button></span>):('')}
                        </td>
                    </tr>
                )
            });
        }
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <h3>创建省级食品安全市督导意见书</h3>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table bordered condensed>
                            <tbody>
                               <tr>
                                    <td width="150" bgcolor="#f5f5f5">被检查单位名称</td>
                                    <td>{this.props.supervise.name}</td>
                                    <td bgcolor="#f5f5f5">联系人</td>
                                    <td>{this.props.supervise.contact}</td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f5f5f5">被检查单位地址</td>
                                    <td>{this.props.supervise.address}</td>
                                    <td bgcolor="#f5f5f5">联系电话</td>
                                    <td>{this.props.supervise.tel}</td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f5f5f5">监管责任人</td>
                                    <td colSpan="3">{this.props.supervise.county}区{this.props.supervise.community}街道（镇）第{this.props.supervise.grid}网格，网格员：{this.props.supervise.grid_person}</td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f5f5f5">存在的问题及督导意见</td>
                                    <td colSpan="3">
                                        <Table bordered condensed>
                                            <thead>
                                                <tr>
                                                    <th>问题描述</th>
                                                    <th>问题附件</th>
                                                    <th>整改情况</th>
                                                    <th>整改附件</th>
                                                    <th>整改完毕</th>
                                                    <th>其它</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {defects_list}
                                                <tr>
                                                    <td colSpan="5"/>
                                                    <td>
                                                        {this.state.token?<button id={this.props.supervise.id} onClick={this.addDefectClick}
                                                            ><Glyphicon glyph="plus" title="增加"/>
                                                        </button>:''}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f5f5f5">督导日期</td>
                                    <td>{this.props.supervise.ddate}</td>
                                    <td bgcolor="#f5f5f5">督导组成员</td>
                                    <td>{this.props.supervise.checker}</td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f5f5f5">整改情况</td>
                                    <td colSpan="3">{this.props.supervise.correction}</td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f5f5f5">附件</td>
                                    <td colSpan="3" align="center"><img src={this.props.supervise.photo} alt=""/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel.Body>
                    <Panel.Footer>
                        {this.state.token?<Button onClick={this.superviseEdit}>编辑</Button>:''}
                        {this.state.token?<Button onClick={this.superviseDelete}>删除</Button>:''}
                        <Button onClick={()=>{this.props.history.push('/')}}>返回</Button>
                    </Panel.Footer>
                </Panel>
                {
                    this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.state.imgs[0]}
                            onCloseRequest={()=>this.setState({isOpen:false})}
                            enableZoom={true}
                        />
                    )
                }
            </div>
        )
    }
}

Supervise.propTypes = {
    fetchSupervise: propTypes.func.isRequired,
    fetchSupervises: propTypes.func.isRequired,
    deleteSupervise: propTypes.func.isRequired,
    supervise: propTypes.object.isRequired,
    defect: propTypes.object,
    deleteDefect: propTypes.func.isRequired,
    fetchDefectsBySupervise: propTypes.func.isRequired,
    getDefectAttachmentsBySupervise: propTypes.func.isRequired,
    loginUser: propTypes.func,
    registerUser: propTypes.func,
    logoutUser: propTypes.func,
    userinfo: propTypes.object,
    attachments: propTypes.array,
}

const mapStateToProps = state => ({
    supervise: state.supervises.item,
    defects: state.defects.items,
    defect: state.defects.item,
    userinfo: state.users.item,
    attachments: state.attachments.items,
})

export default withRouter(
    connect(
        mapStateToProps,{ 
            fetchSupervise, 
            fetchSupervises,
            deleteSupervise, 
            deleteDefect, 
            createDefect, 
            fetchDefectsBySupervise,
            getDefectAttachmentsBySupervise,
            editDefect,
            registerUser,
            loginUser,
            logoutUser
        }
    )(Supervise));