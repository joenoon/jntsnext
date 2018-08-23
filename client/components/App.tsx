import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AccountPage } from './Account';
import { AccountPanel } from './AccountPanel';
import { Decorated } from './common';
import { DashboardPage } from './Dashboard';
import { EditProfilePage } from './EditProfile';
import { FullContainer } from './FullContainer';
import { HomePage } from './Home';
import { ProjectPage } from './Project';
import { Spinner } from './Spinner';

class AppComponentBase extends Decorated.ReactComponent('history', 'store', 'observer') {
  render() {
    const { store } = this.props;
    return (
      <FullContainer key={'fixme'}>
        <Switch>
          <Route exact path="/projects" component={DashboardPage} />
          <Route exact path="/projects/:project_id" component={ProjectPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/edit-profile" component={EditProfilePage} />
          <Route exact path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
        <AccountPanel />
        {store.spinners.size > 0 ? <Spinner /> : null}
      </FullContainer>
    );
  }
}

export const AppComponent = Decorated.GetComponent(AppComponentBase);
