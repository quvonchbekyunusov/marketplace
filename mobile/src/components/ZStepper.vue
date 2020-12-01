<template>
  <div class="wrapper q-py-md">
    <div class="item personalInfo" :disabled="step<1">
      <p :class="{ big : step===1 }">
        1
      </p>
      <span> Персональная информация</span>
    </div>
    <div class="item deliveryMethod" :disabled="step<2">
      <p :class="{ big : step===2 }">
        2
      </p>
      <span>Способ доставки</span>
    </div>
    <div class="item payment" :disabled="step<3">
      <p :class="{ big : step===3 }">
        3
      </p>
      <span> Способ доставки</span>
    </div>
    <div class="item confirmation" :disabled="step<4">
      <p :class="{ big : step===4 }">
        4
      </p>
      <span>Подтверждение</span>
    </div>
    <div>
      <q-btn @click="step++" label="++" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZStepper',
  data() {
    return {
      step: 1,
    };
  },
};
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .item {
    font-weight: 500;
    font-size: 18px;
    color: #F2F2F2;
    width: 90%;
    background: #27AE60;
    border-radius: 3px;
    padding-left: .5rem;
    padding-bottom: .5rem;
    margin-bottom: .5rem;
    display: flex;
    align-items: center;

    p {
      color: #000;
      text-align: center;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #fff;
      margin-right: .5rem;
      margin-top: .4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .big {
      width: 2.2rem;
      height: 2.2rem;
      font-size: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bigText {
      font-size: 21px;
    }

    span {
      padding-top: .8rem;
    }
  }
</style>
