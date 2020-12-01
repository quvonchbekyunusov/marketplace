<template>
  <!-- //start |Doniyor Raxmonov| 2020-10-29 -->
  <div>
    <div class="flex no-wrap q-mb-sm q-mt-md">
      <button :class="{clicked:descIsActive}" class="btn" @click="toggle('description')">
        Описание
      </button>
      <button :class="{clicked: charactsIsActive}" class="btn" @click="toggle('characts')">
        Характеристики
      </button>
    </div>
    <div class="full-width">
      <div v-show="charactsIsActive">
        <z-characteristics-card :options="options" />
      </div>
      <div v-show="descIsActive">
        <z-description-card :description="description" />
      </div>
    </div>
  </div>
</template>
<!-- //end |Doniyor Raxmonov | 2020-10-29-->
<script>
// start  | Doniyor Raxmonov | 2020-10-29

import VueTypes from 'vue-types';
import ZCharacteristicsCard from './ZCharacteristicCard';
import ZDescriptionCard from './ZDescriptionCard';

export default {
  name: 'ZCharactAndDescriptionTab',
  components: { ZDescriptionCard, ZCharacteristicsCard },
  props: {
    options: VueTypes.arrayOf(VueTypes.object),
    description: VueTypes.string,
  },
  data() {
    return {
      descIsActive: true,
      charactsIsActive: false,
    };
  },
  methods: {
    toggle(type) {
      if (type === 'characts') {
        this.charactsIsActive = true;
        this.descIsActive = false;
      } else {
        this.descIsActive = true;
        this.charactsIsActive = false;
      }
    },
  },
};
// end  | Doniyor Raxmonov | 2020-10-29
</script>

<style scoped>
  /*  //start |Doniyor Raxmonov| 2020-10-29 */

  .btn {
    outline: none;
    background: #fff;
    border: transparent;
    color: #333333;
    font-size: 14px;
    line-height: 16px;
    padding-bottom: 10px;
    width: 50%;
  }

  .clicked {
    color: #27AE60;
    border-radius: 2px;
    border-bottom: 2px solid #27AE60;;
  }

  /* //end | Doniyor Raxmonov|  */
</style>
