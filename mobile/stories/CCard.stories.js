import ZCCard from '@/components/ZCCard';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZCCard, {
  card: {
    name: 'UZCard',
    cardNumber: '8600335423459854',
    cardHolder: 'Jony Tony',
    expires: '2121',
  },
});

export default definition;

export const Basic = story();
