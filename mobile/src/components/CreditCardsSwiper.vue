<template>
  <!-- start: Doniyor Raxmonov -->
  <hooper :settings="hooperSettings" pagination="no" class="slider" @slide="log">
    <slide v-for="(card, indx) in cards" :key="indx" :index="indx" class="card">
      <div class="q-mx-sm">
        <z-c-card
          :card="card"
          :class="{cardIsChoosed:sendColor}"
        />
      </div>
    </slide>
  </hooper>
  <!-- end: Doniyor Raxmonov -->
</template>

<script>
// start : Doniyor Raxmonov
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import VueTypes from 'vue-types';
import ZCCard from './ZCCard';

export default {
  name: 'CreditCardsSwiper',
  components: {
    ZCCard,
    Hooper,
    Slide,
  },
  props: {
    cards: VueTypes.array,
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1.3,
        centerMode: true,
      },
      choosedCreditCard: null,
      sendColor: false,
    };
  },
  computed: {},
  created() {
    this.choosedCreditCard = { ...this.cards[0] };
    this.creditCardEmitter(this.choosedCreditCard);
  },
  methods: {
    log(payload) {
      this.choosedCreditCard = { ...this.cards[payload.currentSlide] };
      this.creditcardEmitter(this.choosedCreditCard.cardNumber);
    },
    creditCardEmitter(cardNumber) {
      this.$emit('creditCard', cardNumber);
    },
  },
};
// end : Doniyor Raxmonov
</script>

<style lang="scss" scoped>
  /*  start : Doniyor Raxmonov */
  .slider {
    background: #fff;
    outline: none;
  }

  .hooper-slide.is-current {
    transform: scale(1.2);
  }

  .card {
    margin-top: 9%;
  }

  /* end :Doniyor Raxmonov */
</style>
