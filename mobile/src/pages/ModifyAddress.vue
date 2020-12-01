<template>
  <div class="q-pa-md">
    <z-location-picker />
    <div class="row flex-center q-mt-lg">
      <q-btn color="primary" label="Подтвердить" />
    </div>
  </div>
</template>

<script>
import ZLocationPicker from '@/components/ZLocationPicker';

export default {
  name: 'ModifyAddress',
  components: {
    ZLocationPicker,
  },
};
</script>
