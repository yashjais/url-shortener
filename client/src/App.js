import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './users/login'
import Register from './users/register'
import UrlGenerate from './url/urlGenerate'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from './config/axios'
import Swal from 'sweetalert2'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({})
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleAccount = () => {
    if (localStorage.getItem('authUrlToken')) {
      axios.get('/users/account', {
        headers: {
          'x-auth': localStorage.getItem('authUrlToken')
        }
      })
        .then(
          response => {
            console.log(response.data)
            const info = response.data
            setInfo(info)
            setModal(!modal)
          }
        )
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          })
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Login First',
        text: 'login please',
      })
    }

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
                    <NavLink href="/url">Url Shortener</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={handleAccount} href="#">Account</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={handleLogout} href="#">Logout</NavLink>
                  </NavItem>
                </React.Fragment> : <React.Fragment>
                    <NavItem>
                      <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/url">Url Shortener</NavLink>
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


        <div>
          <Modal isOpen={modal} toggle={handleAccount}>
            <ModalHeader toggle={handleAccount}>Account Information</ModalHeader>
            <ModalBody>
              <p>Name - {info.name}</p>
              <p>Mobile - {info.mobile}</p>
              <p>email - {info.email}</p>
            </ModalBody>
            <ModalFooter>

              <Button color="secondary" onClick={handleAccount}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/url" component={UrlGenerate} exact={true} />
      </div>
    </BrowserRouter >
  );
}

export default App;
