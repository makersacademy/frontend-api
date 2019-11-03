import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import ViewPeeps from './components/ViewPeeps';
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/viewall" component={ViewPeeps}/>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
   
 
  );
}

export default App;
