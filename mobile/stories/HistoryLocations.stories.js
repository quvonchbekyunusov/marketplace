import HistoryLocations from 'components/ZHistoryLocations';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(HistoryLocations, {
  locations: [{
    name: 'Home',
    id: 2,
    cordinates: {
      lat: 22.3232323243,
      lng: 21.323232323232,
    },
  }, {
    name: 'street',
    id: 4,
    cordinates: {
      lat: 22.3232323243,
      lng: 21.323232323232,
    },
  }, {
    name: 'street 22',
    id: 3,
    cordinates: {
      lat: 22.3232323243,
      lng: 21.323232323232,
    },
  }, {
    name: 'Home 2',
    id: 22,
    cordinates: {
      lat: 22.3232323243,
      lng: 21.323232323232,
    },
  }],
});
export default definition;

export const Basic = story();
