import React from 'react'

// Import our Api Service Subscriber
import { ApiSubscribe } from '../state/Api'

const LoginLogoutButton = () => {
    return (
        <ApiSubscribe>
            {api => (
                <div>
                    <button onClick={() => api.login()}>Login</button>
                    <button onClick={() => api.logout()}>Logout</button>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default LoginLogoutButton;
