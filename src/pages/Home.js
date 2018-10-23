import React from "react";

// Import our Api Service Subscriber
import { ApiSubscribe } from '../state/Api'
import { PieChart } from "./dash/components/PieChart";

const Home = () => {
    return (
        // Subscrube to the API Container instance. We can now pass
        // `api` into our component and use it's state and methods
        // without prop-drilling
        <ApiSubscribe>
            {api => (
                <div>
                    <h1>🏠 Home</h1>
                    <PieChart data={api.state.barData} />
                    {/*JSON.stringify(api.state.barData)*/}
                    
                    <button onClick={() => api.changeAiMothaFocka()}>+</button>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default Home;
