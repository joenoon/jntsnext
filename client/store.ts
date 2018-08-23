import { action, observable } from 'mobx';
import { Environment } from 'relay-runtime';
import { logout } from './mutations/LogoutMutation';

const __SERVER__ = !process['browser'];

export class Store {
  @observable jwt: string | null = null;
  @observable relayEnvironment: Environment | null = null;
  @observable spinners = observable.map({});
  @observable panel = false;

  addSpinner = action((name: string) => {
    this.spinners.set(name, true);
  });

  removeSpinner = action((name: string) => {
    this.spinners.delete(name);
  });

  logout = async () => {
    this.addSpinner('logout');

    try {
      const { response, errors } = await logout(this.relayEnvironment);
      console.log('response', response, 'errors', errors);
      window.location.href = '/';
    } catch (err) {
      alert(`Something went wrong.  Please check your entries and try again.`);
      console.log('err', err);
    }
  };

  togglePanel = () => {
    this.panel = !this.panel;
  };
}

export function getClientStore(): Store {
  if (__SERVER__) throw new Error('getClientStore called from server');
  return new Store();
}

let store: Store;

export function newServerStore(): Store {
  if (!__SERVER__) throw new Error('getServerStore called from client');
  if (store) return store;
  store = new Store();
  return store;
}
