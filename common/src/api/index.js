import Api from './core/Api';
import { Resources } from './resources';
import RealGateway from './MPlaceGateway';

const api = new Api();
const gateway = new RealGateway();

api.gateway = gateway;

[...Resources.values()].forEach((resource) => {
  api.registerResource(resource);
});

export default api;
