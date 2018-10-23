import React from "react";

// Import our Api Service Subscriber
import Api, { ApiSubscribe } from '../state/Api'

const Bar = () => {
    return (
        <ApiSubscribe to={[Api]}>
            {api => (
                <div>
                    <h1>🍺 Bar - tttttttt</h1>
                    <pre>
                        api.state.loggedIn = {api.state.loggedIn ? "👍 true" : "👎 false"}
                    </pre>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default Bar;
