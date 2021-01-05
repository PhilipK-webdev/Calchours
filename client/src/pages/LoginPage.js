import React from 'react'
import Login from '../components/auth/Login'

const LoginPage = (props) => {
    return (
        <div>
            <Login userData={props.userData} setUserData={props.setUserData} />
        </div>
    )
}

export default LoginPage
