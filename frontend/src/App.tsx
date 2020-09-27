import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NotFound from './Components/NotFound';
import Activites from './Components/Activites/Index';
import { Container } from 'react-bootstrap';
import Reservation from './Components/Reservation/Reservation';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

const queryCache = new QueryCache();

function App(): React.ReactElement {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Router>
                <Navbar />
                <Container fluid className="main-container">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/activites">
                            <Activites />
                        </Route>
                        <Route path="/reservation">
                            <Reservation />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </ReactQueryCacheProvider>
    );
}

export default App;
