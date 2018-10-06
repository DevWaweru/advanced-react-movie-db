import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Redirect, Switch } from 'react-router-dom';
import FetchMovies from './components/movies';
import Customers from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm}/>
            <Route path='/login' component={LoginForm}/>
            <Route path='/movies/:id' component={MovieForm}/>
            <Route path="/movies" component={FetchMovies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from='/' exact to='/movies'/>
            <Redirect to='/not-found'/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
