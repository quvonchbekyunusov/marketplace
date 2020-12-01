<template>
  <!-- //start |Doniyor Raxmonov| 2020-10-13 -->
  <div>
    <div v-if="offersForRender">
      <div class="wrapper q-mt-sm">
        <div class="info flex items-center">
          <q-img :src="seller.data.logo" class="logo" />
          <p class="name q-ml-sm">
            {{ seller.data.name }}
          </p>
        </div>
        <p class="q-ml-sm count q-my-sm">
          Всего товаров : {{ offers.length }}
        </p>
        <div class="categories q-my-sm flex wrap">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category flex items-center bg-blue-3 q-ml-sm"
          >
            <div>{{ category.name }}</div>
          </div>
        </div>
        <q-scroll-area
          style="height: 40px; width: 100%"
          class="fa-border"
          :thumb-style="{ opacity: 0 }"
          horizontal
        >
          <div class="flex no-wrap">
            <div class="scrollMenu" :class="{choosed:choosedSection==='Главная'}" @click="toggleMenu('Главная')">
              Главная
            </div>
            <div class="scrollMenu" :class="{choosed:choosedSection==='Новинки'}" @click="toggleMenu('Новинки')">
              Новинки
            </div>
            <div class="scrollMenu" :class="{choosed:choosedSection==='Скидки'}" @click="toggleMenu('Скидки')">
              Скидки
            </div>
            <div class="scrollMenu" :class="{choosed:choosedSection==='О магазине'}" @click="toggleMenu('О магазине')">
              Омагазине
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div v-if="choosedSection==='Главная'" class="flex q-mb-md">
        <z-grid-list-component class="full-width" :get-products="offersForRender" />
      </div>
    </div>
    <div v-if="choosedSection==='Новинки'">
      Новинки
    </div>
    <div v-if="choosedSection==='Скидки'" class="flex q-mb-md">
      <z-grid-list-component :get-products="offersWithDiscount" />
    </div>
    <div v-if="choosedSection==='О магазине'">
      O магазине
    </div>
  </div>
  <!-- //end |Doniyor Raxmonov| 2020-10-13 -->
</template>

<script>
// start  | Doniyor Raxmonov |
import VueTypes from 'vue-types';
import api from '@common/api';
import ZGridListComponent from '@/components/ZGridListComponent';
import { uniqBy } from 'lodash-es';

export default {
  name: 'SellerPageVue',
  components: { ZGridListComponent },
  props: {
    sellerId: VueTypes.string.isRequired,
  },
  data() {
    return {
      seller: null,
      offers: null,
      offersWithDiscount: [],
      categories: null,
      offersForRender: null,
      choosedSection: 'Главная',
    };
  },
  async created() {
    this.seller = await api.one('seller', this.sellerId);
    this.offers = (await api.all('catalog', {
      filter: {
        seller: this.sellerId,
      },
      include: ['element', 'element.product'],
    })).data;
    this.offersForRender = this.moderateOffers(this.offers);
    await this.getCategoryIds(this.offers);
    this.getOffersWithDiscount(this.offersForRender);
  },
  methods: {
    async getCategoryIds(offers) {
      const categoryIds = [];
      offers.forEach((offer) => {
        if (!categoryIds.includes(offer.element.product.category)) {
          categoryIds.push(offer.element.product.category);
        }
      });
      this.categories = (await api.multiple('category', categoryIds)).data;
    },
    toggleMenu(menuName) {
      this.choosedSection = menuName;
    },
    getOffersWithDiscount(offers) {
      offers.forEach((offer) => {
        if (offer.offer.price.old) {
          this.offersWithDiscount.push(offer);
        }
      });
    },
    moderateOffers(offers) {
      return uniqBy(offers.map((offer) => ({
        ...offer.element.product,
        offer: {
          ...offer,
          price: {
            value: offer.price,
            old: offer.oldPrice,
          },
          element: {
            ...offer.element,
            product: offer.element.product.id,
          },
        },
      })), 'id');
    },
  },
};
// end  | Doniyor Raxmonov | 2020-10-13
</script>

<style scoped>
  /*  //start |Doniyor Raxmonov| 2020-10-13 */
  .logo {
    width: 20%;
    height: 20%;
    border-radius: 50%;
    float: left;
  }

  .category {
    height: 34px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding: 0 5px;
    color: #FFFFFF;
  }

  .cardGrid {
    width: 45%;
  }

  .scrollMenu {
    font-size: 20px;
    color: #999999;
    font-weight: 500;
    padding: 0 15px;
  }

  .choosed {
    color: #333333;
    font-weight: 600;
  }

  .count {
    font-size: 10px;
    line-height: 12px;
    color: #999999;
  }

  .name {
    font-size: 20px;
    line-height: 23px;
    color: #333333;
  }

  /* //end | Doniyor Raxmonov| 2020-10-13 */
</style>
