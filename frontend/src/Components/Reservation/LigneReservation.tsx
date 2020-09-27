import { Button, Col, Form, FormCheck } from 'react-bootstrap';
import TooltipSimple from './TooltipSimple';
import PopoverSimple from './PopoverSimple';
import { BiBusSchool, BiInfoCircle, BiX } from 'react-icons/all';
import React, { ReactElement } from 'react';
import { Activite, Formulaire, Reservation } from '../../../../common/src/schemas';
import { FieldArrayRenderProps, FormikErrors, FormikProps } from 'formik';
import ChampAutocompletion from './ChampAutocompletion';
import { ValueType } from 'react-select';
import { QueryResult } from 'react-query';

type PropsDeLigne = FieldArrayRenderProps & {
    index: number;
    reservation: Reservation;
    activites: QueryResult<Activite[]>;
};

export default function LigneReservation(props: PropsDeLigne): ReactElement {
    const { index, reservation, remove, activites, form } = props;
    const { handleChange, touched: formTouched, errors: formErrors, setFieldValue } = form as FormikProps<Formulaire>;
    const touched = formTouched.reservations?.[index];
    const errors = formErrors.reservations?.[index] as FormikErrors<Reservation>;
    const { data, isLoading, error, isError } = activites;
    return (
        <Form.Row>
            <Col xs={12} sm>
                <Form.Group controlId={`reservations.${index}.date`}>
                    <Form.Label className={index !== 0 ? 'd-sm-none' : ''}>Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Date"
                        value={reservation.date?.toISOString().split('T')[0] || ''}
                        name={`reservations.${index}.date`}
                        onChange={(event) => {
                            setFieldValue(
                                `reservations.${index}.date`,
                                event.target.value ? new Date(event.target.value) : '',
                            );
                        }}
                        isInvalid={touched?.date && !!errors?.date}
                    />
                    <Form.Control.Feedback type="invalid">{errors?.date}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col xs={12} sm>
                <ChampAutocompletion
                    {...props}
                    afficherTitre={index === 0}
                    id={`reservations.${index}.activite`}
                    titre="Activité"
                    enErreur={isError || (touched?.activite && !!errors?.activite)}
                    erreur={(error as { message: string })?.message ?? errors?.activite}
                    // props de react-select
                    options={data}
                    isLoading={isLoading}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    isClearable
                    onChange={(valeur: ValueType<Activite>) => {
                        setFieldValue(`reservations.${index}.activite`, (valeur as Activite)?.id ?? '');
                    }}
                    value={data?.find((activite) => activite.id == reservation.activite) ?? null}
                />
            </Col>
            <Col xs={12} sm="auto" className="d-flex">
                <Form.Group controlId={`reservationAutobus${index}`} className="d-flex flex-column">
                    <TooltipSimple texte="Inclure une réservation d'autobus">
                        <Form.Label className={'text-center ' + (index !== 0 ? 'd-none' : 'd-none d-sm-inline-block')}>
                            <BiBusSchool size="1.4em" />
                        </Form.Label>
                    </TooltipSimple>
                    <div className="flex-fill d-flex justify-content-center px-1 pt-2">
                        <Form.Check className="p-0">
                            <FormCheck.Input
                                className="position-static m-auto"
                                name={`reservations.${index}.autobus`}
                                onChange={handleChange}
                            />
                            <FormCheck.Label className="ml-1 d-inline d-sm-none">
                                Inclure une réservation d&apos;autobus
                            </FormCheck.Label>
                        </Form.Check>
                    </div>
                </Form.Group>
            </Col>
            <Col xs={12} sm>
                <Form.Group controlId={`reservationCommentaire${index}`}>
                    <Form.Label className={'d-flex align-items-center ' + (index !== 0 ? 'd-sm-none' : '')}>
                        Commentaire&nbsp;
                        <PopoverSimple
                            titre="Commentaires sur la réservation"
                            texte={
                                <>
                                    Ajoutez le plus de détails possible.
                                    <br />
                                    Par exemple:
                                    <ul>
                                        <li>Heure de départ et de retour des autobus</li>
                                        <li>Groupes d&apos;âge si différent</li>
                                        <li>Choix de thématique</li>
                                        <li>Etc.</li>
                                    </ul>
                                </>
                            }
                        >
                            <BiInfoCircle className="text-info" size="1.25em" />
                        </PopoverSimple>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={reservation.commentaire}
                        name={`reservations.${index}.commentaire`}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
            <Col xs={12} sm="auto">
                <Form.Group controlId={`reservationRemove${index}`}>
                    <Form.Label className={index !== 0 ? 'd-none' : 'd-none d-sm-inline-block'}>&nbsp;</Form.Label>
                    <TooltipSimple texte="Supprimer cette date">
                        <Button
                            variant="link"
                            className="d-none d-sm-flex align-items-center text-muted px-0"
                            onClick={() => remove(index)}
                        >
                            <BiX size="1.25em" />
                        </Button>
                    </TooltipSimple>
                    <Button
                        variant="danger"
                        className="d-flex d-sm-none align-items-center"
                        size="sm"
                        onClick={() => remove(index)}
                    >
                        <BiX size="1.25em" /> Supprimer cette date
                    </Button>
                </Form.Group>
                {/*<hr className={index === values.reservations.length - 1 ? 'd-none' : 'd-block d-sm-none'} />*/}
            </Col>
        </Form.Row>
    );
}
