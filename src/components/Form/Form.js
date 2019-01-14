import React, { Component } from 'react';

import './Form.css';
import img from './assets/bond_approve.jpg';

class Form extends Component {
  state = {
    isSubmit: false,
    errors: {
      firstName: '',
      lastName: '',
      password: ''
    },
    values: {
      firstName: '',
      lastName: '',
      password: ''
    }
  };

  handleErrorEmpty = e => {
    this.setState({
      errors: {
        firstName: '',
        lastName: '',
        password: ''
      }
    });
  };

  changeNestedState = (obj, prop, value) => {
    const object = { ...this.state[obj] };
    object[prop] = value;
    this.setState({
      [obj]: object
    });
    this.handleErrorEmpty();
  };

  handleFName = e =>
    this.changeNestedState('values', 'firstName', e.target.value);
  handleLName = e =>
    this.changeNestedState('values', 'lastName', e.target.value);
  handlePassword = e =>
    this.changeNestedState('values', 'password', e.target.value);

  formErrorEmpty = (
    errors = {}
  ) => {
    const { firstName, lastName, password } = this.state.values;

    if (firstName === '') {
      errors.firstName = 'Нужно указать имя';
    }

    if (lastName === '') {
      errors.lastName = 'Нужно указать фамилию';
    }

    if (password === '') {
      errors.password = 'Нужно указать пароль';
    }

    return errors;
  };

  formError = (
    errors = {}
  ) => {
    const { firstName, lastName, password } = this.state.values;

    if (firstName !== 'James') {
      errors.firstName = 'Имя указано не верно';
    }

    if (lastName !== 'Bond') {
      errors.lastName = 'Фамилия указана не верно';
    }

    if (password !== '007') {
      errors.password = 'Пароль указан не верно';
    }

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = Object.assign(this.formError(), this.formErrorEmpty());
    let isSubmit = true;

    for (const key in errors) {
      if (errors[key] !== '') isSubmit = false;
    }

    if (isSubmit) {
      this.setState({ isSubmit });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { firstName, lastName, password, errors, isSubmit } = this.state;

    if (isSubmit) {
      return (
        <div className="app-container">
          <img
            src={img}
            alt="bond approve"
            className="t-bond-image"
          />
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <form className="form" onSubmit={this.handleSubmit}>
            <h1>Введите свои данные, агент</h1>
            <p className="field">
              <label className="field__label" htmlFor="firstname">
                <span className="field-label">Имя</span>
              </label>
              <input
                className="field__input field-input t-input-firstname"
                type="text"
                name="firstname"
                value={firstName}
                onChange={this.handleFName}
              />
              <span className="field__error field-error t-error-firstname">
                {errors.firstName}
              </span>
            </p>
            <p className="field">
              <label className="field__label" htmlFor="lastname">
                <span className="field-label">Фамилия</span>
              </label>
              <input
                className="field__input field-input t-input-lastname"
                type="text"
                name="lastname"
                value={lastName}
                onChange={this.handleLName}
              />
              <span className="field__error field-error t-error-lastname">
                {errors.lastName}
              </span>
            </p>
            <p className="field">
              <label className="field__label" htmlFor="password">
                <span className="field-label">Пароль</span>
              </label>
              <input
                className="field__input field-input t-input-password"
                type="password"
                name="password"
                value={password}
                onChange={this.handlePassword}
              />
              <span className="field__error field-error t-error-password">
                {errors.password}
              </span>
            </p>
            <div className="form__buttons">
              <input
                type="submit"
                className="button t-submit"
                value="Проверить"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Form;
