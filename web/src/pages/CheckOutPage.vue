<template>
  <div>
    <z-image-gallery :images="images" />
  </div>
</template>

<script>
import ZImageGallery from '@/components/ZImageGallery';

export default {
  name: 'CheckOutPage',
  components: {
    ZImageGallery,
  },
  data() {
    return {
      images: [
        '/images/sm1.jpg',
        '/images/sm2.jpg',
        '/images/sm3.jpg',
        '/images/sm4.jpg',
        '/images/sm5.jpg',
        '/images/sm6.jpg',
      ],
    };
  },
};
</script>
