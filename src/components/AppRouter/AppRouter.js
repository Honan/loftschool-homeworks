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
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from '../Home';
import InboxList from '../InboxList';
import OutboxList from '../OutboxList';
import InboxMail from '../InboxMail';
import OutboxMail from '../OutboxMail';
import cx from 'classnames';

import styles from './AppRouter.module.css';

class AppRouter extends Component {
  render() {
    const {
      computedMatch: match,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <ul className={`${styles.navList} t-nav-list`}>
              <li className={styles.navElement}>
                <NavLink
                  className={cx(styles.link, 't-link-home')}
                  to={`${match.url}`}
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.navElement}>
                <NavLink
                  className={cx(styles.link, 't-link-inbox')}
                  to={`${match.url}/inbox`}
                >
                  Inbox
                </NavLink>
              </li>
              <li className={styles.navElement}>
                <NavLink
                  className={cx(styles.link, 't-link-outbox')}
                  to={`${match.url}/outbox`}
                >
                  Outbox
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.content}>
            <h3 className={styles.title}>
            <Switch>
                <Route path="/app" exact  render={() => 'Home'} />
                <Route path="/app/outbox" component={this.renderOutboxTitle} />
                <Route path="/app/inbox" component={this.renderInboxTitle} />
              </Switch>
            </h3>
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
  renderOutboxTitle = () => 'Outbox';
  renderInboxTitle = () => 'Inbox';
}

export default AppRouter;
