<template>
  <ui-container>
    <section>
      <p>Ноутбуки, планшети</p>
      <z-carousel class="h-3/6 m-auto hiehgt-half" :slides="SliderImages" />
    </section>
    <div class="main_container">
      <div class="container_left">
        <p>категория</p>
        <z-accordion-list :content="content" />
        <div class="flex whitespace-nowrap bold font-bold">
          <p class="text-blue">{{ toggleBtn.label }}</p>
          <z-toggle-btn :isEnabled="toggleBtn.value" />
        </div>
      </div>
      <div class="container-right">
        <p>container ringht</p>
      </div>
    </div>
  </ui-container>
</template>

<script>
import ZCarousel from '@/components/ZCarousel';
import UiContainer from '@/components/ui/layouts/UiContainer.vue';
import ZAccordionList from '@/components/ZAccordionList.vue';
import ZToggleBtn from '../components/ZToggleBtn.vue';

export default {
  name: 'CategoryPage',
  components: {
    ZCarousel,
    UiContainer,
    ZAccordionList,
    ZToggleBtn,
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
      content: [
        {
          id: 1,
          name: 'telefon va planshetlar',
          items: [
            'samsung',
            'nokia',
            'redmi',
            'iphone',
          ],
        },

      ],
      toggleBtn: {
        label: 'Супермаркет зкспрес',
        value: true,
      },
    };
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

  .hiehgt-half{
    max-height: 300px;
  }

  .main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .container_left {
    color: black;
    width: 25%;
  }

  .container_left > p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333333;
  }

  .container_right {
    width: 75%;
  }

  .text-blue {
    color: #4080FF;
    font-size: 1.5rem;

  }
</style>
