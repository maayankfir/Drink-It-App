import React, { Component } from 'react';
import SidebarMenu from './components/SidebarMenu'
import HomePage from './components/HomePage'
import NewCocktailForm from './components/NewCocktailForm'
import CocktailContainer from './containers/CocktailContainer'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <SidebarMenu />
          <Route path="/home" component={HomePage}  />
          <Route path="/cocktails" component={CocktailContainer} />

        </div>
      </Router>
    );
  }
}

export default App;
