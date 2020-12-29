import React, { FunctionComponent } from 'react';

type PageContainerProps = {
    children: any;
};

const PageContainer: FunctionComponent<PageContainerProps> = props => {
    return <div style={{ padding: '100px 0' }}>{props.children}</div>;
};

export default PageContainer;
