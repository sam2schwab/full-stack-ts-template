import React, { ReactElement } from 'react';
import { Button, Card, Col, ResponsiveEmbed, Row } from 'react-bootstrap';
import './Liste.scss';
import { Link } from 'react-router-dom';
import { Activite } from '../../../../common/src/schemas';

export default function Liste({ activites }: { activites: Array<Activite> }): ReactElement {
    return (
        <div className="py-4">
            {activites.map((activite) => (
                <>
                    <Card className="mt-2" style={{ width: '100%' }}>
                        <Link
                            className="stretched-link text-decoration-none text-dark"
                            to={`/activites/${activite.id}`}
                        />
                        <Row noGutters={true}>
                            <Col className="col-sm-4">
                                <ResponsiveEmbed aspectRatio="4by3">
                                    <Card.Img
                                        style={{ height: '100%' }}
                                        variant="top"
                                        className="image-liste"
                                        src={activite.img ?? `https://picsum.photos/400/300?t=${activite.id}`}
                                    />
                                </ResponsiveEmbed>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{activite.name} </Card.Title>
                                    <div className="description">
                                        {' '}
                                        <Card.Text>{activite.description_courte}</Card.Text>
                                    </div>
                                    <Row className="text-muted">
                                        <Col>
                                            <Card.Text>Type: {activite.type}</Card.Text>
                                            <Card.Text>
                                                Période d&apos;ouverture: {activite.periode_ouverture}
                                            </Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text>Ville: {activite.ville}</Card.Text>
                                            <Card.Text>
                                                Minimum de participations: {activite.minimum_facturable}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Col>
                        </Row>

                        <Button className="btnreservation" variant="primary">
                            <Link className="stretched-link text-decoration-none text-dark" to="/reservation" />{' '}
                            Réserver!
                        </Button>
                    </Card>
                </>
            ))}
        </div>
    );
}
