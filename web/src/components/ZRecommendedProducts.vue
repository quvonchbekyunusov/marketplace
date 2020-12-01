<template>
  <div class="flex flex-j">
    <div v-for="(block, index) in blockArr" :key="block.id" class="inline-block p-2">
      <ZBlock
        v-if="index>=first && index<=last"
        :blockArr="blockArr"
        :index="index"
        ></ZBlock>
    </div>
  </div>
</template>
<script>
import ZBlock from '@/components/ZBlock';

export default {
  components: { ZBlock },
  data() {
    return {
      first: 0,
      last: 6,
      blockArr: [
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '1The best product1',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '2The best product2',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '3The best product 3',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '4The best product 4',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '5The best product 5',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '6The best product 6',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '7The best product 7',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '8The best product 8',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '9The best product 9',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '10The best product 10',
        },
        {
          img: 'https://cms-assets.bookingexperts.nl/media/178/18/preprocessed.jpg',
          price: 20000,
          title: '11The best product 11',
        },

      ],
    };
  },
};
</script>
