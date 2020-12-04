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
      v-model="country"
      outlined
      class="rounded-borders q-mx-md q-mb-md"
      :options="options"
      label="Страна"
    />
    <q-select
      v-model="region"
      outlined
      class="rounded-borders q-mx-md q-mb-md"
      :options="options"
      label="Регионы"
    />
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
import ZLocationPicker from '@/components/ZLocationPicker';

export default {
  name: 'ZCheckoutForm',
  components: {
    ZLocationPicker,
  },
  data() {
    return {
      name: '',
      country: '',
      selectedCountr: '',
      region: '',
      selectedRegion: '',
      home: '',
      street: '',
      shipmentAddress: null,
    };
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
