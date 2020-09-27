import React from 'react';
import { RecoilRoot } from 'recoil';

export default function Root({ children }: { children: React.ReactElement }): React.ReactElement {
    return <RecoilRoot>{children}</RecoilRoot>;
}
