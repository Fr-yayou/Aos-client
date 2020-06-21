import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () =>(
    <div>
        <div>
            <Link to='/register'>Sign Up</Link>
        </div>
        <div>
            <Link to='/login'>Sign In</Link>
        </div>
    </div>
)

export default Landing