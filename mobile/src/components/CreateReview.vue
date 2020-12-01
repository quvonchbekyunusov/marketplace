<template>
  <div class="flex wrap column items-center">
    <button
      v-if="!isCreating"
      key="creatingFalse"
      class="btn bg-white  q-mt-sm"
      style="width: 40%"
      @click.prevent="toggleIsCreating"
    >
      Оставить отзыв
    </button>
    <q-card v-if="isCreating" key="creatingTrue" class="create full-width q-mt-lg">
      <p class="text-grey-8 q-my-sm q-ml-sm">
        Ваш оценка
      </p>
      <div class="rating  flex items-center  q-ma-sm">
        <q-rating
          v-model="model.rating"
          max="5"
          size="1.8em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          no-dimming
        />
        <span class="q-ml-md text-body2">{{ `${model.rating}/5` }}</span>
      </div>
      <q-input
        v-model="model.body"
        :value="model.body"
        class="input q-ma-sm"
        style="height: 45px; padding: 15px;"
        borderless
        placeholder="Ваш отзыв"
      />
      <q-input
        v-model="model.drawbacks"
        :value="model.drawbacks"
        class="input q-ma-sm"
        style="height: 45px; padding: 15px;"
        borderless
        placeholder="Недостатки"
      />
      <q-input
        v-model="model.virtues"
        :value="model.virtues"
        class="input q-ma-sm"
        style="height: 45px; padding: 15px;"
        borderless
        placeholder="Достоинства"
      />
      <span class="float-right sendBtn q-mr-md" @click="addReview">
        Отправить
        <q-btn round dense flat icon="send" color="" />
      </span>
    </q-card>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
// import api from '@common/api';

export default {
  name: 'CreateReview',
  props: {
    isClicked: VueTypes.bool,
    productId: VueTypes.number,
  },
  data() {
    return {
      model: {
        rating: 3,
        body: '',
        drawbacks: '',
        virtues: '',
        type: 'product',
        product: this.productId,
      },
      isCreating: false,
    };
  },
  methods: {
    toggleIsCreating() {
      this.isCreating = !this.isCreating;
    },
    async addReview() {
      if (this.model.body !== '') {
        // await api.create('review', { ...this.model });
      }
      this.toggleIsCreating();
    },

  },
};
</script>

<style scoped lang="scss">
  $send-color: #7AA0DA;
  .btn {
    outline: none;
    border: 1px solid $primary;
    box-sizing: border-box;
    border-radius: 5px;
    height: 35px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $primary;
  }

  .text-sendbtn {
    color: #7AA0DA
  }

  .sendBtn {
    color: $primary
  }

  .bg-sendbtn {
    background: #7AA0DA;
  }

  .input {
    background: #F2F2F2;
    border-radius: 6px;
  }
</style>
