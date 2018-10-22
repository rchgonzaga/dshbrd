import React from "react";

// Import our Api Service Subscriber
import Api, { ApiSubscribe } from '../state/Api'

const Bar = () => {
    return (
        <ApiSubscribe to={[Api]}>
            {api => (
                <div>
                    <h1>🍺 Bar</h1>
                    <pre>
                        api.state.loggedIn = {api.state.loggedIn ? "👍 true" : "👎 false"}
                    </pre>
                    <button onClick={() => api.login()}>Login</button>
                    <button onClick={() => api.logout()}>Logout</button>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default Bar;
