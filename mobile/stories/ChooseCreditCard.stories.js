import ChooseCreditCard from '@/components/ZChooseCreditCard';
import UzCard from '@/assets/CreditCards/uzcard.svg';
import PayMe from '@/assets/CreditCards/payme.svg';
import Visa from '@/assets/CreditCards/visa.svg';
import Qiwi from '@/assets/CreditCards/qiwi.svg';
import Humo from '@/assets/CreditCards/humo.svg';
import Click from '@/assets/CreditCards/click.svg';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ChooseCreditCard, {
  cards: [{ value: 'uzcard', image: UzCard }, { value: 'payme', image: PayMe }, { value: 'visa', image: Visa },
    { value: 'qiwi', image: Qiwi }, { value: 'humo', image: Humo }, { value: 'click', image: Click }],
});
export default definition;
export const Basic = story();
