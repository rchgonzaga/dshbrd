import React from 'react'

// Import our Api Service Subscriber
import { ApiSubscribe } from '../state/Api'

const Foo = () => {
    return (
        <ApiSubscribe>
            {api => (
                <div>
                    <h1>🍔 Foo</h1>
                    <pre>
                        api.state.loggedIn = {api.state.loggedIn ? "👍 true" : "👎 false"}
                    </pre>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default Foo;
