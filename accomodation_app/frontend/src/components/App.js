import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from './accounts/Login';
import Register from  './accounts/Register';

class App extends Component {
    render() {
        return (
        	<Router>
	        	<Fragment>
	        		 <Switch>
	                  <Route exact path="/register" component={Register} />
	                  <Route exact path="/login" component={Login} />
	                </Switch>
	        	</Fragment>
        	</Router>
        )
    }
} 

ReactDOM.render(<App />, document.getElementById('app'));