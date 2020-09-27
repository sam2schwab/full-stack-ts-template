import { OverlayTrigger, OverlayTriggerProps, Tooltip } from 'react-bootstrap';
import React, { ReactElement, ReactNode } from 'react';

export type PropsDeTooltip = Partial<OverlayTriggerProps> & {
    id?: string;
    texte: ReactNode;
    children: ReactElement;
};

export default function TooltipSimple({ id, texte, children, ...rest }: PropsDeTooltip): ReactElement {
    return (
        <OverlayTrigger
            {...rest}
            overlay={(props) => (
                <Tooltip id={id as string} {...props}>
                    {texte}
                </Tooltip>
            )}
        >
            {children}
        </OverlayTrigger>
    );
}

TooltipSimple.defaultProps = {
    id: 'tooltip-generique',
};
