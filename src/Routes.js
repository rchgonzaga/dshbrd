import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import Foo from './pages/Foo'
import Bar from './pages/Bar'

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/">Home</Link> |&nbsp;
                    <Link to="/foo">Foo</Link> |&nbsp;
                    <Link to="/bar">Bar</Link>
                    <hr />
                    <Route exact path="/" component={Home} />
                    <Route path="/foo" component={Foo} />
                    <Route path="/bar" component={Bar} />
                </div>
            </Router>
        );
    }
}

export default Routes;
