import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import authService from '../../services/auth';

const AppNoMenu = (WrappedComponent) => {

  @connect(state => ({
    global: state.global,
  }))
  class AppMenuInner extends React.Component<any, any> {

    render() {
      const routerData: any = authService.getRouterDataSync(this.props.global.routerConfig, []);
      if (!routerData || routerData.length <= 0) {
        return <Spin spinning={true}/>;
      } else {
        return <WrappedComponent {...this.props} routerData={routerData}/>;
      }
    }
  }

  return AppMenuInner;
};

export default AppNoMenu;