<template>
  <ui-page>
    <ui-container>
      <div class="carousel-wrapper flex items-center justify-around md:container mx-auto py-3">
        <z-carousel class="w-9/12 h-full" :slides="SliderImages" />
        <div class="w-2/12 h-full reklama" />
      </div>
      <!-- Popular -->
      <section class="mt-8">
        <p> Хиты продаж </p>
        <div class="flex">
          <div class="w-4/5 flex flex-wrap">
            <z-price-card
              v-for="(item, index ) in priceCardProps"
              :key="index"
              :price="item.price"
              :title="item.title"
              :image="item.image"
              :url="item.url"
              class="mr-2"
            />
          </div>
          <div class="w-1/5 reklama h-auto" />
        </div>
      </section>
      <!-- Sale -->
      <section class="mt-8">
        <p> Лучшие акции </p>
        <div class="flex">
          <div class="w-1/4 reklama" />
          <div class="w-2/4">
            <div class="flex justify-around">
              <z-price-card
                v-for="(item, index ) in bestSales"
                :key="index"
                :price="item.price"
                :title="item.title"
                :image="item.image"
                :url="item.url"
              />
            </div>
            <div class="flex justify-around">
              <z-price-card
                v-for="(item, index ) in bestSales"
                :key="index"
                :price="item.price"
                :title="item.title"
                :image="item.image"
                :url="item.url"
              />
            </div>
          </div>
          <div class="w-1/4 reklama" />
        </div>
      </section>
      <!-- Rec Blog -->
      <section class="mt-4">
        <img src="images/reklama.png" alt="reklama">
      </section>
      <!-- All Shops -->
      <section>
        <p> Все магазины </p>
        <div class="flex justify-around">
          <z-seller-card class="mr-2"/>
          <z-seller-card class="mx-2"/>
          <z-seller-card class="ml-2"/>
        </div>
      </section>
      <!-- Recommended -->
      <section>
        <p> Рекомендуем </p>
        <div class="flex">
          <div class="w-1/2 flex mr-2">
            <z-product-card class="mr-2"/>
            <z-product-card class="ml-2"/>
          </div>
          <div class="w-1/2 ml-2">
            <ui-carousel-card
              #ui-carousel-card-section
              @changePrev="prevItems"
              @changeNext="nextItems"
            >
              <template>
                <z-best-offers-card
                  v-for="item in filteredItems"
                  :key="item.id"
                  :description="item.description"
                  :price="item.price"
                  :img="item.img"
                  :rating="item.rating"
                />
              </template>
            </ui-carousel-card>
          </div>
        </div>
        <div class="flex mt-8">
          <div class="w-1/2 flex mr-2">
            <z-product-card class="mr-2"/>
            <z-product-card class="ml-2"/>
          </div>
          <div class="w-1/2 ml-2">
            <ui-carousel-card
              #ui-carousel-card-section
              @changePrev="prevItems"
              @changeNext="nextItems"
            >
              <template>
                <z-best-offers-card
                  v-for="item in filteredItems"
                  :key="item.id"
                  :description="item.description"
                  :price="item.price"
                  :img="item.img"
                  :rating="item.rating"
                />
              </template>
            </ui-carousel-card>
          </div>
        </div>
        <div class="flex mt-8">
          <div class="w-1/2 flex mr-2">
            <img src="images/Rectangle 432.png" alt="asdasd" >
          </div>
          <div class="w-1/2 ml-2 flex">
            <z-product-card class="mr-2"/>
            <z-product-card class="ml-2"/>
          </div>
        </div>
      </section>
      <!-- New Products -->
      <section>
        <p> Новые товары </p>
        <div class="flex">
          <z-price-card
            v-for="(item, index ) in priceCardProps"
            :key="index"
            :price="item.price"
            :title="item.title"
            :image="item.image"
            :url="item.url"
            class="mr-2"
          />
        </div>
        <div class="flex">
          <z-price-card
            v-for="(item, index ) in priceCardProps"
            :key="index"
            :price="item.price"
            :title="item.title"
            :image="item.image"
            :url="item.url"
            class="mr-2"
          />
        </div>
      </section>
      <!-- Seasonal -->
      <section>
        <p> Сезонные товары </p>
        <div class="flex">
          <div class="w-2/3">
            <z-seasonal-product
              :seasonal-product="seasonalProduct"
            />
          </div>
          <div class="w-1/3">
            <img src="images/seasonal-rek.png" alt="seasonal">
          </div>
        </div>
      </section>
      <!-- Popular brands -->
      <section class="mb-6">
        <p>Популярные бренды</p>
        <div class="flex">
          <z-brand-card
            v-for="brand in brands"
            :key="brand.id"
            :brand="brand"
          />
        </div>
        <div class="flex">
          <z-brand-card
            v-for="brand in brands"
            :key="brand.id"
            :brand="brand"
          />
        </div>
      </section>
    </ui-container>
  </ui-page>
</template>

