import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Alert } from 'antd';
import Login from 'ant-design-pro/lib/Login';
import styles from './Login.less';

const { UserName: UserNameItem, Password: PasswordItem, Submit } = Login;
const UserName: any = UserNameItem;
const Password: any = PasswordItem;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component<any, any> {

  state = {
    autoLogin: true
  };

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: values,
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon={true} />
    );
  }

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          onSubmit={this.handleSubmit}
        >
          {
            login.status === 'error' &&
            !login.submitting &&
            this.renderMessage('用户名或密码错误')
          }
            <UserName name="userName" placeholder="用户名" />
            <Password name="password" placeholder="密码" />
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
