import React from "react";

// Import our Api Service Subscriber
import { ApiSubscribe } from "../state/Api";
import { PieChart } from "./dash/components/PieChart";

const Foo = () => {
    return (
        <ApiSubscribe>
            {api => (
                <div>
                    <h1>🍔 Foo</h1>
                    <pre>
                        api.state.loggedIn = {api.state.loggedIn ? "👍 true" : "👎 false"}
                    </pre>
                    asdsad
                    <PieChart data={api.state.barData} />
                    {/*JSON.stringify(api.state.barData)*/}
                    
                    <button onClick={() => api.changeAiMothaFocka()}>+</button>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default Foo;
