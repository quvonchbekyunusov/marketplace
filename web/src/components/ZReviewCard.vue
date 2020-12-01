<template>
  <div class="flex w-full">
    <div class="w-20 h-20">
      <ui-img src="/images/avatar.png" :ratio="4/3" />
    </div>
  </div>
</template>

<script>
import UiImg from '@/components/ui/UiImg';

export default {
  name: 'ZReviewCard',
  components: {
    UiImg,
  },
};
</script>
