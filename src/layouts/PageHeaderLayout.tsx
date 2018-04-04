import React from 'react';
import { Link } from 'dva/router';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import styles from './PageHeaderLayout.less';

export default (props) => {
  const { children, wrapperClassName, top, ...restProps } = props;
  return (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
      <PageHeader key="pageheader" {...restProps} linkElement={Link} />
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
};
