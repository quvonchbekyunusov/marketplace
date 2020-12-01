<template>
  <!-- start: Doniyor Raxmonov -->
  <div class="">
    <div v-for="optionGroup in optionGroups" :key="optionGroup.id">
      <p class="title q-ma-sm">
        {{ optionGroup.name }}
      </p>
      <div class="flex wrap">
        <div
          v-for="option in optionGroup.options"
          :key="option.id"
          :class="{
            clicked: choosedOptions.hasOwnProperty(optionGroup.id)
              && choosedOptions[optionGroup.id] === option.id
          }"
          class="option flex justify-center column q-mx-md q-mt-sm"
          @click="chooseOption(option.id,optionGroup.id)"
        >
          <div>
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end: Doniyor Raxmonov -->
</template>

<script>
// start : Doniyor Raxmonov
import VueTypes from 'vue-types';

export default {
  name: 'ZOptionsGroup',
  props: {
    optionGroups: VueTypes.arrayOf(VueTypes.object),
  },
  data() {
    return {
      choosedOptions: {},
    };
  },
  watch: {
    choosedOptions() {
      this.$emit('choosedOptions', (this.choosedOptions));
    },
    // start  | Doniyor Raxmonov | 2020-10-27
    optionGroups: {
      immediate: true,
      handler(val) {
        val.forEach((optionGroup) => {
          optionGroup.options.forEach((option) => {
            if (option.isSelected) {
              this.choosedOptions = {
                ...this.choosedOptions,
                [optionGroup.id]: option.id,
              };
            }
          });
        });
      },
      // end  | Doniyor Raxmonov | 2020-10-27
    },
  },
  created() {

  },
  methods: {
    chooseOption(optionId, optionGroupId) {
      if (this.choosedOptions.hasOwnProperty(optionGroupId) && this.choosedOptions[optionGroupId] === optionId) {
        return;
      }
      this.choosedOptions = {
        ...this.choosedOptions,
        [optionGroupId]: optionId,
      };
    },
  },
};
// end : Doniyor Raxmonov
</script>

<style scoped lang="scss">
  /*  start : Doniyor Raxmonov */
  .option {
    width: 62px;
    height: 30px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #333;
    text-align: center;
  }

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #333333;
  }

  .clicked {
    background: $primary;
    color: white;
    border: 1px solid #27AE60;
  }

  /* end : Doniyor Raxmonov*/
</style>
