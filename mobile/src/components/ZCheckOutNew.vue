<template>
  <div>
    <formulate-form v-model="formdata">
      <formulate-input
        type="group"
        name="contactInfo"
      >
        <formulate-input
          type="text"
          label="User Name"
          placeholder="placeholder"
          color="lime-11"
          name="contactName"
        />
        <formulate-input
          type="phone"
          label="User Name"
          name="phoneNumber"
          mask="(##) ### ## ##"
          unmasked-value
          :fill-mask="'\u2022'"
          prefix="+998"
        />
        <formulate-input
          type="password"
          label="User Password"
          name="userPassword"
          placeholder="Sample password placeholder"
        />
      </formulate-input>
      <formulate-input
        type="group"
        name="address"
      >
        <formulate-input
          type="text"
          label="Город"
          name="city"
          validation="required"
        />
        <formulate-input
          type="text"
          label="Адрес доставки"
          name="shipmentAddress"
          validation="required"
        />
        <formulate-input
          type="select"
          label="Дата доставки"
          name="shipmentDate"
          filled
          :options="[
            { value: 'first', label: 'First name' },
            { value: 'last', label: 'Last name' },
            { value: 'initial', label: 'Middle Initial', id: 'name-initial' }
          ]"
          validation="required"
        />
      </formulate-input>
      <formulate-input
        type="radio"
        name="radio"
        validation="required"
        label="Radio"
        val="radio"
      />
      <formulate-input
        type="radio"
        name="radioGroup"
        label="Radio Input"
        value="radio"
        :options="options"
        class="flex"
      />
      <formulate-input
        type="checkbox"
        name="checkbox"
        inline
        :options="options"
        size="xl"
      />
    </formulate-form>
    <pre>
      {{ formdata }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'ZCheckOutNew',
  data() {
    return {
      formdata: {},
      options: [
        {
          id: '1',
          label: 'Option 1',
          value: 'op1',
        },
        {
          id: '2',
          label: 'Option 2',
          value: 'op2',
        },
        {
          id: '3',
          label: 'Option 3',
          value: 'op3',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
