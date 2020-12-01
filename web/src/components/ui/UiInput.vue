<template>
  <!--start: Makhmudov Mirfozil-->
  <div class="border rounded-lg flex">
    <slot name="append" />
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      class="outline-none w-full rounded-lg px-1"
      @input="$emit('input', $event.target.value)"
    >
    <slot name="prepend" />
  </div>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import VueTypes from 'vue-types';

export default {
  name: 'UiInput',
  props: {
    placeholder: VueTypes.string.isRequired,
    value: VueTypes.string.isRequired,
  },
};
// end: Mirfozil Makhmudov
</script>
