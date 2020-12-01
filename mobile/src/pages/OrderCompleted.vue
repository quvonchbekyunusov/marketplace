<template>
  <q-page>
    <div class="absolute-center full-width">
      <z-order-completed />
    </div>
  </q-page>
</template>

<script>
import ZOrderCompleted from '@/components/ZOrderCompleted';

export default {
  name: 'OrderCompleted',
  components: {
    ZOrderCompleted,
  },
};
</script>
