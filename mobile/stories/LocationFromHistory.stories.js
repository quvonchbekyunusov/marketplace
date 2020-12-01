import LocationFromHistory from '@/components/LocationFromHistory';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(LocationFromHistory, {
  // locations: [{ name: 'Home', lat: 23, lng: 22, id: 1 }, { name: 'Street', lat: 23, lng: 22, id: 2 }],
  locations: { name: 'Home', lat: 23, lng: 22, id: 1 },
});
export default definition;

export const Basic = story();
