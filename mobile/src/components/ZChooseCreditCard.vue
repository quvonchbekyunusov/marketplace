<template>
  <div class="wrapper q-my-lg q-gutter-y-lg q-gutter-x-md">
    <div
      v-for="(card , index) in creditCards"
      :id="card.id"
      :key="index"
      class="card q-pa-sm"
      :class="{ choosed : card.value === choosedCard.value}"
      @click="chooseCardFunc(card)"
    >
      <q-img :src="card.image" class="img" contain />
    </div>
  </div>
</template>

<script>

import VueTypes from 'vue-types';

export default {
  name: 'ZChooseCreditCard',
  props: {
    cards: VueTypes.arrayOf(VueTypes.shape({
      value: VueTypes.any.isRequired,
      image: VueTypes.string.isRequired,
    }).isRequired).isRequired,
  },
  data() {
    return {
      choosedCard: null,
      creditCards: null,
    };
  },
  watch: {
    choosedCard() {
      return this.choosedCard;
    },
  },
  mounted() {
    this.creditCards = [...this.cards];
    this.choosedCard = { ...this.creditCards[0] };
  },
  methods: {
    chooseCardFunc(card) {
      this.choosedCard = card;
      this.$emit('cardType', card.value);
      console.log(card.value);
    },
  },
};
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .card {
    width: 8rem;
    height: 3rem;
    border: 2px solid transparent;
    border-radius: 5px;
  }

  .choosed {
    border-color: #27AE60;
  }
</style>
