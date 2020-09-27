import { Form } from 'react-bootstrap';
import Select, { components, ControlProps, Props } from 'react-select';
import React, { ReactElement, ReactNode } from 'react';
import Creatable from 'react-select/creatable';

export type PropsDAutocompletion<T> = Props<T> & {
    id: string;
    titre?: string;
    enErreur?: boolean;
    erreur?: string;
    children?: ReactNode;
    afficherTitre?: boolean;
    isCreatable?: boolean;
};

const ControlCustom = function <T>(ctrlProps: ControlProps<T>) {
    const {
        selectProps: { enErreur },
    } = ctrlProps;
    return (
        <components.Control {...ctrlProps} className={'form-control ' + (enErreur ? 'py-0 pl-0 is-invalid' : 'p-0')} />
    );
};

export default function ChampAutocompletion<T>(props: PropsDAutocompletion<T>): ReactElement {
    const { id, titre, children, enErreur, erreur, afficherTitre, isCreatable, ...rest } = props;
    const selectProps = {
        placeholder: 'Sélectionner ou écrire...',
        loadingMessage: () => 'Chargement...',
        noOptionsMessage: () => 'Aucun résultat',
        classNamePrefix: 'react-select',
        components: { Control: ControlCustom },
        enErreur: enErreur,
        ...rest,
    };
    return (
        <Form.Group controlId={id}>
            {afficherTitre ? (
                <Form.Label className={enErreur ? 'is-invalid' : ''}>{titre}</Form.Label>
            ) : (
                <div className={enErreur ? 'is-invalid' : ''} />
            )}
            {isCreatable ? <Creatable {...selectProps} /> : <Select {...selectProps} placeholder="Sélectionner..." />}
            <Form.Control.Feedback type="invalid">{erreur}</Form.Control.Feedback>
            {children}
        </Form.Group>
    );
}
