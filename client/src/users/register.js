import React from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            mobile: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {}
        formData.name = this.state.name
        formData.email = this.state.email
        formData.password = this.state.password
        if (this.state.mobile.length == 10) {
            formData.mobile = this.state.mobile
        }
        axios.post('/users/register', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // console.log(response.data.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                    })
                } else if (response.data.hasOwnProperty('errmsg')) {
                    // console.log(response.data.errmsg)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Enter another credentials',
                    })
                } else {
                    // console.log(response.data, 'in else')
                    Swal.fire(
                        'Good job!',
                        'Successfully created account',
                        'success'
                    )
                    this.props.history.push('/login')
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
                <h2 className="text-xl-center">Register</h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="input" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input className="form-control" type="input" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input className="form-control" type="input" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register