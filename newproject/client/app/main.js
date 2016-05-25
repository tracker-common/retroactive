import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import CreateRetroForm from './createRetro';
import RetroActive from './app';
import createHistory from 'history/lib/createHashHistory'

// Opt-out of persistent state, not recommended.
let history = createHistory({
  queryKey: false
})

//ReactDOM.render(<RetroActive data= {data} />, document.getElementById('app'));

ReactDOM.render((
  <Router history={history}>
    <Route name="home" path="/" component={RetroActive}/>
    <Route name="/createRetro" path="/createRetro" component={CreateRetroForm}/>
  </Router>
), document.getElementById('app'));