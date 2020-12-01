import ZBuyCard from '@/components/ZBuyCard';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZBuyCard, {
  product:
    {
      id: '1',
      name: 'HP Laptop 307',
      images: ['https://images.pexels.com/photos/3201768/pexels-photo-3201768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://cdn.pixabay.com/photo/2020/09/06/21/27/squirrels-5550173_1280.jpg', 'https://cdn.pixabay.com/photo/2020/09/06/21/27/squirrels-5550173_1280.jpg'],
    },
  sellerLogo: 'https://cp.billur.com/templates/HostHub/html/img/partners/clients/mediapark.png',
  offer: {
    price: 800000,
  },
  reviewsCount: 51,
  rating: 5,
  options: [
    {
      option: 'Цвет:',
      value: 'Black',
    },
    {
      option: 'RAM',
      value: 8,
    },
  ],
});
export default definition;

export const Basic = story();
export const discountAndOption = story({
  offer: {
    price: 800000,
    priceNew: 600000,
  },
  options: null,
});
