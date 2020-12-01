import ZAdBanner from '@/components/ZAdBanner';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZAdBanner, {
  img: 'https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588_1280.jpg',
  to: { name: 'home' },
});

export default definition;

export const Basic = story();

export const WhenWidthAdd = story({
  width: '300px',
});
export const WhenHeightAdd = story({
  height: '100px',
});
export const WhenRatioAdd = story({
  width: '300px',
  ratio: 3 / 2,
});
