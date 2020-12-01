import CreditCardsSwiper from '@/components/CreditCardsSwiper';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(CreditCardsSwiper, {
  cards: [{
    name: 'Ipak Yuli',
    cardNumber: '11112335423459854',
    cardHolder: 'Jony Tony',
    expires: '2121',
  }, {
    name: 'Agro Bank',
    cardNumber: '8600335423459854',
    cardHolder: 'Jony Tony',
    expires: '2121',
  }, {
    name: 'Ipoteka',
    cardNumber: '8600335423459854',
    cardHolder: 'Jony Tony',
    expires: '2121',
  }, {
    name: 'Aliance Bank',
    cardNumber: '8600335423459854',
    cardHolder: 'Jony Tony',
    expires: '2121',
  }],
});

export default definition;

export const Basic = story();
