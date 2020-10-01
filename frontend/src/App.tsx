import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import NotFound from './Components/NotFound';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';

const queryCache = new QueryCache();

function App(): React.ReactElement {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </ReactQueryCacheProvider>
    );
}

export default App;
