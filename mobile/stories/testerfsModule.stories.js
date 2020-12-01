import test from '@/components/test';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(test);

export default definition;

export const Basic = story();
