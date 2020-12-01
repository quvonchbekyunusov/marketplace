<template>
  <!-- start|AzimjonToirov|10/20/2020 -->
  <div>
    <z-nav-bar-header class="w-full" />
    <div
      id="nav"
      class="
      flex items-center
      md:container
      mx-auto py-3"
    >
      <div class="w-1/4 flex justify-between">
        <z-logo src="images/logo.svg" :to="{ name: 'home' }" />
        <z-button
          title="Каталог"
          icon="fas fa-align-left mr-2"
          class="py-2 text-white w-32 mr-8"
          bg-color="primary-500"
        />
      </div>
      <div class="w-2/4">
        <z-search />
      </div>
      <div class="w-1/4">
        <z-navbar-links :links="links" />
      </div>
    </div>
  </div>
  <!-- end|AzimjonToirov|10/20/2020 7lines -->
</template>

<script>
/* start|AzimjonToirov|10/20/2020 */
import ZLogo from '@/components/ZLogo';
import ZNavbarLinks from '@/components/ZNavbarLinks';
import ZNavBarHeader from '@/components/ZNavBarHeader';
import ZSearch from '@/components/ZSearch';
import ZButton from '@/components/ZButton';

export default {
  name: 'ZNavbar',
  components: {
    ZLogo,
    ZSearch,
    ZNavbarLinks,
    ZButton,
    ZNavBarHeader,
  },
  data() {
    return {
      links: [
        {
          id: 0,
          to: 'cart',
          icon: 'fal fa-shopping-cart',
        },
        {
          id: 1,
          to: 'about',
          icon: 'fal fa-bell',
        },
        {
          id: 2,
          to: 'wishlist',
          icon: 'fal fa-heart',
        },
        {
          id: 3,
          to: 'profile',
          icon: 'fal fa-cube',
        },
        {
          id: 4,
          to: 'profile',
          icon: 'fal fa-user',
        },
      ],
    };
  },
  computed: {
    isMobile() {
      return console.log('mobile');
    },
  },
};
/* end|AzimjonToirov|10/20/2020 15lines */
</script>
<style scoped>
  .z-primary {
    background-color: #3377FF;
  }
</style>
