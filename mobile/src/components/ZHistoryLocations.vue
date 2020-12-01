<template>
  <q-scroll-area
    horizontal
    :thumb-style="thumbStyle"
    class="bg-white  scrollArea rounded-borders bg-white  "
  >
    <div class="flex q-mt-xs no-wrap">
      <pick-location
        :class="{ picked :pickerChoosed && !locationFromHistoryChoosed}"
        class="q-ml-sm"
        @clicked="pickLocation"
        @location-changed="locationChanged"
      />
      <div
        v-for="location in locations"
        :key="location.addressName"
        class="q-ml-md"
        @click="selectLocation(location)"
      >
        <location-from-history
          :choosed="choosedLocation && location.addressName===choosedLocation.addressName"
          :class="{ choosed : choosedLocation
            && location.addressName===choosedLocation.addressName
            && locationChoosed !== null}"
          :location="location"
          @location-changed="locationChanged"
        />
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
// import mapGetters from 'vuex';
import VueTypes from 'vue-types';
import LocationFromHistory from './LocationFromHistory';
import PickLocation from './ZPickLocation';

export default {
  name: 'HistoryLocations',
  components: {
    PickLocation,
    LocationFromHistory,
  },
  props: {
    locations: VueTypes.array,
    locationChoosed: VueTypes.object,
  },
  data() {
    return {
      choosedLocation: null,
      pickerChoosed: false,
      locationFromHistoryChoosed: false,
      thumbStyle: {
        opacity: 0,
      },
    };
  },
  created() {
    this.choosedLocation = { ...this.locations[0] };
  },
  methods: {
    selectLocation(location) {
      this.choosedLocation = { ...location };
      this.locationFromHistoryChoosed = true;
      this.$emit('location', location.addressName);
    },
    pickLocation() {
      this.choosedLocation = null;
      this.pickerChoosed = true;
      this.locationFromHistoryChoosed = false;
    },
    // start  | Doniyor Raxmonov | 2020-10-30
    locationChanged(location) {
      this.$emit('location-changed', location);
    },
    // end  | Doniyor Raxmonov | 2020-10-30
  },
};
</script>

<style scoped lang="scss">
  .scrollArea {
    height: 140px;
    width: 100%;
  }

  .picked {
    border: 3px solid rgba(59, 153, 100, 0.5);
  }

  .choosed {
    background: $secondary;
    color: #fff;
  }
</style>
