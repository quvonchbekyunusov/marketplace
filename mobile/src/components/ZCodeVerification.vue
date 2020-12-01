<template>
  <!--  Xasilov Muxammad-Amin -->
  <div class="flex column items-center">
    <form @submit.prevent.stop="onSubmit">
      <div class="q-pt-xl text-center">
        <p class="phone-number  text-weight-bold">
          {{ maskedPhone }}
        </p>
        <p class="text-message q-mt-sm">
          Мы отправили вам смс с кодом
        </p>
        <q-input
          ref="code"
          v-model="code"
          dense
          class="q-pt-md"
          placeholder="Введите код"
          input-class="text-center full-width"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type sms code that we send',
            val => val > 1111 && val < 999999 || 'Please type a real code'
          ]"
        />
      </div>
      <div
        class="flex  justify-center q-mt-xl"
      >
        <q-btn
          label="Подтвердить"
          class="text-weight-bold"
          type="submit"
          unelevated
          color="primary"
        />
      </div>
    </form>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZCodeVerification',
  props: {
    phoneNumber: VueTypes.number.isRequired,
  },
  data() {
    return {
      code: null,
    };
  },
  computed: {
    maskedPhone() {
      const countryCode = this.phoneNumber.slice(0, 4);
      const operatorCode = this.phoneNumber.slice(4, 6);
      const lastDigits = this.phoneNumber.slice(11, 13);
      return `${countryCode} (${operatorCode}) *** ** ${lastDigits}`;
    },
  },
  methods: {
    onSubmit() {
      this.$refs.code.validate();

      if (this.$refs.code.hasError) {
        this.formHasError = true;
      } else {
        this.$router.push({ name: 'order-completed' });
        this.$q.notify({
          icon: 'done',
          color: 'primary',
          message: 'Confirming',
        });
      }
    },
  },
};

</script>

<style scoped>

  .phone-number {
    font-size: 20px;
  }

  .text-message {
    font-size: 18px;
  }

</style>
