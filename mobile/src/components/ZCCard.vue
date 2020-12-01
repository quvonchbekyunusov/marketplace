<template>
  <!-- start: Doniyor Raxmonov -->
  <div class="cardWrapper flex column justify-center text-weight-light q-mx-md">
    <div class="cartName q-ml-md text-white text-weight-light text-h6">
      {{ card.name }}
    </div>
    <div class="cartNumberWrapper q-my-sm flex wrap justify-around">
      <div class="cartNumber">
        <div class="round" />
        <div class="round" />
        <div class="round" />
        <div class="round" />
      </div>
      <div class="cartNumber">
        <div class="round" />
        <div class="round" />
        <div class="round" />
        <div class="round" />
      </div>
      <div class="cartNumber">
        <div class="round" />
        <div class="round" />
        <div class="round" />
        <div class="round" />
      </div>
      <div class="">
        {{ lastCardNumbers }}
      </div>
    </div>
    <div class="cardInfo flex justify-around">
      <div class="holderName">
        <div class="text-grey-5">
          Card Holder
        </div>
        <div class="">
          {{ card.cardHolder }}
        </div>
      </div>
      <div class="expires">
        <div class="text-grey-5">
          Expires
        </div>
        <div class="">
          {{ cardExpire }}
        </div>
      </div>
      <div class="cardType">
        <q-img :src="card.cardNumber.startsWith('8600')?uzCard:humo" class="cardTypeLogo" />
      </div>
    </div>
  </div>
  <!-- end: Doniyor Raxmonov -->
</template>
<script>
// start : Doniyor Raxmonov
import VueTypes from 'vue-types';
import uzCard from '@/assets/creditCardTypes/12121.png';
import humo from '@/assets/creditCardTypes/humo.png';

export default {
  name: 'ZCCard',
  props: {
    card: VueTypes.object.isRequired,
  },
  data() {
    return {
      lastCardNumbers: '',
      cardExpire: '',
      humo,
      uzCard,
      cardType: '',
    };
  },
  watch: {
    cardType(cardNum) {
      if (cardNum.startsWith('8600')) {
        return 'uzCard';
      }
      return 'humo';
    },
  },
  created() {
    this.cardType = this.card.cardNumber;
    this.lastCardNumbers = this.card.cardNumber.slice(-4);
    this.cardExpire = `${this.card.expires.slice(0, 2)}/${this.card.expires.slice(2)}`;
  },
};
// end : Doniyor Raxmonov
</script>
<style lang="scss" scoped>
  /*  start : Doniyor Raxmonov */
  .cardWrapper {
    width: 95%;
    height: 150px;
    background: #666666;
    border-radius: 12.9851px;
    position: relative;
  }
  .cardType {
    width: 15%;
  }
  .round {
    margin-top: 15%;
    margin-left: 5px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: #ccc;
  }
  .expires, .holderName {
    font-size: 12px;
  }
  .cartNumber {
    display: flex;
    font-size: 22px;
    line-height: 24px;
  }

  /* end : Doniyor Raxmonov */
</style>
