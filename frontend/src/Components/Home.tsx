import React from 'react';
import logo from '../logo.svg';
import { Button } from 'react-bootstrap';

function Home(): React.ReactElement {
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Button
                    as="a"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="outline-light"
                >
                    Learn React
                </Button>
            </header>
        </div>
    );
}

export default Home;
