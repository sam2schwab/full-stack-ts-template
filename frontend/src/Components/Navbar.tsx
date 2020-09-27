import React, { ReactElement } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Nav, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../logo_solanim.jpg';
import { BiSearch } from 'react-icons/all';

export default function MyNavbar(): ReactElement {
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="flex-column pb-0">
            <Container fluid>
                <Row className="align-items-center flex-grow-1">
                    <Col className="flex-grow-0">
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <img style={{ mixBlendMode: 'multiply' }} alt="solution-animation" src={logo} />
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Col>
                    <Col>
                        <InputGroup>
                            <FormControl type="text" placeholder="Recherche" />
                            <InputGroup.Append>
                                <Button className="d-flex align-items-center">
                                    <BiSearch size="1.25em" />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="flex-grow-0">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <LinkContainer to="/login">
                                <Nav.Link as={Button} variant="outline-primary" size="sm">
                                    Se&nbsp;connecter
                                </Nav.Link>
                            </LinkContainer>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
            <div className="bg-light w-100 py-1">
                <Container fluid>
                    <Row className="align-items-center flex-grow-1">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="flex-grow-1 justify-content-center">
                                <Col xs="auto">
                                    <LinkContainer to="/" exact>
                                        <Nav.Link>Accueil</Nav.Link>
                                    </LinkContainer>
                                </Col>
                                <Col xs="auto">
                                    <LinkContainer to="/activites">
                                        <Nav.Link>Liste des activités</Nav.Link>
                                    </LinkContainer>
                                </Col>
                                <Col xs="auto">
                                    <LinkContainer to="/transport">
                                        <Nav.Link>Transport</Nav.Link>
                                    </LinkContainer>
                                </Col>
                                <Col xs="auto">
                                    <LinkContainer to="/reservation">
                                        <Nav.Link>Réserver!</Nav.Link>
                                    </LinkContainer>
                                </Col>
                            </Nav>
                        </Navbar.Collapse>
                    </Row>
                </Container>
            </div>
        </Navbar>
    );
}
