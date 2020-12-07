<template>
  <q-form @submit="onSubmit">
    <!-- start: Azimjon Toirov 09.10.2020 -->
    <h6 class="q-ml-md q-mb-md">
      Добавление адреса
    </h6>
    <q-input
      v-model="name"
      color="primary"
      class="rounded-borders q-mx-md q-mb-md"
      outlined
      label="Названия"
    />
    <q-select
      v-model="selectedCountry"
      outlined
      class="rounded-borders q-mx-md q-mb-md"
      :options="options"
      label="Страна"
      @input="onSelectCountry"
    />
    {{ selectedCountry }}
    <q-select
      v-model="selectedRegion"
      outlined
      class="rounded-borders q-mx-md q-mb-md"
      :options="regions"
      label="Регионы"
    />
    {{ selectedRegion }}
    <q-input
      v-model="home"
      color="primary"
      class="rounded-borders q-mx-md q-mb-md"
      outlined
      label="Дом, Этаж, № квартиры"
    />
    <q-input
      v-model="street"
      color="primary"
      class="rounded-borders q-mx-md"
      outlined
      label="Улица/Переулок"
    />
    <!-- end: Azimjon Toirov -->
    <div class="q-mt-md full-width">
      <p class="q-ml-md">
        Место доставки
      </p>
      <q-item>
        <z-location-picker class="full-width" @new-location="onNewLocation" />
      </q-item>
    </div>
    <!-- start: Azimjon Toirov 09.10.2020 -->
    <div class="q-ma-md">
      <q-btn
        type="submit"
        class="q-mr-md full-width"
        color="primary"
        label="Добавить"
      />
    </div>
    <!-- end: Azimjon Toirov -->
  </q-form>
</template>

<script>
import axios from 'axios';
import ZLocationPicker from '@/components/ZLocationPicker';

export default {
  name: 'ZCheckoutForm',
  components: {
    ZLocationPicker,
  },
  data() {
    return {
      API_BASE_URL: 'http://market.zetsoft.uz/rest',
      name: '',
      country: '',
      selectedCountry: '',
      regions: '',
      selectedRegion: '',
      home: '',
      street: '',
      options: [],
      shipmentAddress: null,
    };
  },
  async created() {
    const { data: { data: countries } } = await axios({
      url: 'http://market.zetsoft.uz/rest/place-country/index.aspx',
      method: 'GET',
      params: {
        select: ['id', 'name'],
      },
    });
    this.options = countries.map((country) => ({
      label: country.name,
      value: country.id,
    }));
  },
  methods: {
    onSubmit() {
      this.$emit('submit', {
        addressName: this.name,
        shipmentAddress: this.shipmentAddress,
      });
    },
    onNewLocation(newLocation) {
      this.shipmentAddress = newLocation;
    },
    async onSelectCountry(country) {
      const { data: { data: regions } } = await axios({
        url: `${this.API_BASE_URL}/place-region/index.aspx?query[place_country_id]=${country.value}`,
        method: 'GET',
        params: {
          select: ['id', 'name', 'place_country_id'],
        },
      });
      this.regions = regions.map((region) => region.name);
    },
  },
};

</script>

<style lang="scss" scoped>
  // start: Azimjon Toirov 09.10.2020
  .fieldset-border {
    border-radius: 6px;
    border-color: $grey-6;
  }
  // end: Azimjon Toirov
</style>
