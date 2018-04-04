/*
 * @Author: ljliu
 * @Date: 2018-02-01 14:39:36 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-09 16:48:40
 */
import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
import registerServiceWorker from './registerServiceWorker';
import RouterConfig from './router';

import 'moment/locale/zh-cn';
import './rollbar';

import global from './models/global';

import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import './index.less';
// import { createLogger } from 'redux-logger';
 
/**
 *  1. Initialize 
 */
const app = dva({
  // use default history
  history: createHistory(), 
  // register middleware
  onAction: [
    // createLogger(), // logger publish remove 
  ]
});

/**
 * 2. Register middleware
 */
app.use(createLoading());
// appDva.use(createLogger());

/**
 * 3. Model |move to ruoterconfig
 */ 
app.model(global);

/**
 * 4. Router Setting
 */
app.router((props) => <RouterConfig {...props}/>);

/**
 *  5. App Start
 */ 
app.start('#root');

const store = app._store;
export default store;

// developer mode | local cache
registerServiceWorker();
