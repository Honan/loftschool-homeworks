// Реализуйте роутер приложения.
// Здесь должны быть обьявлены роуты,
// которые будут доступны авторизованному пользователю.
// - Home
// - InboxList
// - InboxMail
// - OutboxList
// - OutboxMail

// Так же в этом файле обьявите лейаут,
// используйте стили из AppRouter.module.css

import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from '../Home';
import InboxList from '../InboxList';
import OutboxList from '../OutboxList';
import InboxMail from '../InboxMail';
import OutboxMail from '../OutboxMail';

import styles from './AppRouter.module.css';

class AppRouter extends Component {
  render() {
    const {
      computedMatch: match,
      location: { pathname }
    } = this.props;

    let title = 'Home';
    
    if(/^\/app\/inbox.*/.test(pathname)){
      title = 'Inbox';
    }

    if(/^\/app\/outbox.*/.test(pathname)){
      title = 'Outbox';
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <ul className={`${styles.navList} t-nav-list`}>
              <li className={styles.navElement}>
                <Link
                  className={`${styles.link} t-link-home ${
                    pathname === '/app' ? 'active' : null
                  }`}
                  to={`${match.url}`}
                >
                  Home
                </Link>
              </li>
              <li className={styles.navElement}>
                <Link
                  className={`${styles.link} t-link-inbox ${
                    pathname === '/app/inbox' ? 'active' : null
                  }`}
                  to={`${match.url}/inbox`}
                >
                  Inbox
                </Link>
              </li>
              <li className={styles.navElement}>
                <Link
                  className={`${styles.link} t-link-outbox ${
                    pathname === '/app/outbox' ? 'active' : null
                  }`}
                  to={`${match.url}/outbox`}
                >
                  Outbox
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <Switch>
              <Route path={`${match.path}`} component={Home} exact />
              <Route 
                path={`${match.path}/inbox`} 
                component={InboxList} 
                exact />
              <Route
                path={`${match.path}/outbox`}
                component={OutboxList}
                exact
              />
              <Route path={`${match.path}/inbox/:id`} component={InboxMail} />
              <Route path={`${match.path}/outbox/:id`} component={OutboxMail} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default AppRouter;
