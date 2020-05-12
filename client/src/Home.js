import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div >
            <br />
            <h3 style={{ textAlign: "center" }}>Welcome to the URL-Shortner </h3>
            <br />

            <span style={{ paddingLeft: "20px" }}>Features of this website:</span>
            <br />
            <br />
            <ul>
                <li>You can shorten the <Link to="/url">URL</Link> of a website.</li>
                <li>But you have to login to access the url-shorten feature.</li>
                <li>You cannot hit the url-shorten feature more than 100 times.</li>
                <li>You can access the account information.</li>
                <li>This site is responsive, you can you it on mobile too.</li>
            </ul>

        </div>
    )
}

export default Home