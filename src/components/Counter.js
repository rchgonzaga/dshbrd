import React from "react";
import Api, {ApiSubscribe} from "../state/Api";
import { Subscribe } from "unstated";



const Counter = () => {
    return (
        <Subscribe to={[Api]}>
            {counter => (
                <div>
                    <button onClick={() => counter.decrement()}>-</button>
                    <span>{counter.state.count}</span>
                    <button onClick={() => counter.increment()}>+</button>
                </div>
            )}
        </Subscribe>
    );
};

export default Counter;