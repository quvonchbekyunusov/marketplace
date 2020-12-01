<template>
  <!-- start: Doniyor Raxmonov -->
  <div class="locationPicker shadow-1 text-center" @click="locationPicker">
    <q-icon class="q-mt-lg" size="xl" name="o_room" />
    <p>
      Pick location
    </p>
    <q-dialog
      v-model="dialog"
      :maximized="true"
      transition-show="fade"
      transition-hide="fade"
    >
      <div v-touch-swipe.down="hide">
        <z-location-picker class="dialog q-pa-sm" @new-location="locationChanged" />
      </div>
    </q-dialog>
  </div>
  <!-- end: Doniyor Raxmonov -->
</template>

<script>
// start : Doniyor Raxmonov
import ZLocationPicker from './ZLocationPicker';

export default {
  name: 'PickLocation',
  components: { ZLocationPicker },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    hide() {
      this.dialog = false;
    },
    locationPicker() {
      this.dialog = true;
      this.$emit('clicked');
    },
    // start  | Doniyor Raxmonov | 2020-10-30
    locationChanged(location) {
      this.$emit('location-changed', location);
    },
    // end  | Doniyor Raxmonov | 2020-10-30
  },

};
// end : Doniyor Raxmonov
</script>

<style scoped>
  /*  start : Doniyor Raxmonov */
  .locationPicker {
    font-size: 16px;
    width: 130px;
    height: 130px;
    border: 3px rgba(0, 0, 0, 0);
    border-radius: 6px;
  }

  .dialog {
    position: absolute;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 50%;
  }

  /* end : Doniyor Raxmonov */
</style>
