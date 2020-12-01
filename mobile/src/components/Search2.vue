<template>
  <div>
    <q-input
      :value="value"
      type="search"
      dense
      color="primary"
      placeholder="Поиск..."
      borderless
      class="shadow-1 input fa-border q-pl-md"
      @input="$emit('input', $event)"
      @click="focused = true"
    >
      <template v-slot:append>
        <q-btn
          padding="0"
          icon="o_camera_alt"
          flat
          size="md"
          round
          color="grey"
          @click="$devDialog.show()"
        />
        <q-btn class="" padding="0" icon="mic" flat size="md" round color="grey" @click="$devDialog.show()" />
      </template>
    </q-input>

    <q-dialog
      v-model="focused"
      persistent
      :maximized="true"
      transition-show="fade"
      transition-hide="fade"
    >
      <div class="bg-white">
        <div class="relative-position">
          <q-form @submit.prevent="searchHandler(inputVal)">
            <q-input
              v-model="inputVal"
              type="search"
              dense
              placeholder="Поиск..."
              borderless
              class="shadow-1 input q-px-md q-ma-md q-pl-md"
              autofocus
              @input="handlerForDbounce($event)"
            />
          </q-form>
          <q-btn dense flat icon="close" class="closeBtn no-shadow" @click="focused = false" />
        </div>
        <q-spinner
          v-if="isLoading"
          color="primary"
          size="3em"
          class="spinner"
        />
        <span v-if="noResult" class="q-mx-lg">
          Ничего не найдено
        </span>
        <q-item
          v-for="historyQuery in queriesArr "
          :key="historyQuery"
          class="flex items-center"
          :to="{ name: 'search', query: { q: historyQuery } }"
        >
          <q-icon color="grey-9" name="o_youtube_searched_for" class="" size="sm" />
          <i> <strong class="text-grey-9 q-ml-sm"> {{ historyQuery }}</strong></i>
        </q-item>
        <q-item
          v-for="query in queryForLog"
          :key="query"
          :to="{ name: 'search', query: { q: query } }"
          class=""
        >
          <q-icon name="o_search" class="q-mr-sm" size="sm" />
          {{ query }}
        </q-item>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { debounce } from 'quasar';
import api from '@common/api';
import { mapGetters } from 'vuex';
import icon from '@/assets/historyIcon.svg';

export default {
  name: 'ZSearch',
  props: {
    value: VueTypes.string.def(''),
  },
  data() {
    return {
      focused: false,
      isLoading: false,
      inputVal: null,
      noResult: false,
      queriesArr: [],
      queryForLog: [],
      icon,
    };
  },
  computed: {
    ...mapGetters('search', { getQueries: 'getQueries' }),
    filteredQuerues() {
      return this.getQueries.filter((e) => e.toUpperCase().startsWith(this.inputVal.toUpperCase()));
    },
  },
  watch: {
    queryForLog() {
      if (this.queryForLog.length !== 0) {
        this.isLoading = false;
      }
    },
    inputVal(val) {
      if (val) {
        this.queriesArr = this.getQueries.filter((e) => e.toUpperCase().startsWith(val.toUpperCase()));
      } else if (val === '' && !this.queryForLog.length) {
        this.queriesArr = this.getQueries;
      }
    },
    queriesArr() {
      return this.queriesArr;
    },
  },
  created() {
    this.handlerForDbounce = debounce(this.handlerForDbounce, 500);
    this.queriesArr = this.getQueries;
  },
  methods: {
    handlerForDbounce(val) {
      this.isLoading = true;
      this.noResult = false;
      this.debounceLoad().then((response) => {
        this.queryForLog = response.filter((e) => e.toUpperCase().startsWith(val.toUpperCase()));
        if (!this.queryForLog.length) {
          this.isLoading = false;
          this.noResult = true;
        }
        if (!this.inputVal) {
          this.queryForLog = [];
          this.isLoading = false;
        }
      });
    },
    async debounceLoad() {
      let array = await api.products.all();
      array = array.map((e) => e.name);
      return array;
    },
    searchHandler(val) {
      this.$store.dispatch('search/setQuery', val);
      this.$router.push({ name: 'search', query: { q: val } });
    },

  },

};
</script>
<style scoped>
  .input {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }

  .spinner {
    margin-left: calc(50% - 1.5em);
  }

  .closeBtn {
    position: absolute;
    top: 10%;
    right: 5%;
  }
</style>
