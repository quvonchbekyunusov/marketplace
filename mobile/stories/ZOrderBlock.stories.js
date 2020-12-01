import ZOrderBlock from '@/components/ZOrderBlock';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZOrderBlock, {
  id: '11',
  amount: 11,
  date: new Date(),
  totalSum: 2000000,
  status: {
    denied: true,
    deliviring: false,
    bought: false,
  },
});
export default definition;

export const Basic = story();
