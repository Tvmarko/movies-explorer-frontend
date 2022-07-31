import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import './App.css';

function App() {
    return (
        <div className="page">
            <Header />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
  
                <Route path='/profile'>
                    <Profile />
                </Route>
  
                <Route path="/signin">
                    <Login />
                </Route>

                <Route path="/signup">
                    <Register />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
  }
  
  export default App;