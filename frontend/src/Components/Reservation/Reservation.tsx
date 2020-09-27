import React, { FormEvent, ReactElement } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FieldArray, Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from 'yup';
import ChampFormulaire from './ChampFormulaire';
import { ValueType } from 'react-select';
import {
    CentreServiceScolaire,
    Formulaire,
    Reservation,
    schemaFormulaire,
    schemaReservation,
} from '../../../../common/src/schemas';
import { BiPlus } from 'react-icons/all';
import LigneReservation from './LigneReservation';
import api, { useActivites, useCentresService } from '../../Utils/api';
import ChampAutocompletion from './ChampAutocompletion';

export default function FormReservation(): ReactElement {
    const valeursInitiales: Formulaire = {
        nomEcole: '',
        idCss: null,
        nomContact: '',
        courrielContact: '',
        telContact: '',
        nbParticipants: '',
        groupeAge: '',
        reservations: [new Reservation(), new Reservation(), new Reservation()],
    };

    const {
        isError: centresEnErreur,
        error: erreurCentres,
        isLoading: centresEnChargement,
        data: centresService,
    } = useCentresService();

    const activites = useActivites();

    type SelectOption = {
        value: string;
        label: string;
    };
    const groupesDAges: SelectOption[] = [
        { value: 'all', label: 'Maternelle à 6e année' },
        { value: 'mat_2e', label: 'Maternelle à 2e année' },
        { value: '3e_6e', label: '3e année à 6e année' },
    ];

    async function soumettreFormulaire(
        donneesValides: Formulaire,
        { setErrors, setSubmitting, setStatus }: FormikHelpers<Formulaire>,
    ): Promise<void> {
        const reservations = yup
            .array()
            .of(schemaReservation)
            .compact((res: Reservation | undefined) => {
                return !res?.activite && !res?.date;
            })
            .validateSync(donneesValides.reservations);
        console.log({ ...donneesValides, reservations });
        const response = await api.post('/reservation', { ...donneesValides, reservations });
        if (response.status === 200) {
            //TODO: remplacer par un toast
            alert('Formulaire soumis avec succes');
        } else if (response.status === 400) {
            setErrors(response.data.errors);
        } else {
            setStatus(response.data);
        }
        setSubmitting(false);
    }

    return (
        <div className="py-3">
            <h1>Réservation d&apos;activités</h1>
            <p className="text-muted">
                <em>Tous les champs sont obligatoires sauf les champs de commentaires</em>
            </p>
            <Formik validationSchema={schemaFormulaire} onSubmit={soumettreFormulaire} initialValues={valeursInitiales}>
                {(props: FormikProps<Formulaire>) => {
                    const { handleSubmit, touched, errors, values, validateForm, setFieldValue } = props;
                    return (
                        <Form
                            className="pt-3"
                            noValidate
                            onSubmit={handleSubmit as (e: FormEvent<HTMLElement>) => void}
                        >
                            <Row>
                                <Col lg={4}>
                                    <fieldset>
                                        <legend>Informations sur le client</legend>
                                        <ChampFormulaire id="nomEcole" titre="Nom de l'ecole" {...props} />
                                        <ChampAutocompletion
                                            {...props}
                                            afficherTitre
                                            id="idCss"
                                            titre="Centre de service scolaire"
                                            enErreur={centresEnErreur || (touched.idCss && !!errors.idCss)}
                                            erreur={(erreurCentres as { message: string })?.message ?? errors.idCss}
                                            // props de react-select
                                            options={centresService}
                                            isLoading={centresEnChargement}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id.toString()}
                                            onChange={(valeur: ValueType<CentreServiceScolaire>) => {
                                                setFieldValue('idCss', (valeur as CentreServiceScolaire)?.id);
                                            }}
                                            value={centresService?.find((css) => css.id == values.idCss) ?? null}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Informations sur le contact</legend>
                                        <ChampFormulaire id="nomContact" titre="Nom" {...props} />
                                        <ChampFormulaire
                                            id="courrielContact"
                                            titre="Courriel"
                                            type="email"
                                            {...props}
                                        />
                                        <ChampFormulaire id="telContact" titre="Téléphone" type="tel" {...props} />
                                    </fieldset>
                                </Col>
                                <Col lg={8}>
                                    <fieldset>
                                        <legend>Informations sur les réservations</legend>
                                        <Form.Row>
                                            <Col xs={12} sm={6}>
                                                <ChampFormulaire
                                                    titre="Nombre de participants"
                                                    id="nbParticipants"
                                                    type="number"
                                                    {...props}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <ChampAutocompletion
                                                    {...props}
                                                    isCreatable
                                                    afficherTitre
                                                    id="groupeAge"
                                                    titre="Groupe d'âge"
                                                    enErreur={touched.groupeAge && !!errors.groupeAge}
                                                    erreur={errors.groupeAge}
                                                    // props de react-select
                                                    isClearable
                                                    options={groupesDAges}
                                                    onChange={(valeur: ValueType<SelectOption>) => {
                                                        setFieldValue(
                                                            'groupeAge',
                                                            (valeur as SelectOption)?.label ?? '',
                                                        );
                                                    }}
                                                    value={
                                                        groupesDAges.find((ga) => ga.label == values.groupeAge) ?? null
                                                    }
                                                />
                                            </Col>
                                        </Form.Row>
                                    </fieldset>

                                    <FieldArray
                                        name="reservations"
                                        render={(propsReservation) => (
                                            <fieldset>
                                                <legend
                                                    className={
                                                        touched.reservations && typeof errors.reservations == 'string'
                                                            ? 'is-invalid mb-0 text-danger'
                                                            : ''
                                                    }
                                                >
                                                    Activités a réserver
                                                </legend>
                                                <Form.Control.Feedback type="invalid" className="mb-2 mt-0">
                                                    {errors['reservations']?.toString()}
                                                </Form.Control.Feedback>
                                                {values.reservations.map((reservation: Reservation, index) => (
                                                    <LigneReservation
                                                        {...propsReservation}
                                                        key={index}
                                                        index={index}
                                                        reservation={reservation}
                                                        activites={activites}
                                                        remove={function <T>(index: number): T | undefined {
                                                            const result = propsReservation.remove<T>(index);
                                                            // Hack pour régler un bug de formik en attendant que mon PR soit accepté
                                                            new Promise((r) => setTimeout(r, 0)).then(async () => {
                                                                await validateForm();
                                                            });
                                                            return result;
                                                        }}
                                                    />
                                                ))}
                                                <Form.Group controlId={`ajouterDateReservation`}>
                                                    <Button
                                                        size="sm"
                                                        className="d-flex align-items-center"
                                                        onClick={() => propsReservation.push(new Reservation())}
                                                    >
                                                        <BiPlus size="1.5em" />
                                                        Ajouter une date
                                                    </Button>
                                                </Form.Group>
                                            </fieldset>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Button type="submit" variant="primary">
                                        Envoyer la demande de réservation
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
