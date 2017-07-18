import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Link } from 'react-router';

import {
  Form,
  Field,
  Checkbox,
  Button,
} from 'components';

import api from 'containers/Auth/api';
import { setToken } from 'containers/Auth/actions';

import authStyles from 'containers/Auth/style.css';
import styles from './style.css';

const sendHandler = ({ dispatch }) => data => (
  dispatch(api.actions.register({}, {
    body: JSON.stringify({
      ...data,
      photo: 'images/user-image.jpg',
    }),
  })).then((user) => {
    dispatch(setToken(user.token));
    dispatch(replace('/profile'));

    return user;
  })
);

class Register extends Component {
  static propTypes = {
    send: PropTypes.func.isRequired,
  };

  defaultProps = {
    buttonDisabled: true,
    checkboxChecked: false,
  }

  state = {
    buttonDisabled: this.defaultProps.buttonDisabled,
  };

  onChangeCheckbox = () => {
    this.setState({
      buttonDisabled: !this.state.buttonDisabled,
    });
  }

  render() {
    const { send } = this.props;

    return (
      <div>
        <h2 className={authStyles.title}>Регистрация</h2>

        <Form className={authStyles.form} model="register" onSubmit={send}>
          <Field
            type="text"
            model=".name"
            placeholder="Имя"
          />

          <Field
            type="email"
            model=".email"
            placeholder="Эл. почта"
          />

          <Field
            type="text"
            model=".phone"
            placeholder="Телефон"
          />

          <Field
            type="text"
            model=".address"
            placeholder="Адрес"
          />

          <Field
            type="password"
            model=".password"
            placeholder="Пароль"
          />

          <Checkbox
            model=" "
            checked={this.defaultProps.checkboxChecked}
            onChange={this.onChangeCheckbox}
          >
            Принимаю условия <Link className={styles.link} to="/">пользовательского соглашения</Link>
          </Checkbox>

          <Button
            type="primary"
            disabled={this.state.buttonDisabled}
            caption="Зарегистрироваться"
            className={authStyles.button}
          />
        </Form>
      </div>
    );
  }
}

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(Register);
