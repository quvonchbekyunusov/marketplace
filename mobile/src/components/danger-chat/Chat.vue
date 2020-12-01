<template>
  <div class="flex column">
    <ul>
      <li v-for="message in messages" :key="message">
        {{ message }}
      </li>
    </ul>
    <q-input
      v-model="message"
      name="message"
      value=""
      label="Your Message"
      class=""
      rounded
      outlined
      @keyup.enter="sendMessage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Chat',
  data() {
    return {
      message: null,
    };
  },
  computed: {
    ...mapGetters('chat', ['messages']),
  },
  methods: {
    sendMessage() {
      if (this.message) {
        this.$store.dispatch('chat/saveMessage', this.message);
        this.message = '';
      }
    },
  },
};
</script>

<style scoped>

</style>
