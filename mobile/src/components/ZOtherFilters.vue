<template>
  <div>
    <div v-for="optionGroup in optionsGroup" :key="optionGroup.id" class="q-mb-lg">
      <p class="q-mt-sm q-ml-md q-mb-sm">
        {{ optionGroup.name }}
      </p>
      <div class="flex wrap justify-around q-mx-sm">
        <div
          v-for="option in optionGroup.options"
          :key="option.id"
          class="item text-center"
          :class="{ choosed : option.isSelected}"
          @click="onClick(optionGroup.id, option.id)"
        >
          <span class="itemName">{{ option.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { defaultTo } from 'lodash-es';

export default {
  name: 'ZOtherFilters',
  props: {
    optionsGroup: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
  data() {
    return {
      category: null,
      choosedOptions: {},
    };
  },
  watch: {
    optionsGroup: {
      immediate: true,
      handler(optionsGroup) {
        this.choosedOptions = Object.fromEntries(
          optionsGroup.map(({ id }) => [
            id,
            defaultTo(this.choosedOptions[id], []),
          ]),
        );
      },
    },
  },
  methods: {
    onClick(optionGroupId, optionId) {
      this.$emit('update:options-group', this.optionsGroup.map((optionGroup) => {
        if (optionGroup.id !== optionGroupId) {
          return optionGroup;
        }

        return {
          ...optionGroup,
          options: optionGroup.options.map((option) => {
            if (option.id !== optionId) {
              return option;
            }

            return ({
              ...option,
              isSelected: !option.isSelected,
            });
          }),
        };
      }));
    },
  },
};
</script>

<style scoped lang="scss">
  .item {
    width: 25%;
    border: 1px solid $primary;
    border-radius: 3px;
  }

  .choosed {
    background: $primary;

    span {
      color: #fff;
    }
  }

  .itemName {
    font-size: 12px;
    line-height: 14px;
    color: $primary;
  }

</style>
