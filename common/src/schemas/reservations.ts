import * as yup from 'yup';

export interface Activite {
    created_at: Date;
    descriptif: number;
    description_courte: string;
    fk_id_fournisseur: number;
    fk_id_guide: number;
    id: number;
    minimum_facturable: number;
    name: string;
    notes: string;
    periode_ouverture: string;
    tarifs_estimes: string;
    type: string;
    img: string;
    ville: string;
}

export interface CentreServiceScolaire {
    id: number;
    name: string;
}

export class Reservation {
    constructor(date: Date | null = null, activite: number | null = null, commentaire = '', autobus = false) {
        this.date = date;
        this.activite = activite;
        this.commentaire = commentaire;
        this.autobus = autobus;
    }

    date: Date | null;
    activite: number | null;
    commentaire: string;
    autobus: boolean;
}

export const schemaReservation = yup.object().shape<Reservation>(
    {
        date: yup
            .date()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
            .min(new Date(), 'Cette date est invalide')
            .defined()
            .when('activite', {
                is: (activite) => Boolean(activite),
                then: yup.date().required('Une date est requise pour chaque activités'),
            }),
        activite: yup
            .number()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
            .nullable()
            .when('date', {
                is: (date) => Boolean(date),
                then: yup.number().required('Une activité est requise pour chaque date'),
            }),
        commentaire: yup.string().defined(),
        autobus: yup.bool().defined(),
    },
    [
        ['activite', 'date'],
        ['date', 'activite'],
    ],
);

export interface Formulaire {
    nomEcole: string;
    idCss: number | null;
    nomContact: string;
    courrielContact: string;
    telContact: string;
    nbParticipants: number | '';
    groupeAge: string;
    reservations: Reservation[];
}

export type ValidateurFormulaire = Omit<Formulaire, 'reservations'> & {
    reservations: Array<yup.InferType<typeof schemaReservation>>;
};

export const schemaFormulaire = yup.object<ValidateurFormulaire>({
    nomEcole: yup.string().required('Ce champ est requis'),
    idCss: yup.number().typeError('Ce champ est requis').required('Ce champ est requis'),
    nomContact: yup.string().required('Ce champ est requis'),
    courrielContact: yup
        .string()
        .email('Ce champ doit contenir une adresse courriel valide')
        .required('Ce champ est requis'),
    telContact: yup.string().required('Ce champ est requis'),
    nbParticipants: yup
        .number()
        .positive('Le nombre de participants doit être positif')
        .integer('Ce champ doit contenir un nombre')
        .required('Ce champ est requis'),
    groupeAge: yup.string().required('Ce champ est requis'),
    reservations: yup
        .array()
        .test('minCompact', 'Au moins une activité doit être selectionnée', (reservations: Array<Reservation>) => {
            return reservations.reduce(
                (accumulator: boolean, current: Reservation) =>
                    Boolean(current.date || current.activite || accumulator),
                false,
            );
        })
        .min(1, 'Au moins une activité doit être selectionnée')
        .of(schemaReservation)
        .required('Ce champ est requis'),
});
