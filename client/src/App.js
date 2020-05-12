import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './users/login'
import Register from './users/register'
import Account from './users/account'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import axios from './config/axios'
import Swal from 'sweetalert2'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('')
  const [url, setUrl] = useState('')

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (validator) => {
    console.log(input)
    const data = {
      url: input
    }
    axios.post('/url-shortner', data, {
      headers: {
        'x-auth': localStorage.getItem('authUrlToken')
      }
    })
      .then(response => {
        console.log(response.data)
        if (response.data.hasOwnProperty('errors')) {
          Swal.fire({
            icon: 'error',
            title: 'Please enter valid URL',
            text: 'Invalid URL',
          })
        } else if (response.data == 'invalid URL') {
          Swal.fire({
            icon: 'error',
            title: 'Please enter valid URL',
            text: 'Invalid URL',
          })
        } else {
          console.log(response.data.shortenedUrl)
          setUrl(response.data.shortenedUrl)
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err,
        })
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('authUrlToken')
    window.location.href = ('/')
  }
  return (
    <BrowserRouter>
      <div className="container">

        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">URL-Shortener</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>

                {localStorage.getItem('authUrlToken') ? <React.Fragment>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={handleLogout} href="#">Logout</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/account">Account</NavLink>
                  </NavItem>
                </React.Fragment> : <React.Fragment>
                    <NavItem>
                      <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/register">Register</NavLink>
                    </NavItem>
                  </React.Fragment>}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <br />
        <br />

        <div style={{ textAlign: "center" }}>
          <h3 > Enter Your Url Here</h3>
          <br />

          <input type="text" placeholder="URL" value={input} onChange={handleChange} />

          <button type="submit" onClick={handleSubmit}> Submit </button>
          <br />
          <br />
          {
            url.length != 0 && <p> {url} </p>
          }
        </div>


        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/account" component={Account} exact={true} />
      </div>
    </BrowserRouter >
  );
}

export default App;
