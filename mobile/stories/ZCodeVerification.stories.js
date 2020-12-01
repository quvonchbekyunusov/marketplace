import ZCodeVerification from '@/components/ZCodeVerification';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZCodeVerification, {
  phoneNumber: '+998903177431',
});

export default definition;

export const Basic = story();
