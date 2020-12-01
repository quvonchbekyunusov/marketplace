<template>
  <div>
    <Datepicker
      input-class="shadow appearance-none border
       rounded py-2 px-3 m-5 text-gray-700
        leading-tight focus:outline-none focus:shadow-outline"
      :placeholder="placeholder"
      :bootstrap-styling="true"
      @selected="getDateValue"
      @changedMonth="changedMonth"
    />
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import VueTypes from 'vue-types';

export default {
  name: 'ZDatePicker',
  components: {
    Datepicker,
  },
  props: {
    placeholder: VueTypes.string.isRequired,
  },
  methods: {
    getDateValue(date) {
      const formattedDate = new Intl.DateTimeFormat('de-DE').format(date);
      this.$emit('selected', formattedDate);
    },
    changedMonth(date) {
      const changedMonth = new Intl.DateTimeFormat('de-DE').formatToParts(date);
      this.$emit('onChangedMonth', changedMonth);
    },
  },
};
</script>
