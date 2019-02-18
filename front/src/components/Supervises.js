import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Panel } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import { fetchSupervises, createSupervise, editSupervise, deleteSupervise } from '../actions/superviseActions';
import { registerUser, loginUser, logoutUser } from '../actions/userActions';


class Supervises extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            columns: [
            { dataField:'id',text:'ID',headerStyle:(colum,colIndex)=>{return{width:'30px'};},hidden:true },
            { dataField:'ddate',text:'日期',filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'90px'};}},
            { dataField:'county',text:'区县',filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'60px'};}},
            { dataField:'community',text:'街道/乡镇',filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'60px'};}},
            { dataField:'grid',text:'网格',hidden:true,filter:textFilter() },
            { dataField:'grid_person',text:'网格员',hidden:true,filter:textFilter() },
            { dataField:'name',text:'被检查单位',filter:textFilter() },
            { dataField:'address',text:'地址',filter:textFilter() },
            { dataField:'contact',text:'联系人',filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'60px'};}},
            { dataField:'tel',text:'联系电话',filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'100px'};} },
            { dataField:'checker',text:'督导组成员',filter:textFilter() },
            { dataField:'correct_duty_dep',text:'整改责任单位',hidden:true },
            { dataField:'correct_duty_person',text:'整改责任人',hidden:true },
            { dataField:'is_correct',text:'是否整改',filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'60px'};}, hidden:true},
            { dataField:'correct_date',text:'整改完成日期',hidden:true,headerStyle:(colum,colIndex)=>{return{width:'60px'};} }
            ],
            rowClick: {
                onClick: (e, row, rowIndex) => {
                    this.props.history.push('/supervises/'+row.id)
                }
            }
        };
        this.handleAddSuperviseClick = this.handleAddSuperviseClick.bind(this);
    } 

    componentWillMount() {
        this.props.fetchSupervises();
    }

    handleAddSuperviseClick() {
        this.props.history.push('/supervise_add');
    }

    render() {
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <h3>督导记录</h3>
                    </Panel.Heading>
                    <Panel.Body>
                        <BootstrapTable
                          keyField = 'id'
                          data = { this.props.supervises }
                          columns = { this.state.columns }
                          striped 
                          hover 
                          noDataIndication = "没有可以显示的数据 "
                          pagination={ paginationFactory() }
                          filter={ filterFactory() }
                          exportCSV={ true }
                          rowEvents={ this.state.rowClick }
                        >
                        </BootstrapTable>
                    </Panel.Body>
                    <Panel.Footer>
                        {(Object.keys(this.props.userinfo).length !== 0)?<Button onClick = { this.handleAddSuperviseClick }>新建督导记录</Button>:''}
                    </Panel.Footer>
                </Panel>
            </div>
        )
    }
}

Supervises.propTypes = {
    fetchSupervises: propTypes.func.isRequired,
    createSupervise: propTypes.func.isRequired,
    editSupervise: propTypes.func.isRequired,
    deleteSupervise: propTypes.func.isRequired,
    supervises: propTypes.array.isRequired,
    supervise: propTypes.object.isRequired,
    registerUser: propTypes.func,
    loginUser: propTypes.func,
    logoutUser: propTypes.func,
    userinfo: propTypes.object,
    history: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    supervises: state.supervises.items,
    supervise: state.supervises.item,
    userinfo: state.users.item
})


export default withRouter(
    connect(
        mapStateToProps, { 
            fetchSupervises, 
            createSupervise, 
            editSupervise, 
            deleteSupervise,
            registerUser,
            loginUser,
            logoutUser 
        })(Supervises));