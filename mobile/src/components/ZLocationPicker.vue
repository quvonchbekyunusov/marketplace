<template>
  <div>
    <gmap-autocomplete class="place-input" required @place_changed="onPlaceChange" />

    <q-responsive class="map" :ratio="3 / 2">
      <gmap-map
        ref="map"
        class="fit"
        :center="initialLocation"
        :zoom="15"
        map-type-id="roadmap"
        :options="options"
        @center_changed="onCenterChange"
      >
        <gmap-marker :position="location.coordinates" />
      </gmap-map>
    </q-responsive>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { debounce } from 'quasar';
import { gmapApi } from 'gmap-vue';

export default {
  name: 'ZLocationPicker',
  props: {
    initialLocation: VueTypes.shape({
      lat: VueTypes.number.isRequired,
      lng: VueTypes.number.isRequired,
    }).loose.def({ lat: 41.33536, lng: 69.33281 }),
  },
  constants: {
    options: {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: true,
    },
  },
  data() {
    return {
      location: { coordinates: this.initialLocation, place: null },
    };
  },
  computed: {
    google: gmapApi,
  },
  watch: {
    location: {
      handler(newLocation) {
        this.$emit('new-location', newLocation);
      },
      deep: true,
    },
  },
  methods: {
    async onCenterChange({ lat, lng }) {
      const coordinates = { lat: lat(), lng: lng() };
      const place = await this.fetchPlace(coordinates) || this.location.place;

      this.setLocation({ coordinates, place });
    },

    onPlaceChange({ geometry, place_id: place }) {
      const coordinates = { lat: geometry.location.lat(), lng: geometry.location.lng() };
      this.setLocation({ coordinates, place });
      this.$refs.map.panTo(coordinates);
    },

    setLocation(location) {
      this.location = location;
    },

    fetchPlace: debounce(async function (location) {
      return new Promise(((resolve, reject) => {
        const geocoder = new this.google.maps.Geocoder();

        geocoder.geocode({ location }, (results, status) => {
          if (status !== 'OK') {
            reject(status);
          } else {
            resolve(results[0].place_id);
          }
        });
      }));
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
  .map {
    width: 100%;
    min-width: 300px;
  }

  .place-input {
    width: 100%;
    margin-bottom: map_get($space-sm, 'x');
    padding: map_get($space-md, 'x') map_get($space-sm, 'y');
    border-radius: $generic-border-radius;
    border: 1px solid $grey;
    font-size: 16px;
  }
</style>
