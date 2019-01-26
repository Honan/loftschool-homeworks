// Реализуйте компонент формы логина.
// Используйте `/contexts/Auth` для получения метода authorize
// и статуса isAuthorized.

// Когда пользователь авторизован - перенаправьте его на роут /app

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '../../context/Auth';

import styles from './LoginForm.module.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  fields = [
    {
      id: 'email',
      label: 'Почта',
      type: 'text'
    },
    {
      id: 'password',
      label: 'Пароль',
      type: 'password'
    }
  ];

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  authorize = () => {
    const { email, password } = this.state;
    const { authorize } = this.props;
    authorize(email, password);
  };

  render() {
    const { isAuthorized, authError } = this.props;
    return isAuthorized ? (
      <Redirect to="/app" />
    ) : (
      <div className={styles.bg}>
        <div className={`${styles.form} t-form`}>
          {this.fields.map(({ id, label, type }) => (
            <p key={id} className="field">
              <label htmlFor={id}>
                <span className={styles.labelText}>{label}</span>
              </label>
              <input
                id={id}
                className={`${styles.input} t-input-${id}`}
                type={type}
                name={id}
                onChange={this.handleChange}
              />
            </p>
          ))}
          {authError ? (
            <p className={styles.error}>Почта или пароль не верные</p>
          ) : null}
          <div className={styles.buttons}>
            <button
              className={`${styles.button} t-login`}
              onClick={this.authorize}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(LoginForm);
