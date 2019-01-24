// Реализуйте компонент формы логина.
// Используйте `/contexts/Auth` для получения метода authorize
// и статуса isAuthorized.

// Когда пользователь авторизован - перенаправьте его на роут /app

import React from 'react';
import { withAuth } from '../../context/Auth';

import denis from './LoginForm.module.css';


let LoginForm = ({isAuthorized}) => 
    isAuthorized ? (
        <p>Зашли</p>
    ) : (
        <p>Закрыто {console.log(denis)}</p>
    );

LoginForm = withAuth(LoginForm);

export default LoginForm;