import ZProductReview from '@/components/ZProductReview';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZProductReview, {
  userInfo: {
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    name: 'Nicole',
    data: '3 sept. 2020',
    comment: 'Super !',
  },
});

export default definition;

export const Basic = story();
