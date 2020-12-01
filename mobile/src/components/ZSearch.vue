<template>
  <div>
    <q-input
      type="search"
      :value="outInnerVal"
      :v-model="outInnerVal"
      dense
      color="primary"
      placeholder="Поиск..."
      borderless
      @input="$emit('input', $event)"
      @click="focused = true"
    >
      <template v-slot:prepend>
        <slot name="prepend" />
      </template>
      <template v-slot:append>
        <slot name="append" />
      </template>
    </q-input>

    <q-dialog
      v-model="focused"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
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
            >
              <template v-slot:prepend>
                <q-icon name="o_close" @click="focused = false" />
              </template>
            </q-input>
          </q-form>
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
import api from '@common/api';
import { mapGetters } from 'vuex';
import VueTypes from 'vue-types';
import { debounce } from 'quasar';
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
      fetchProducts: {},
      queryForLog: [],
      outInnerVal: '',
      icon,
    };
  },
  computed: {
    ...mapGetters('search', { getQueries: 'getQueries' }),
  },
  watch: {
    queryForLog() {
      if (this.queryForLog.length !== 0) {
        this.isLoading = false;
      }
    },
    outInnerVal(val) {
      this.inputVal = val;
    },
    inputVal(val) {
      if (val) {
        this.queriesArr = this.getQueries.filter(
          (e) => e.toUpperCase().startsWith(val.toUpperCase()),
        );
      } else if (val === '' && !this.queryForLog.length) {
        this.queriesArr = this.getQueries;
      }
      this.outInnerVal = val;
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
      let { data: array } = await api.all('product');
      array = array.map((e) => e.name);
      return array;
    },
    searchHandler(val) {
      if (!val.trim()) return;
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

  .search_icon {
    position: absolute;
    top: .5rem;
    left: -15%;
  }

  .closeBtn {
    position: absolute;
    top: 10%;
    right: 5%;
  }
</style>
