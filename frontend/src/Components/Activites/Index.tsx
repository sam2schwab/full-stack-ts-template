import React, { ReactElement, useState } from 'react';
import Menu from './Menu';
import { useActivites } from '../../Utils/api';
import Grille from './Grille';
import Liste from './Liste';
import { Activite } from '../../../../common/src/schemas';

export default function Index(): ReactElement {
    const { isLoading, isError, data, error } = useActivites();

    const [afficherGrille, setAfficheGrile] = useState(true);
    return (
        <>
            <Menu setAfficheGrile={setAfficheGrile} />
            {isLoading ? (
                'Chargement'
            ) : isError ? (
                `Erreur de chargement des donnees: ${error}`
            ) : afficherGrille ? (
                <Grille activites={data as Activite[]} />
            ) : (
                <Liste activites={data as Activite[]} />
            )}
        </>
    );
}
