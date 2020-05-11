import React from 'react'
import axios from 'axios'

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
        formData.password = this.state.name
        if (this.state.mobile.length == 10) {
            formData.mobile = this.state.mobile
        }
        axios.post('localhost://3010/users/register')
            .then(res => console.log(res.data))
            .catch(err => alert(err))
    }
    render() {
        return (
            <div>
                <h1> Registerr </h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name" >name</label>
                    <input type="text" id="name" value={this.state.name} onChange={this.handleChange} /> <br />
                    <label htmlFor="name" >email</label>
                    <input type="text" id="email" value={this.state.email} onChange={this.handleChange} /> <br />
                    <label htmlFor="name" >mobile</label>
                    <input type="text" id="mobile" value={this.state.mobile} onChange={this.handleChange} /> <br />
                    <label htmlFor="name" >password</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.handleChange} /> <br />

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Register