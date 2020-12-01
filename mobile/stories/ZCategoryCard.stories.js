import ZCategoryCard from 'components/ZCategorySuggestion';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZCategoryCard, {
  product: {
    categoryPhoto: ['images/camera.jpg'],
  },
  categoryName: 'Telefon eqweqweq ffdfdd fgfd',
});
export default definition;

export const Basic = story();
