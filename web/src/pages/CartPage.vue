<template>
  <div class="page">
    <div class="h-48">
      <z-shop-product-dump
        class="mx-16 my-16"
        :product-image="productImage"
        :seller="seller"
        :description="description"
        :price="price"
      />
    </div>
  </div>
</template>

<script>
// import ZAccordion from '../components/ZAccordion';
// import ZButton from '../components/ZButton';
// import ZAccordionList from '../components/ZAccordionList';
// import ZCheckboxList from '../components/ZCheckboxList';
import ZShopProductDump from '../components/ZShopProduct_Dump';

export default {
  name: 'CartPage',
  components: { ZShopProductDump },
  data() {
    return {
      categories: [
        {
          name: 'Clothes',
          items: ['Versachi', 'Gucci', 'VsCode', 'DiG', 'Puma'],
          id: 1,
        },
        {
          name: 'Electronic',
          items: ['Versachi', 'Gucci', 'VsCode', 'DiG', 'Puma'],
          id: 2,
        },
        {
          name: 'For Home',
          items: ['Versachi', 'Gucci', 'VsCode', 'DiG', 'Puma'],
          id: 3,
        },
        {
          name: 'Ethernet',
          items: ['Versachi', 'Gucci', 'VsCode', 'DiG', 'Puma'],
          id: 4,
        },
        {
          name: 'Technique',
          items: ['Versachi', 'Gucci', 'VsCode', 'DiG', 'Puma'],
          id: 5,
        },
      ],
      productImage: 'https://icdn.lenta.ru/images/2020/10/13/20/20201013204257184/square_320_ad00955664943c904fc3f246ac7ab616.jpg',
      description: {
        title: 'Смартфон Xiaomi Redmi Note 9 4/128GB, Чёрный',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eveniet laboriosam soluta',
      },
      seller: {
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX/ZwD/////bBH/WAD/XQD//vz/+PT/ezz/cyj/9vH/YwD/zrv/kmL/0sH/gUX/2Mn/8er/VQD/mW7/vqb/3M//bhz/tpn/WwD/hk7/lWf/nHP/49j/oXv/eDP/ezj/sJH/xK7/qoj/6uH/jFj/TQAiXIJrAAAC2ElEQVR4nO3d6U7bQBSG4TmxA85QAl6CIQll6/1fY0MXVartiQM15jt939+j5DzyFiRsBzNrqk3w2GbbHHTB7C6Lc88yUbHcvgrv8rkHmbB2a6HJ5p5i0spdqLzuoj+L++DzJPOn+7kHmLzF3ANMHkL9EOqHUD+E+iHUD6F+CPVDqB9C/RDqh1A/hPoh1A+hfgj1Q6gfQv0Q6odQP4T6IdQPoX4I9fvvhXGSPob2q7QwFv++r+sitlmbf5QzLcxsoq6bugrZKcrkKKnbDWYS/ui5Xmej7/XIlsMfdPZZhYeuH+JIo6rw0GMYZRQWmtVjjkdpoS2r43cmaQvNro5uRnWhna2PHI3yQrN9611oN8mD0YPQ6tK70OrEpD6E9jR8LDoR2svgRcOL0BZDRDfC56Fh3QjtZuDK70doRf9+6kg48HwAR8KB86knYf/JxpOwfyO6EjZ9v2xcCW3TsxF9Cfuuib6EfecaX8K+3XQG4fLq9HbP44RPn0K4+taeXpbd1olRf3fZPRDnEL7t6Usxz56OCns+W0d4KA+7Y8TPsZe+/Qlasbw8IrztELWEIZRXaeFeXhjaVVLYvebLCeNtUljrC0PWpIQXDoTxxbswlGfehfmFe+GDd2Gs3Au/IESIcAJhng3X+SmtKMwfV9dDrdZ/EyWFqb/6ECJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoS27ApTDyzpCu8Sq7sPGTptlNHCeJ6oe1dokVjd/aJFYnXxzlFGC5PvKHnv6tTyd48yWugghPoh1A+hfgj1Q6gfQv0Q6odQP4T6IdQPoX4I9UOoH0L9EOqHUD+E+iHUD6F+CPVDqB9C/RDqh1C/RdjMPcLE3Ydt8n+I5Yv70JRzDzFp5S5Y1feydi+1ewtmVel1R43l3l6FttsWC48V+9dXK38HKIt22ECEX0YAAAAASUVORK5CYII=',
        reviewsCount: 22,
        questionCount: 12,
      },
      price: {
        value: '7 400 000 UZS',
        old: '8 800 000 UZS',
      },
      buyInfo: [],
    };
  },
};
</script>
