import ZOptionButtons from '@/components/ZOptionButtons';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZOptionButtons, {
  order: {},
});

export default definition;
export const Basic = story();
