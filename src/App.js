import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Register from './Register'
import Login from './Login'
import Landing from './Landing'

//Set up Redux//





function App() {
  return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
          </div>
        </Router>
  );
}

export default App;
