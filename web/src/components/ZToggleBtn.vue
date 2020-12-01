<template>
  <div class="flex justify-between items-center">
    <div
      class="w-12 h-6 flex items-center border
      border-gray-400 rounded-full p-1 transition duration-300 cursor-pointer"
      :class="{ 'bgColorEnabled': isEnabled, 'bg-white': !isEnabled,}"
      @click="btnToggle"
    >
      <div
        class="bg-white w-5 h-5 border-2 border-gray-400 rounded-full shadow-md transform transition duration-300"
        :class="{ 'translate-x-5': isEnabled,'bg-gray-500': !isEnabled,}"
      />
    </div>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'isEnabled',
    event: 'toggle',
  },
  props: {
    isEnabled: Boolean,
  },
  methods: {
    btnToggle() {
      this.$emit('toggle', !this.isEnabled);
    },
  },
};
</script>
