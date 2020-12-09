<template>
  <div class=" relative ">
    <div class="inline-block">
      <div>
        <z-product-detail-carausel
          :slides="slides"
          style="width: 271px; height: 248px"
          >
        </z-product-detail-carausel>
      </div>
    </div>
    <div class="inline-block ml-6 absolute mt-4">
      <div>
        <div class="inline-block" style="width: 400px">
          <h1 class="font-bold text-xl">14" Ноутбук ASUS VivoBook 14 серый</h1>
          <div>
            <h1 class="inline-block">4.0</h1>
            <ui-star-rating size=15 class="inline-block px-4" increment=4></ui-star-rating>
            <p class="inline-block font-bold text-gray-700">10 отзывов</p>
          </div>
          <h2 class="text-gray-600">MPlace, доставка со склада MPlace</h2>
        </div>
        <div class="inline-block float-right clear-both">
          <div class="float-right">
            <div class="inline-block">
              <svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 15L-0.000104904 15V13L13 13V15Z" fill="#333333"/>
                <path d="M18 8.5L-0.000148773 8.5V6.50002L18 6.50002V8.5Z" fill="#333333"/>
                <path d="M18 2L-0.000148773 2V1.52588e-05L18 1.52588e-05V2Z" fill="#333333"/>
                <path d="M16.9999 15L20.9999 15V19H23V15H27V13H23V9.00008H20.9999V13H16.9999V15Z" fill="#333333"/>
              </svg>
            </div>
            <div class="inline-block ml-4">
              <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.39941 11.2221C-0.0884311 7.96277 0.74085 3.0738 4.88725 1.44415C9.03366 -0.185504
              11.5215 3.0738 12.3508 4.70346C13.1801 3.0738 16.4972 -0.185504 20.6436 1.44415C24.79
              3.0738 24.79 7.96277 22.3022 11.2221C19.8143 14.4814 12.3508 21 12.3508 21C12.3508 21
              4.88725 14.4814 2.39941 11.2221Z"
                  stroke="#333333"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 class="font-bold text-2xl">250000 som</h1>
        </div>
      </div>
      <div class="pt-4">
        <div class="text-sm inline-block text-gray-600" style="width: 400px">
          <p>Процессор: Intel Core i3-8145U (2.1 ГГц)</p>
          <p>Оперативная память, ГБ: 4</p>
          <p>Общий объем SSD, ГБ: 256</p>
          <p>Видеокарта: Intel UHD Graphics 620
          </p>
          <p>Операционная система: Windows 10 Home</p>
        </div>
        <div class="inline-block ml-2">
          <button
            class="focus:outline-none border-solid border-2 border-primary-400 rounded text-primary-400
            float-right clear-both"
            style="width: 160px; height: 45px">
            <svg
              class="full-current w-4 h-4 ml-2 inline-block mb-2"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.1 13.6C4.165 13.6 3.4085 14.365 3.4085 15.3C3.4085 16.235 4.165 17 5.1
              17C6.035 17 6.8 16.235 6.8 15.3C6.8 14.365 6.035 13.6 5.1 13.6ZM0 0V1.7H1.7L4.76
              8.1515L3.6125 10.234C3.4765 10.472 3.4 10.7525 3.4 11.05C3.4 11.985 4.165 12.75 5.1
              12.75H15.3V11.05H5.457C5.338 11.05 5.2445 10.9565 5.2445 10.8375L5.27 10.7355L6.035
              9.35H12.3675C13.005 9.35 13.566 9.0015 13.855 8.4745L16.898 2.958C16.966 2.839 17
              2.6945 17 2.55C17 2.0825 16.6175 1.7 16.15 1.7H3.5785L2.7795 0H0ZM13.6 13.6C12.665
              13.6 11.9085 14.365 11.9085 15.3C11.9085 16.235 12.665 17 13.6 17C14.535 17 15.3 16.235
               15.3 15.3C15.3 14.365 14.535 13.6 13.6 13.6Z"
                fill="#3377FF"/>
            </svg>
            <span class="inline-block pl-2 text-xl font-bold"> В корзину</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ZCarousel from '@/components/ZCarousel';
import ZProductDetailCarausel from '@/components/ZProductDetailCarausel';

export default {
  components: {
    // ZCarousel,
    ZProductDetailCarausel,
  },
  data() {
    return {
      slides: [
        { id: 1, src: 'https://otdelkasten.com/wp-content/uploads/2018/06/6daa35d95cbb9d7bbe2a7b4bacd952fc.jpg' },
        { id: 2, src: 'https://pbs.twimg.com/media/DwyYy8hWwAARyII.jpg' },
        { id: 3, src: 'https://www.zastavki.com/pictures/1366x768/2008/Photoshop_Empty_plane_008144_.jpg' },
        { id: 4, src: 'https://im0-tub-com.yandex.net/i?id=90e935cf5e20066860f541dd88ebd21f&n=13' },
        { id: 5, src: 'https://dzerginsk.by/uploads/f9/0d/f90d5d3d2449bd5418ce50401656e4c4.jpg' },
      ],
    };
  },
};
</script>