<script>
import UiPage from '@/components/ui/layouts/UiPage';
import UiContainer from '@/components/ui/layouts/UiContainer';
import ZCarousel from '@/components/ZCarousel';
import ZPriceCard from '@/components/ZPriceCard';
import ZSellerCard from '@/components/ZSellerCard';
import ZProductCard from '@/components/ZProductCard';
import UiCarouselCard from '@/components/ui/UiCarouselCard';
import ZBestOffersCard from '@/components/ZBestOffersCard';
import ZSeasonalProduct from '@/components/ZSeasonalProduct';
import ZBrandCard from '@/components/ZBrandCard';

export default {
  name: 'HomePage',
  components: {
    UiPage,
    UiContainer,
    ZCarousel,
    ZPriceCard,
    ZSellerCard,
    ZProductCard,
    UiCarouselCard,
    ZBestOffersCard,
    ZSeasonalProduct,
    ZBrandCard,
  },
  data() {
    return {
      SliderImages: [
        {
          id: 1,
          src: 'https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg',
          alt: '',
        },
        {
          id: 2,
          src: 'https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg',
          alt: '',
        },
        {
          id: 3,
          src: 'https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg',
          alt: '',
        },
      ],
      priceCardProps: [
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1.png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (1).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (2).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (4).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (5).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (2).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (3).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (1).jpg',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (4).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (2).png',
          url: '#',
        },
      ],
      bestSales: [
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (4).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (1).png',
          url: '#',
        },
        {
          price: 2300,
          title: 'Nokia 8800',
          image: 'images/dress 1 (2).png',
          url: '#',
        },
      ],
      testData: [
        {
          id: 1,
          price: 750000,
          title: 'Product title 1',
          rating: 4,
          img: '/images/Rectangle%20454 (1).png',
          description: 'Envelope, Pencil and etc. Purchase\n'
            + 'this kit today and feel',
        },
        {
          id: 2,
          price: 250000,
          title: 'Product title 2',
          rating: 3,
          img: '/images/Rectangle%20455.png',
          description: 'Stripes, Pencil and etc. Purchase\n'
            + 'this kit today and feel',
        },
        {
          id: 3,
          price: 450000,
          rating: 1,
          title: 'Product title 3',
          img: '/images/Rectangle%20455.png',
          description: 'Envelope, Stripes, Pencil and etc. Purchase\n'
            + 'this kit today and feel',
        },
        {
          id: 4,
          price: 958000,
          rating: 5,
          title: 'Product title 4',
          img: '/images/Rectangle%20455.png',
          description: 'Envelope, Stripes, and etc. Purchase\n'
            + 'this kit today and',
        },
      ],
      seasonalProduct: [
        {
          id: 1,
          src: 'https://gilmanlabs.com/wp-content/uploads/2017/02/OGMOGH0.jpg',
          name: 'Dolphin',
          title: 'Цветные карандаши',
          rate: 4,
          description: 'Яркие и масленные карандаши, 24шт. в коробке',
          price: 250000,
        },
        {
          id: 2,
          src: 'https://gilmanlabs.com/wp-content/uploads/2017/02/OGMOGH0.jpg',
          name: 'Theatre',
          title: 'Цветные карандаши',
          rate: 2,
          description: 'Яркие и масленные карандаши, 24шт. в коробке',
          price: 710000,
        },
        {
          id: 2,
          src: 'https://gilmanlabs.com/wp-content/uploads/2017/02/OGMOGH0.jpg',
          name: 'NoteBook',
          title: 'Цветные карандаши',
          rate: 5,
          description: 'Яркие и масленные карандаши, 24шт. в коробке',
          price: 1710000,
        },
      ],
      brands: [
        {
          id: 0,
          url: '/',
          src: 'images/dress 1 (1).png',
        },
        {
          id: 1,
          url: '/',
          src: 'images/dress 1 (2).png',
        },
        {
          id: 2,
          url: '/',
          src: 'images/dress 1 (3).png',
        },
        {
          id: 3,
          url: '/',
          src: 'images/dress 1 (4).png',
        },
        {
          id: 4,
          url: '/',
          src: 'images/dress 1 (1).png',
        },
        {
          id: 5,
          url: '/',
          src: 'images/dress 1 (3).png',
        },
        {
          id: 6,
          url: '/',
          src: 'images/dress 1 (2).png',
        },
      ],
      startPoint: 0,
      endPoint: 3,
    };
  },
  computed: {
    filteredItems() {
      return this.testData.slice(this.startPoint, this.endPoint);
    },
  },
  methods: {
    nextItems() {
      if (this.startPoint < this.testData.length && this.endPoint <= this.testData.length) {
        this.startPoint += 3;
        this.endPoint += 3;
        console.log(this.startPoint);
        console.log(this.endPoint);
      } else {
        console.log('end of list');
      }
    },
    prevItems() {
      if (this.startPoint > 0) {
        this.startPoint -= 3;
        this.endPoint -= 3;
        console.log(this.startPoint);
        console.log(this.endPoint);
      } else {
        console.log('start of list');
      }
    },
  },
};
</script>

<style scoped>
  section p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3377ff;
    margin: 1rem 0;
  }

  .carousel-wrapper {
    height: 423px;
  }
  .reklama {
    background: url('https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg');
  }
</style>
