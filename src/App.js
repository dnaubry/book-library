import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import { auth } from './utils/firebase';
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Library from './components/Library';
import AddBook from './components/AddBook';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: false    }
  }

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed:true
        })
      } else {
        this.setState({
          authed: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener();
  }

  signInAnonymously() {
    auth.signInAnonymously();
  }

  signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  signOut() {
    auth.signOut();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Book.Library</h1>
          {this.state.authed
            ? <div>
                <Nav signOut={this.signOut} />
                <Switch>
                  <Route exact path='/' component={Library} />
                  <Route path='/add' component={AddBook} />
                  <Route render={function() {
                    return <p>Not Found</p>
                  }} />
                </Switch>
              </div>
            : <Login
                signInGoogle={this.signInGoogle}
                signInAnonymously={this.signInAnonymously} />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
