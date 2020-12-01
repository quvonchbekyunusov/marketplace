<template>
  <!-- start|AzimjonToirov|2020-10-22 -->
  <div class="star-rating">
    <z-star-rating
      :rating="value"
      :read-only="!editable"
      :increment="increment"
      :star-size="size"
      :show-rating="false"
      :glow="glow"
      :animate="animated"
      :active-color="color"
      inactive-color="#ccc"
      :active-on-click="true"
      :border-color="borderColor"
      :rounded-corners="rounded"
      :border-width="1"
      @current-rating="showCurrentRating"
      @rating-selected="setCurrentSelectedRating"
    />
  </div>
  <!-- end|AzimjonToirov|2020-10-22 10html -->
</template>

<script>
/* start|AzimjonToirov|10/22/2020 */
import VueTypes from 'vue-types';

export default {
  name: 'UiStarRating',
  props: {
    editable: VueTypes.bool.def(false),
    value: VueTypes.number.def(1),
    size: VueTypes.integer.def(50),
    increment: VueTypes.number.def(1),
    animated: VueTypes.bool.def(false),
    glow: VueTypes.integer.def(4),
    borderColor: VueTypes.string.def('#ccc'),
    rounded: VueTypes.bool.def(false),
    color: VueTypes.string.def('yellow'),
  },
  methods: {
    showCurrentRating(rating) {
      this.$emit('onShowCurrent', rating);
    },
    setCurrentSelectedRating(rating) {
      this.$emit('onSelected', rating);
    },
  },
};

/* end|AzimjonToirov|10/22/2020  17lines */
</script>

<style scoped>

</style>
