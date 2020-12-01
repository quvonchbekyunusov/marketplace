<template>
  <!-- start|AzimjonToirov|2020-10-22 -->
  <div class="bg-gray-300 mt-5 w-1/3">
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
    <z-img-gallery :images="images" />
  </div>
  <!-- end|AzimjonToirov|2020-10-22 7lines html -->
</template>

<script>
/* start|AzimjonToirov|10/22/2020 */
import UiCarouselCard from '@/components/ui/UiCarouselCard';
import ZBestOffersCard from '@/components/ZBestOffersCard';
import ZImgGallery from '@/components/ZImgGallery';

export default {
  name: 'WishlistPage',
  components: {
    UiCarouselCard,
    ZBestOffersCard,
    ZImgGallery,
  },
  data() {
    return {
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
      images: [
        '/images/sm1.jpg',
        '/images/sm2.jpg',
        '/images/sm3.jpg',
        '/images/sm4.jpg',
        '/images/sm5.jpg',
        '/images/sm6.jpg',
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
/* end|AzimjonToirov|10/22/2020 12lines js */
</script>
