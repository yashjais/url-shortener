import React, { useState } from 'react';
import axios from '../config/axios'
import Swal from 'sweetalert2'

function UrlGenerate() {
    const [input, setInput] = useState('')
    const [url, setUrl] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (validator) => {
        console.log(input)
        const data = {
            url: input
        }
        if (localStorage.getItem('authUrlToken')) {
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
                    } else if (response.data.hasOwnProperty('code') && response.data.code == "ENOTFOUND") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Internet Error',
                            text: 'Check internet connection',
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'You have to Login to use this website services',
                text: 'Login Please',
            })
            window.location.href = '/login'
        }
    }
    return (
        <div style={{ textAlign: "center" }}>
            <br />
            <h3 > Enter Your Url Here</h3>
            <br />

            <input type="text" placeholder="URL" value={input} onChange={handleChange} />

            <button type="submit" onClick={handleSubmit}> Submit </button>
            <br />
            <br />
            {
                url && url.length == 0 ? <span></span> : <p> {url} </p>
            }
        </div>
    )
}

export default UrlGenerate