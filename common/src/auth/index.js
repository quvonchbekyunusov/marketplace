class Auth {
  #id = null;

  constructor(id) {
    this.#id = id;
  }

  hasToken() {
    return this.token !== null;
  }

  get token() {
    return localStorage.getItem(this.#tokenKey());
  }

  set token(value) {
    localStorage.setItem(this.#tokenKey(), value);
  }

  deleteToken() {
    localStorage.removeItem(this.#tokenKey());
  }

  #tokenKey = () => `${this.#id}/token`;
}

export default Auth;
