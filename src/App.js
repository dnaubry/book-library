import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <h1>Book Library</h1>
          <Switch>
            <Route exact path='/' component={BookList} />
            <Route path='/add' component={AddBook} />
            <Route render={function() {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
