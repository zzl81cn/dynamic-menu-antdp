import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from './PageHeaderLayout';
import { Route, Switch } from 'dva/router';
import { getRoutes } from '../utils/utils';

@connect()
export default class BasicLayout extends React.PureComponent<any, any> {
  render() {

    const { match, routerData } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout 
        title="路由嵌套"
        wrapperClassName="1aaa"
      >
        <Switch>
          {
            routes.map(item => {
              console.log(JSON.stringify(item));
              return (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              );
            }
            )
          }
        </Switch>
      </PageHeaderLayout>
    );
  }
}
