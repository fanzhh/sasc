import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { withRouter } from 'react-router-dom';

import { fetchDefects } from '../actions/defectActions';

class Defects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns : [
                { dataField:'id',text:'ID',hidden:true },
                { dataField:'supervise__id',text:'ID',hidden:true,
                  headerStyle:(colum,colIndex)=>{return{width:'30px'};},
                },
                { dataField:'supervise__ddate',text:'日期' ,filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'90px'};}},
                { dataField:'supervise__county',text:'区县' ,filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'60px'};} },
                { dataField:'supervise__community',text:'街道/乡镇' ,filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'60px'};}},
                { dataField:'supervise__name',text:'被检查单位' ,filter:textFilter(),headerStyle:(colum,colIndex)=>{return{width:'190px'};}},
                { dataField:'description',text:'发现问题' ,filter:textFilter() }
            ],
            rowClick: {
                onClick: (e, row, rowIndex) => {
                    this.props.history.push('/supervises/'+row.supervise__id)
                }
            }
        }
    }

    componentWillMount() {
        this.props.fetchDefects();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newDefect){
            this.props.defects.unshift(nextProps.newDefect)
        }
    }

    render() {
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <h3>发现问题</h3>
                    </Panel.Heading>
                    <Panel.Body>
                        <BootstrapTable 
                          keyField='id' 
                          data={this.props.defects} 
                          columns={this.state.columns}
                          striped 
                          hover 
                          noDataIndication = "没有可以显示的数据 "
                          pagination={ paginationFactory() }
                          filter={ filterFactory() }
                          exportCSV={ true }
                          rowEvents={ this.state.rowClick }
                        />
                    </Panel.Body>
                    <Panel.Footer>
                        
                    </Panel.Footer>
                </Panel>
            </div>
        )
    }
}

Defects.propTypes = {
    fetchDefects: propTypes.func.isRequired,
    defects: propTypes.array.isRequired,
    newDefect: propTypes.object
}

const mapStateToProps = state => ({
    defects: state.defects.items,
    newDefect: state.defects.item
})

export default withRouter(connect(mapStateToProps,{ fetchDefects })(Defects));