import React, { ReactElement, ReactNode } from 'react';
import { FormikProps } from 'formik';
import { Form } from 'react-bootstrap';

export type PropsDeChamp<T> = FormikProps<T> & {
    id: keyof T;
    titre?: string;
    type?: string;
    children?: ReactNode;
};

export default function ChampFormulaire<T>(props: PropsDeChamp<T>): ReactElement {
    const { type, titre, id, children, handleChange, values, touched, errors } = props;
    return (
        <Form.Group controlId={id as string}>
            <Form.Label>{titre}</Form.Label>
            <Form.Control
                type={type}
                name={id as string}
                onChange={handleChange}
                value={(values[id] as unknown) as string | number | string[]}
                isInvalid={touched[id] && !!errors[id]}
            />
            <Form.Control.Feedback type="invalid">{errors[id]}</Form.Control.Feedback>
            {children}
        </Form.Group>
    );
}

ChampFormulaire.defaultProps = {
    type: 'text',
};
