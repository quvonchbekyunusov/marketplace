<template>
  <div>
    <div>
      <UiCard >
        <template slot="section" >
          <div >
            <ui-img :src="blockArr[index].img" :ratio="4/3"/>
              <div class="pl-2 pr-4 pt-2 pb-2">
                <h1 class="font-bold">{{ blockArr[index].price.toLocaleString() }} som</h1>
                <h2 class="pt-2">{{ this.trancateStr() }}</h2>
            </div>
          </div>
        </template>
      </UiCard>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import UiCard from '@/components/ui/UiCard';
import UiImg from '@/components/ui/UiImg';

export default {
  components: {
    UiCard,
    UiImg,
  },
  props: {
    index: VueTypes.number.def(0),
    blockArr: VueTypes.arrayOf(
      VueTypes.shape({
        img: VueTypes.string.isRequired,
        price: VueTypes.number.isRequired,
        title: VueTypes.string.isRequired,
      }),
    ).isRequired,
  },
  data() {
    return {
    };
  },
  methods: {
    trancateStr() {
      const str = this.blockArr[this.index].title;
      if (str <= 30) {
        return str;
      }
      const str2 = `${str.slice(0, 30)}...`;
      return str2;
    },
  },
};
</script>
