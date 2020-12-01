<template>
  <div class="wrapper">
    <div class="column items-center">
      <!--      <q-img :ratio="5 / 3" contain :src="require('@/assets/orderComplatedIMG.svg')" />-->
      <q-icon name="r_done" size="180px" color="primary" />
      <p class="title text-primary q-mt-lg">
        Заказ завершен !
      </p>
      <p class="q-mt-xs">
        Номер заказа: 2111313
      </p>
      <q-btn
        label="Продолжить покупку"
        :to="{ name: 'home' }"
        class="btn1 q-mt-lg"
        size="lg"
        color="primary"
        no-caps
      />
      <q-btn
        label="Детали заказа"
        :to="{ name: 'orders' }"
        class="btn2 q-mt-md"
        outline
        color="primary"
        size="lg"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZOrderCompleted',
};
</script>

<style lang="scss" scoped>
  .btn1, .btn2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    width: 90%;
    border-radius: 4px;
  }

  .btn2 {
    box-sizing: border-box;
  }

  .title {
    font-size: 22px;
    line-height: 1.2;
  }
</style>
