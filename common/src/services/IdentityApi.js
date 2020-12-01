import axios from 'axios';
import { Transformers } from '../api/resources';

const API_HOST = process.env.DEV ? 'http://10.10.3.171' : 'http://market.zetsoft.uz:7070';

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
