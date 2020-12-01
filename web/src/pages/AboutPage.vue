<template>
  <div class="about">
    <z-checkbox v-model="checkbox" label="Do you agree?" />
    <br>
    <br>
    <br>
    <z-checkbox-group v-model="checkboxGroup" />
  </div>
</template>

<script>
import ZCheckbox from '@/components/ZCheckbox';
import ZCheckboxGroup from '@/components/ZCheckboxGroup';

export default {
  name: 'About',
  components: {
    ZCheckbox,
    ZCheckboxGroup,
  },
  data() {
    return {
      checkbox: false,
      checkboxGroup: [
        {
          id: 1,
          label: 'Jack',
          value: false,
        },

        {
          id: 2,
          label: 'John',
          value: false,
        },

        {
          id: 3,
          label: 'Jane',
          value: false,
        },
      ],
    };
  },
  watch: {
    checkboxGroup: {
      immediate: true,
      handler: (value) => console.log(JSON.parse(JSON.stringify(value))),
    },
  },
};
</script>
