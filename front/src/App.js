import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import { Jumbotron, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Header from './components/Header';
import Bottom from './components/Bottom';

import Supervises from './components/Supervises';
import Supervise from './components/Supervise';
import SuperviseForm from './components/Superviseform';
import Defects from './components/Defects';
import DefectForm from './components/Defectform';
import UserForm from './components/Userform';
import FileUploadForm from './components/Fileuploadform';

import store from './store';
import thunk from 'redux-thunk';

const middle = [ thunk ];

export const UURL = 'http://?.?.?.?:5000/'

const history = createHistory();

if (process.env.NODE_ENV !== 'production') {
  middle.push(createLogger());
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Jumbotron className="App-header">
              <Header />
            </Jumbotron>
            <Navbar>
              <Nav>
                <NavItem componentClass={Link} href="/" to="/">
                  督导记录
                </NavItem>
                <NavItem componentClass={Link} href="/defects" to="/defects">
                  发现问题
                </NavItem>
              </Nav>
            </Navbar>
            <Switch>
              <Route exact path="/" component={Supervises} />
              <Route path="/supervises/:pk" component={Supervise} />
              <Route path="/supervise_add" component={SuperviseForm} /> 
              <Route path="/supervise_edit/:pk" component={SuperviseForm} />
              <Route path="/defects" component={Defects} />
              <Route path="/defect_add/:pk" component={DefectForm} />
              <Route path="/defect_edit/:supervise_id/:pk" component={DefectForm} />
              <Route path="/user_login" component={UserForm} />
              <Route path="/user_register" component={UserForm} />
              <Route path="/defect_description_photo_upload/:pk" component={FileUploadForm} />
              <Route path="/defect_correction_photo_upload/:pk" component={FileUploadForm} />
            </Switch>
            <Bottom />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
