import axios from 'axios';
import { Transformers } from '../api/resources';

const API_HOST = 'http://market.zetsoft.uz';

class IdentityApi {
  // eslint-disable-next-line class-methods-use-this
  async me() {
    const token = localStorage.getItem('auth-token');

    const { data: raw } = await axios.get(`${API_HOST}/api/auth/me`, {
      params: {
        token,
      },
    });

    return Transformers.get('user').fromRaw(raw);
  }
}

export default new IdentityApi();
