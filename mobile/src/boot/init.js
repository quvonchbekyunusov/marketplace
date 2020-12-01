export default ({ store }) => {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  if (credentials) {
    store.dispatch('auth/login', credentials);
  }
};
