// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './MailList.module.css';

const MailList = ({ arrData, match, type }) => (
  <div className={`${styles.container} ${type === 'inbox' ? 't-inbox-list' : 't-outbox-list'}`}>
    {arrData.map(({ id, body }) => (
      <Link key={id} className={styles.link} to={`${match.url}/${id}`}>
        {body.slice(0, 52) + '...'}
      </Link>
    ))}
  </div>
);

export default MailList;
