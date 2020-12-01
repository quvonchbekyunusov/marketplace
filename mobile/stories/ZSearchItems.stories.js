import ZSearch from '@/components/ZSearch';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZSearch, {
  isLoading: false,
});

definition.parameters = {
  layout: 'top',
};

export default definition;

export const Basic = story();
