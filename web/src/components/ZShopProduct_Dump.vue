<template>
  <div
    class="wrapper  h-full border-solid border flex flex-row justify-around   rounded-md shadow-md"
  >
    <img :src="productImage" class="imgproduct object-cover" alt="product photo">
    <div class="description">
      <p class="text-gray-900 pt-2 font-medium">
        {{ description.title }}
      </p>
      <p class="text-gray-600 pt-2 font-light">
        {{ description.body }}
      </p>
      <p class="text-gray-600 pt-2 font-light">
        {{ description.body }}
      </p>
    </div>
    <div class="seller other ">
      <div class="imgSeller">
        <img :src="seller.logo" class="w-full h-full mx-auto object-cover" alt="seller logo">
      </div>
      <div class="sellerInfo">
        <!--        <ui-star-rating class="ratingStar" />-->
        <p class="text-gray-600 font-light ml-2">
          {{ seller.reviewsCount }} отзывов
        </p>
        <p class="text-gray-600 ml-2 font-light">
          {{ seller.questionCount }} вопросов
        </p>
      </div>
    </div>
    <div class="price other  flex flex-col justify-around">
      <div class="mx-auto">
        <span class="text-xl">{{ price.value }}</span>
        <div v-if="price.old" class="line-through pl-5 text-gray-600 font-light">
          {{ price.old }}
        </div>
      </div>
      <z-button
        class="btn"
        size="small"
        title="В корзину"
        bg-color="primary-600"
        border-color="primary-600"
        text-color="white"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZButton from './ZButton';

export default {
  name: 'ZShopProductDump',
  components: { ZButton },
  props: {
    productImage: VueTypes.string.isRequired,
    description: VueTypes.object.isRequired,
    seller: VueTypes.object.isRequired,
    // addInfo: VueTypes.object.isRequired,
    price: VueTypes.object.isRequired,
  },
};
</script>

<style scoped>
  .imgproduct {
    width: 20%;
    height: 100%;
  }

  .description {
    width: 30%;
    padding-left: 2%;
  }

  .other {
    width: 20%;
  }

  .btn {
    width: 50%;
    margin: 0 auto;
  }

  .imgSeller {
    height: 70%;
    width: 100%;
  }

  .sellerInfo {
    height: 30%;
  }
</style>
