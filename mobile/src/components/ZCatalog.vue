<template>
  <div class="row no-wrap full-width">
    <ul class="tabs col-grow col-shrink fit bg-grey-1">
      <q-scroll-area class="tabs-scroller" :thumb-style="thumbStyle">
        <li
          v-for="{ id, icon, name } in grandCategories"
          :key="id"
          v-ripple
          :class="['tab', { 'is-active': id === activeCategory }]"
          @click="selectCategory(id)"
        >
          <q-responsive :ratio="8 / 7" class="full-width">
            <div class="grand-daddy-category">
              <q-icon :name="icon" size="sm" />
              <span class="grand-daddy-category-label">{{ name }}</span>
            </div>
          </q-responsive>
        </li>
      </q-scroll-area>
    </ul>

    <ul class="tab-panels">
      <q-scroll-area
        class="fit"
        :content-style="{ width: '100%', height: '100%', padding: '16px' }"
        :thumb-style="thumbStyle"
      >
        <q-inner-loading v-if="isLoading" size="md" color="primary" :showing="isLoading" />
        <ul v-else>
          <li
            v-for="{ id, name, subcategories } in daddyCategories"
            :key="id"
            class="daddy-category"
          >
            <h6 class="text-subtitle2 q-mb-sm">
              {{ name }}
            </h6>

            <ul class="row q-col-gutter-sm">
              <li
                v-for="{ id: childId, name: childName, icon, image } in subcategories"
                :key="childId"
                class="col-4"
              >
                <router-link v-ripple class="child-category block" :to="{ name: 'category', params: { id: childId } }">
                  <q-responsive :ratio="1">
                    <q-icon
                      class="child-category-icon"
                      :name="icon || `img:${image}`"
                      size="md"
                    />
                  </q-responsive>
                  <span class="child-category-label ellipsis-2-lines">
                    {{ childName }}
                  </span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </q-scroll-area>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZCatalog',
  props: {
    grandCategories: VueTypes.arrayOf(VueTypes.category).isRequired,
    fetchCategory: VueTypes.func.isRequired,
  },
  constants: {
    thumbStyle: {
      display: 'none',
    },
  },
  data() {
    return {
      activeCategory: null,
      daddyCategories: null,
      isLoading: false,
    };
  },
  created() {
    if (this.grandCategories.length) {
      this.selectCategory(this.grandCategories[0].id);
    }
  },
  methods: {
    async selectCategory(categoryId) {
      this.isLoading = true;
      this.activeCategory = categoryId;
      this.daddyCategories = await this.fetchCategory(categoryId);
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .tabs {
    min-width: 80px;
    max-width: 90px;
  }

  .tabs-scroller {
    width: 90px;
    overflow: hidden;
    height: 100%;
  }

  .tab {
    position: relative;

    &.is-active {
      background-color: #ffffff;
    }
  }

  .tab-panels {
    flex: 1;
    height: 100%;
  }

  .grand-daddy-category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8px;
    color: $grey-7;
    border-top: 1px solid #e7e7e7;
    border-left: 3px solid transparent;

    &-label {
      font-size: 10px;
      margin-top: 4px;
    }

    .is-active & {
      color: $primary;
      border-left: 3px solid $primary;
    }
  }

  .daddy-category {
    margin-bottom: 32px;
  }

  .child-category {
    position: relative;
    text-align: center;

    &-icon {
      background-color: $grey-2;
      border-radius: $generic-border-radius;
    }

    &-label {
      margin-top: 4px;
      margin-bottom: 4px;
      font-size: 10px;
    }
  }
</style>
