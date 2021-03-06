import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from 'components/PageHeader';
import styles from './PageHeaderLayout.module.less';

export default ({ children, wrapperClassName, ...restProps }) => (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        <PageHeader key="pageheader" {...restProps} linkElement={Link} />
        {children ? <div className={styles.content}>{children}</div> : null}
    </div>
);
