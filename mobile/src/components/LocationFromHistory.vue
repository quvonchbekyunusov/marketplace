<template>
  <!-- start: Doniyor Raxmonov -->
  <div class="box flex justify-center shadow-1 column items-center" @click="selectLocation">
    <q-icon
      size="md"
      name="room"
      :class="{ iconIsChoosed : choosed}"
    />
    <p class="text-body1 text-weight-light q-mt-sm" :class="{ iconIsChoosed : choosed}">
      {{ location.addressName }}
    </p>
  </div>
  <!-- end: Doniyor Raxmonov -->
</template>

<script>
// start : Doniyor Raxmonov
import VueTypes from 'vue-types';

export default {
  name: 'LocationFromHistory',
  props: {
    location: VueTypes.Object,
    choosed: VueTypes.bool,
  },
  created() {
    console.log('locationFromHistory', this.location);
  },
  // start  | Doniyor Raxmonov | 2020-10-30
  methods: {
    selectLocation() {
      this.$emit('location-changed', this.location);
    },
  },
  // end  | Doniyor Raxmonov | 2020-10-30
};
// end : Doniyor Raxmonov
</script>

<style scoped>
  /*  start : Doniyor Raxmonov */
  .box {
    font-size: 16px;
    width: 130px;
    height: 130px;
    background: #fff;
    border-radius: 6px;
  }

  /* end : Doniyor Raxmonov */
</style>
