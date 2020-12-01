import OrderCompleted from '@/components/ZOrderCompleted';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(OrderCompleted, {
  order: {
    orderId: '212132',
    orderSum: 29,
    orderDeliveryPrice: 3,
    orderOverAll: 55,
  },
});

export default definition;
export const Basic = story();
