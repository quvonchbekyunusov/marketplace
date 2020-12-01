<template>
  <!-- //start |Doniyor Raxmonov| 2020-10-29 -->
  <div class="cl">
    <q-card class="wrapper shadow">
      <q-card-section>
        <!--        <json-printer :value="displayedCharacteristics" />-->
        <div v-for="characteristic in displayedCharacteristics" :key="characteristic.id" class="row justify-between">
          <div class="col title">
            {{ characteristic.type.name }}
          </div>
          <q-separator vertical />
          <div class="col body q-ml-lg">
            {{ characteristic.name }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div v-if="isCollapsible" class="row q-ml-sm">
      <div class="col card_footer q-mt-md" @click="toggleExpandedState">
        {{ collapseBtnText }}
      </div>
    </div>
  </div>
</template>
<!-- //end |Doniyor Raxmonov | 2020-10-29-->
<script>
import VueTypes from 'vue-types';
// import { groupBy, uniqBy, map, find } from 'lodash-es';
// start  | Doniyor Raxmonov | 2020-10-29

export default {
  name: 'ZCharacteristicsCard',
  props: {
    options: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    characteristics() {
      return this.options;
    },

    isCollapsible() {
      return this.characteristics.length > 6;
    },

    collapseBtnText() {
      return this.isExpanded ? 'Свернуть' : 'Подробнее';
    },

    displayedCharacteristics() {
      if (this.isExpanded) {
        return this.characteristics;
      }
      return this.characteristics.slice(0, 6);
    },
  },
  watch: {
    options: {
      handler() {
      },
      immediate: true,
    },
    characteristics: {
      handler() {
      },
      immediate: true,
    },
  },
  methods: {
    toggleExpandedState() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
// end  | Doniyor Raxmonov | 2020-10-29
</script>

<style lang="scss" scoped>
  /*  //start |Doniyor Raxmonov| 2020-10-29 */
  .card_footer {
    color: #0FBF00;
    cursor: pointer;
  }

  .title, .body {
    font-size: 11px;
    line-height: 13px;
    color: #333333;
    margin-bottom: 14px;
  }

  .title {
    color: #666666;
  }

  .wrapper {
    background: #FFFFFF;
    box-sizing: border-box;
  }

  /*  //end |Doniyor Raxmonov| 2020-10-29 */
</style>
