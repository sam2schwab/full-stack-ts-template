import React, { ReactElement } from 'react';
import { Button, Card, Col, ResponsiveEmbed, Row } from 'react-bootstrap';
import './Grille.scss';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Activite } from '../../../../common/src/schemas';
import TooltipSimple from '../Reservation/TooltipSimple';
import { BiPackage, BiBusSchool, BiHome, BiPlus } from 'react-icons/all';

export default function Grille({ activites }: { activites: Array<Activite> }): ReactElement {
    console.log(activites);
    return (
        <Row xl={5} lg={4} md={3} sm={2} xs={1} className="py-2">
            {activites.map((activite) => (
                <>
                    <Col className="py-3">
                        <Card>
                            <div className="d-flex justify-content-end">
                                <LinkContainer to="/reservation">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className=" d-flex align-items-center position-absolute m-2 button-over-image"
                                    >
                                        <BiPlus size="1.75em" />
                                        <div>
                                            <span className="pr-2">Réserver!</span>
                                        </div>
                                    </Button>
                                </LinkContainer>
                            </div>
                            <ResponsiveEmbed aspectRatio="4by3">
                                <div>
                                    <div className="m-2 text-light position-absolute indicateur-type-grille">
                                        {activite.type === 'sortie' ? (
                                            <TooltipSimple texte="Sortie">
                                                <BiBusSchool className="m-1" size="1.75em" />
                                            </TooltipSimple>
                                        ) : activite.type === 'entree' ? (
                                            <TooltipSimple texte="Entrée">
                                                <BiHome className="m-1" size="1.75em" />
                                            </TooltipSimple>
                                        ) : (
                                            <TooltipSimple texte="Livraison">
                                                <BiPackage className="m-1" size="1.75em" />
                                            </TooltipSimple>
                                        )}
                                    </div>
                                    <Card.Img
                                        variant="top"
                                        src={activite.img ?? `https://picsum.photos/400/300?t=${activite.id}`}
                                    />
                                </div>
                            </ResponsiveEmbed>
                            <Card.Body>
                                <Link
                                    className="stretched-link text-decoration-none text-dark"
                                    to={`/activites/${activite.id}`}
                                >
                                    {activite.name}
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </>
            ))}
        </Row>
    );
}
