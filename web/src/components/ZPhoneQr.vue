<template>
    <div>
      <img :src="src" alt="z-phone-qr" class="w-50">
    </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZPhoneQr',
  props: {
    src: VueTypes.string.isRequired,
    to: VueTypes.object.isRequired,
  },
};
</script>
