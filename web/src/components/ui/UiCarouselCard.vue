<template>
  <!-- start|AzimjonToirov|2020-10-23 -->
  <div>
    <div
      class="card-header
        flex justify-between items-center
        h-auto
        bg-primary-500
        text-white
        border rounded-tl-md rounded-tr-md
        p-3
      "
    >
      <div class="">
        <p class="text-xl font-medium">
          {{ title }}
        </p>
      </div>
      <div class="flex">
        <ui-icon-button
          size="8"
          icon="chevron-left"
          icon-size="2xl"
          icon-color="white"
          :bordered="false"
          @click="prev"
        />
        <ui-icon-button
          size="8"
          icon="chevron-right"
          icon-color="white"
          icon-size="2xl"
          :bordered="false"
          @click="next"
        />
      </div>
    </div>
    <ui-card #section>
      <template>
        <div class="flex p-2 flex-wrap justify-around fixed-height">
          <slot name="ui-carousel-card-section" />
        </div>
      </template>
    </ui-card>
  </div>
  <!-- end|AzimjonToirov|2020-10-23 22html -->
</template>

<script>
/* start|AzimjonToirov|10/23/2020 */
import VueTypes from 'vue-types';
import UiCard from '@/components/ui/UiCard';
import UiIconButton from '@/components/ui/UiIconButton';

export default {
  name: 'UiCarouselCard',
  components: {
    UiCard,
    UiIconButton,
  },
  props: {
    title: VueTypes.string.def('Товары со скидкой (example title)'),
  },
  methods: {
    prev() {
      this.$emit('changePrev');
    },
    next() {
      this.$emit('changeNext');
    },
  },
};
/* end|AzimjonToirov|10/23/2020 12js */
</script>

<style scoped>
  .fixed-height {
    min-height: 18.7rem;
    max-height: 18.7rem;
  }
</style>
