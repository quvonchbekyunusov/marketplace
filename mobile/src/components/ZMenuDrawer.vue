<template>
  <q-drawer :value="isOpen" content-class="shadow-2 bg-grey-2" @show="open" @hide="close">
    <q-scroll-area class="fit">
      <div v-if="isLoading" class="row justify-center">
        <q-spinner color="primary" size="lg" />
      </div>
      <q-list v-else>
        <ZLogo class="flex justify-center q-mt-sm" />
        <z-menu-category v-for="category in categories" :key="category.id" :category="category" />
        <q-list class="fixed-bottom flex justify-center q-mb-sm text-caption text-grey">
          &copy; Copyright, Zetsoft 2020
        </q-list>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@common/api';
import ZMenuCategory from '@/components/ZMenuCategory';
import ZLogo from '@/components/ZLogo';

export default {
  name: 'ZMobileMenu',
  components: {
    ZMenuCategory,
    ZLogo,
  },
  data() {
    return {
      isLoading: true,
      categories: null,
    };
  },
  computed: mapGetters('drawer', ['isOpen']),
  async created() {
    this.categories = (await api.categories.all()).filter(({ level }) => level === 1);
    this.isLoading = false;
  },
  methods: mapActions('drawer', ['open', 'close']),
};
</script>
