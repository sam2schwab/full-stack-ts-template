import React, { ReactElement } from 'react';
import { BiGridAlt, BiListUl } from 'react-icons/all';
import './Menu.scss';
import { Button, ButtonGroup, Nav } from 'react-bootstrap';

export default function Menu({
    setAfficheGrile,
}: {
    setAfficheGrile: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement {
    return (
        <div>
            <Nav fill variant="tabs" activeKey="/home" className="menu nav justify-content-center">
                <ButtonGroup className="mr-4">
                    <Button variant="light">Toutes</Button>
                    <Button variant="light">Entrée</Button>
                    <Button variant="light">Sortie</Button>
                    <Button variant="light">Livraison</Button>
                </ButtonGroup>{' '}
                <ButtonGroup>
                    <Button variant="light" onClick={() => setAfficheGrile(false)}>
                        <BiListUl />
                    </Button>
                    <Button variant="light" onClick={() => setAfficheGrile(true)}>
                        <BiGridAlt />
                    </Button>
                </ButtonGroup>
            </Nav>
        </div>
    );
}
