import React from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {}
        formData.email = this.state.email
        formData.password = this.state.password
        axios.post('/users/login', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // console.log(response.data.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                    })
                } else {
                    // console.log(response.data, 'in else')
                    Swal.fire(
                        'Good job!',
                        'Successfully Logged In',
                        'success'
                    )
                    // console.log(response.data)
                    const token = response.data.token
                    localStorage.setItem('authUrlToken', token)
                    window.location.href = ('/url')
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
    render() {
        return (
            <div>
                <br />
                <h2 className="text-xl-center">Login </h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input className="form-control" type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <Link to="/register">Register</Link> <br /><br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login