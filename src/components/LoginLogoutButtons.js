import React from 'react'

// Import our Api Service Subscriber
import { ApiSubscribe } from '../state/Api'
import { Button } from "semantic-ui-react"

const LoginLogoutButton = () => {
    return (
        <ApiSubscribe>
            {api => (
                <Button.Group>
                    <Button onClick={() => api.login()}>Login</Button>
                    <Button.Or />
                    <Button positive onClick={() => api.logout()}>Logout</Button>
                </Button.Group>
            )}
        </ApiSubscribe>
    );
};

export default LoginLogoutButton;
