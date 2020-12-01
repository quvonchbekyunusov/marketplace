<template>
  <div>
    <ul>
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="inline-flex w-40 py-3 justify-center items-center cursor-pointer"
        :class="[activeTab == tab ? activeClass : '', hoverClass]"
        @click="switchTab(tab)"
      >
        <slot :name="tabHeadSlotName(tab)">
          {{ tab }}
        </slot>
      </li>
    </ul>
    <div>
      <slot :name="tabPanelSlotName" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  model: {
    prop: 'value',
    event: 'tabChange',
  },
  props: {
    tabs: VueTypes.array,
    value: VueTypes.string,
  },
  data() {
    return {
      activeTab: this.value,
      hoverClass: 'hover:bg-primary-500 hover:text-white',
      activeClass: 'bg-primary-500 text-white',
    };
  },
  computed: {
    tabPanelSlotName() {
      return `tab-panel-${this.activeTab}`;
    },
  },
  methods: {
    tabHeadSlotName(tabName) {
      return `tab-head-${tabName}`;
    },
    switchTab(tabName) {
      this.activeTab = tabName;
      this.$emit('tabChange', this.activeTab);
    },
  },
};
</script>
