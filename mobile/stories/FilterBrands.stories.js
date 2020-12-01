import ZFilterBrand from '@/components/ZFilterBrand';
import artel from '@/assets/brands/artel.svg';
import asus from '@/assets/brands/asus.svg';
import hp from '@/assets/brands/hp.svg';
import lenovo from '@/assets/brands/lenovo.png';
import samsung from '@/assets/brands/samsung.png';
import apple from '@/assets/brands/apple.svg';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZFilterBrand, {
  brands: [
    { value: 'artel', image: artel },
    { value: 'asus', image: asus },
    { value: 'hp', image: hp },
    { value: 'lenovo', image: lenovo },
    { value: 'samsung', image: samsung },
    { value: 'apple', image: apple }],
});

export default definition;

export const Basic = story();
