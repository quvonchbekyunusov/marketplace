<template>
  <ui-card>
    <template v-slot:section>
      <div>
        <ui-img
          src="/images/laptop%201.png"
        />
      </div>
      <div class="px-4">
        <div class="flex justify-between">
          <p>250.000</p>
        </div>
        <div>
          <p class="description text-sm m-0 text-left">
            Envelope, Stripes, Pencil and etc. Purchase this kit today and feel OKAY
          </p>
        </div>
        <div>
          <z-button
            class="ml-10"
            title="Download"
            size="small"
            icon="fa-shopping-cart"
            icon-position="right"
            border-color="primary-600"
            text-color="primary-600"
          />
        </div>
      </div>
    </template>
  </ui-card>
</template>

<script>
import UiCard from '@/components/ui/UiCard';
import UiImg from '@/components/ui/UiImg';
import ZButton from '@/components/ZButton';

export default {
  name: 'ZProductCard',
  components: {
    UiCard,
    UiImg,
    ZButton,
  },
};
</script>
