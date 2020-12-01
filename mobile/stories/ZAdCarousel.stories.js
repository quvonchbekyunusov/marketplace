import ZAdCarousel from '@/components/ZAdCarousel';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZAdCarousel, {
  ads: [
    { image: 'https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588_1280.jpg', id: '1', link: { name: 'link-five' } },
    { image: 'https://cdn.pixabay.com/photo/2020/09/06/21/27/squirrels-5550173_1280.jpg', id: '2', link: { name: 'link-four' } },
    { image: 'https://cdn.pixabay.com/photo/2012/02/28/00/49/squirrel-17854_1280.jpg', id: '4', link: { name: 'link-three' } },
    { image: 'https://cdn.pixabay.com/photo/2012/02/28/00/48/animal-17819_1280.jpg', id: '5', link: { name: 'link-two' } },
    { image: 'https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512_1280.jpg', id: '6', link: { name: 'link-one' } },
  ],
});

export default definition;

export const Basic = story();

export const WithSmallHeight = story({ height: '80px' });
export const WithRoundedBorder = story({ rounded: true });
