<template>
  <!---start: Jamshid Tursunov ---->
  <div>
    <q-carousel
      v-model="slide"
      animated
      infinite
      :height="height"
      swipeable
      :class="{ rounded }"
    >
      <q-carousel-slide
        v-for="{ id, image, link } in ads"
        :key="id"
        :name="id"
        class="overflow-hidden q-pa-none"
      >
        <router-link :to="link" tag="div" class="cursor-pointer">
          <q-img :src="image" width="100%" height="250px" />
        </router-link>
      </q-carousel-slide>
    </q-carousel>
    <div class="row justify-center q-mt-xs">
      <q-btn-toggle
        v-model="slide"
        flat
        dense
        size="4px"
        toggle-color="primary"
        color="grey-5"
        :options="ads.map(({ id }) => ({ value: id, icon: 'fas fa-circle' }))"
      />
    </div>
  </div>
  <!-----end: Jamshid Tursunov ------->
</template>

<script>
// start: Jamshid Tursunov
import VueTypes from 'vue-types';

export default {
  name: 'ZAdCarousel',
  props: {
    ads: VueTypes.arrayOf(VueTypes.shape({
      id: VueTypes.id.isRequired,
      image: VueTypes.string.isRequired,
      link: VueTypes.any.isRequired,
    })).isRequired,
    height: VueTypes.string.def('auto'),
    rounded: VueTypes.bool.def(false),
  },
  data() {
    return {
      slide: this.ads[0].id,
    };
  },
};
// end: Jamshid Tursunov
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: $generic-border-radius;
}
</style>
