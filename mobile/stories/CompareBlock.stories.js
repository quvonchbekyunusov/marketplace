import Stepper from '@/components/ZStepper';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(Stepper);

export default definition;

export const Basic = story();
