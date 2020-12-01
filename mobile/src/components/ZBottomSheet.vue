<template>
  <q-dialog
    ref="dialog"
    :value="value"
    position="bottom"
    class="q-py-lg"
    @hide="$emit('input')"
  >
    <q-banner v-scroll="onScroll" v-touch-swipe.down="scrollPosition === 0 ? hide : null" class="scroll-y">
      <div
        v-touch-swipe.down="hide"
        class="flex flex-center q-pa-xs"
      >
        <q-btn
          dense
          flat
          size="lg"
          round
          icon="expand_more"
          @click="hide"
        />
      </div>
      <slot
        name="default"
      />
      <div class="bg-white fixed-bottom">
        <slot name="bottom" />
      </div>
    </q-banner>
  </q-dialog>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZBottomSheet',
  props: {
    value: VueTypes.bool.def(false),
  },
  data() {
    return {
      scrollPosition: 0,
    };
  },
  methods: {
    hide() {
      this.$refs.dialog.hide();
    },
    onScroll(scrollPosition) {
      this.scrollPosition = scrollPosition;
    },
  },
};
</script>

<style scoped>
</style>
