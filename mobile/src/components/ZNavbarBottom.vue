<template>
  <q-footer class="bg-white" bordered>
    <q-list class="flex justify-around">
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center"
        active-class="is-active"
        :to="{ name: 'home' }"
      >
        <q-icon size="sm" name="fal fa-home" />
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center"
        active-class="is-active"
        :to="{ name: 'categories' }"
      >
        <q-icon size="sm" name="fal fa-layer-group" />
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center"
        active-class="is-active"
        :to="{ name: 'cart' }"
      >
        <q-icon size="sm" name="fal fa-shopping-cart" />
        <q-badge v-if="cartCount" color="primary" class="q-btn--rounded top-badge" floating>
          {{ cartCount }}
        </q-badge>
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center"
        active-class="is-active"
        :to="{ name: 'wishlist' }"
      >
        <q-icon size="sm" name="fal fa-heart" />
        <q-badge v-if="wishCount" color="primary" class="q-btn--rounded top-badge" floating>
          {{ wishCount }}
        </q-badge>
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center"
        active-class="is-active"
        :to="{ name: 'compare' }"
      >
        <q-icon size="sm" name="fal fa-chart-bar" />
        <q-badge v-if="compareCount" color="primary" class="q-btn--rounded top-badge" floating>
          {{ compareCount }}
        </q-badge>
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center"
        active-class="is-active"
        :to="{ name: 'profile' }"
      >
        <q-icon size="sm" name="fal fa-user" />
      </q-item>
    </q-list>
  </q-footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ZNavbarBottom',
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapGetters('wishlist', { wishCount: 'itemsCount' }),
    ...mapGetters('cart', { cartCount: 'itemsCount' }),
    ...mapGetters('compare', { compareCount: 'itemsCount' }),
  },
};
</script>

<style lang="scss" scoped>

  .top-badge {
    top: 10px;
    right: 2px;
  }

  .icon-color-grey {
    color: darkgray;
  }

  .nav-link {
    color: $grey;

    &.is-active {
      color: $primary;
    }
  }
</style>
