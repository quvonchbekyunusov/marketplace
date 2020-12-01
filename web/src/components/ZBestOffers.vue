<template>
  <div>
    <div class="flex bg-primary-500 px-5 py-2 rounded-t-lg justify-between">
      <h3 class="text-white">
        {{ offerTitle }}
      </h3>
      <div class="px-1">
        <button class="text-white mx-1" @click="prevItems">
          prev
        </button>
        <button class="text-white mx-1" @click="nextItems">
          next
        </button>
      </div>
    </div>
    <z-best-offers-card v-for="item in filteredItems" :key="item.id" />
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZBestOffersCard from '@/components/ZBestOffersCard';

export default {
  name: 'ZBestOffers',
  components: {
    ZBestOffersCard,
  },
  props: {
    items: VueTypes.arrayOf(VueTypes.object).isRequired,
    offerTitle: VueTypes.string.isRequired,
  },
  data() {
    return {
      startPoint: 0,
      endPoint: 3,
    };
  },
  computed: {
    filteredItems() {
      return this.items.slice(this.startPoint, this.endPoint);
    },
  },
  async created() {
    console.log(this.items);
  },
  methods: {
    nextItems() {
      if (this.startPoint < this.items.length && this.endPoint <= this.items.length) {
        this.startPoint += 3;
        this.endPoint += 3;
        console.log(this.startPoint);
        console.log(this.endPoint);
      } else {
        console.log('end of list');
      }
    },
    prevItems() {
      if (this.startPoint > 0) {
        this.startPoint -= 3;
        this.endPoint -= 3;
        console.log(this.startPoint);
        console.log(this.endPoint);
      } else {
        console.log('start of list');
      }
    },
  },
};
</script>

<style scoped>

</style>
