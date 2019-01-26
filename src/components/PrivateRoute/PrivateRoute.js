import React, { Component } from 'react';
import { withAuth } from '../../context/Auth';
import { Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  // Реализуйте приватный роут.
  // Он должен проверять статус авторизации
  // и перенаправлять пользователя на страницу логина,
  // если тот не авторизован.

  render() {
    const { isAuthorized, component: Component, ...rest } = this.props;
    return isAuthorized ? <Component {...rest} /> : <Redirect to="/login" />;
  }
}

export default withAuth(PrivateRoute);
