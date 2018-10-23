import React from "react";

// Import our Api Service Subscriber
import { ApiSubscribe } from '../state/Api'
import { PieChart } from "./dash/components/PieChart";
import Hr from '../components/Hr'

const Home = () => {
    return (
        <ApiSubscribe>
            {api => (
                <div>
                    <h1>🏠 Home</h1>
                    <Hr />
                    <PieChart 
                        data={api.state.barData} 
                        width={500} 
                        height={300} />
                    
                    <button onClick={() => api.changeAiMothaFocka()}>changeIt</button>
                </div>
            )}
        </ApiSubscribe>
    );
};

export default Home;
