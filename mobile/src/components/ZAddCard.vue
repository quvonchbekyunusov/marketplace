<template>
  <!--  Xasilov Muxammad-Amin -->
  <div class="q-pt-xl">
    <form @submit.prevent.stop="onSubmit">
      <div class="full-width q-pa-md">
        <p class="card-name q-pb-xs">
          Card Number
        </p>
        <q-input
          ref="card"
          v-model="card"
          outlined
          class="card-number"
          color="primary"
          mask="#### #### #### ####"
          fill-mask="X"
          lazy-rules
          :rules="[ val => val && val.length < 20 || 'Please Enter your card']"
        />
        <div class="q-mt-md">
          <p class="expire-date q-pb-md">
            Expire Date
          </p>
          <div class=" selector q-gutter-md row">
            <q-select
              ref="month"
              v-model="modelMonth"
              outlined
              color="primary"
              :options="optionsMonth"
              use-input
              input-debounce="0"
              label="MM"
              class="select-month"
              behavior="menu"
              :rules="[ val => val && val.length < 2 || ' Please Choose the Month']"
            />

            <q-select
              ref="year"
              v-model="modelYear"
              outlined
              use-input
              multiple
              color="primary"
              :options="optionsYear"
              input-debounce="0"
              label="YY"
              class="select-year"
              behavior="menu"
              :rules="[ val => val && val.length < 2 || ' Please Choose the Year']"
            />
          </div>
        </div>
        <div class="q-pt-xs">
          <p class="name q-pb-xs">
            Name
          </p>
          <q-input
            ref="name"
            v-model="name"
            color="primary"
            outlined
            label="Enter your name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Enter your name']"
          />
        </div>
        <q-checkbox v-model="SaveCardDetails" label="Save Card Details" color="primary" class="checkbox" />
        <div
          class="flex justify-center q-mt-xl"
        >
          <q-btn label="Подтвердить" class="text-weight-bold" type="submit" unelevated color="primary" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ZAddCard',
  data() {
    return {
      modelMonth: null,
      optionsMonth: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
      ],
      modelYear: null,
      optionsYear: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      ],
      card: null,
      name: null,
      year: null,
      month: null,
      SaveCardDetails: true,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.name.validate();
      this.$refs.card.validate();
      this.$refs.month.validate();
      this.$refs.year.validate();

      if (this.$refs.name.hasError || this.$refs.card.hasError
        || this.$refs.month.hasError || this.$refs.year.hasError) {
        this.formHasError = true;
      } else {
        this.$router.push({ name: 'checkout' });
      }
    },
  },
};
</script>

<style scoped>
  .card-name {
    font-size: 13px;
  }

  .expire-date {
    font-size: 13px;
  }

  .name {
    font-size: 13px;
  }

  .checkbox {
    font-size: 14px;
  }

  .card-number {
    font-size: 18px;
  }

  .select-month {
    height: 50px;
    width: 90px;
  }

  .select-year {
    height: 50px;
    width: 90px;
  }

</style>
