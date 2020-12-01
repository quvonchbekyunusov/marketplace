<template>
  <div>
    <div class="row q-my-sm justify-between items-center">
      <p class="text-caption text-bold">
        Статус доставки
      </p>
      <p
        :class="statusMessage === 'Отказан' ? 'denied'
          : statusMessage === 'В процессе' ? 'in-progress'
            : 'text-primary'"
      >
        {{ statusMessage }}
      </p>
    </div>
    <div class="row q-mb-md">
      <p class="text-caption text-grey-8">
        <!--        Дата доставки: {{ $d(date, 'short') }}-->
      </p>
    </div>
    <ul class="row q-col-gutter-md">
      <li v-for="(image, index) in images" :key="index">
        <q-img width="55px" height="70px" :src="image" contain />
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

const STATUS_MESSAGES = Object.freeze({
  rejected: 'Отказан',
  'in-progress': 'В процессе',
  delivered: 'Доставлено',
});

export default {
  name: 'ZOrderBlockBody',
  props: {
    status: VueTypes.string.isRequired,
    // date: VueTypes.number.isRequired,
    images: VueTypes.arrayOf(VueTypes.string).isRequired,
  },
  computed: {
    statusMessage() {
      return STATUS_MESSAGES[this.status];
    },
  },
};
</script>

<style scoped>
  .deliviring, .bought, .denied {
    font-weight: 500;
    font-size: 14px;
    line-height: 34px;
    text-align: center;
    border-radius: 4px;
  }

  .denied {
    color: #eb5757;
  }

  .in-progress {
    color: #ffb753;
  }
</style>
