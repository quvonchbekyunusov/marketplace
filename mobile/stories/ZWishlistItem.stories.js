import ZWishlistCard from '@/components/ZWishlistCard';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZWishlistCard, {
  product: {
    id: '212',
    name: 'Sony Camera',
    images: ['https://avatars.mds.yandex.net/get-mpic/1642819/img_id9044768319161726839.jpeg/9hq', 'https://avatars.mds.yandex.net/get-mpic/1642819/img_id9044768319161726839.jpeg/9hq'],
    description: 'Sony Camera Exmor RS CMOS sensor with 14,2Mp effective.',
    rating: 4.7,
  },
  price: 360000,
  offersCount: 134,
  reviewsCount: 24,
});

export default definition;

export const Basic = story();

export const WithLongDescription = story({ product: { description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' } });

export const WithManyReviews = story({
  reviewsCount: 321213,
});

export const WithManyOffersCount = story({
  offersCount: 21221321,
});
