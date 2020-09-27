import { OverlayTrigger, OverlayTriggerProps, Popover } from 'react-bootstrap';
import React, { ReactElement, ReactNode } from 'react';

export type PropsDeTooltip = Partial<OverlayTriggerProps> & {
    id?: string;
    texte: ReactNode;
    titre?: ReactNode;
    children: ReactElement;
};

export default function TooltipSimple({ id, texte, titre, children, ...rest }: PropsDeTooltip): ReactElement {
    return (
        <OverlayTrigger
            {...rest}
            overlay={
                <Popover id={id as string}>
                    {titre ? <Popover.Title as="h3">{titre}</Popover.Title> : null}
                    <Popover.Content>{texte}</Popover.Content>
                </Popover>
            }
        >
            {children}
        </OverlayTrigger>
    );
}

TooltipSimple.defaultProps = {
    id: 'popover-generique',
};
