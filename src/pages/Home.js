import React from "react";

// Import our Api Service Subscriber
import { ApiSubscribe } from '../state/Api'

const Home = () => {
    return (
        // Subscrube to the API Container instance. We can now pass
        // `api` into our component and use it's state and methods
        // without prop-drilling
        <ApiSubscribe>
            {api => (
                <div>
                    <h1>🏠 Home</h1>
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

export default Home;
