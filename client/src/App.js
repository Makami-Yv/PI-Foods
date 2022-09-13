import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/Home/Home";
import { Details } from "./components/Details/Details";
import { Error } from "./components/Error/Error";
import { Form } from "./components/Form/Form"
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/recipes/:id" component={Details}/>
        <Route exact path="/create" component={Form}/>
        <Route exact path="/error" component={Error}/>
        <Redirect from="*" to="/error"/>
      </Switch>
    </div>
  );
}

export default App;
