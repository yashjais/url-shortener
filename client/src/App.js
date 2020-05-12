import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Login from './users/login'
import Register from './users/register'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>

        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
      </div>
    </BrowserRouter>
  );
}

export default App;
