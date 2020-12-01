<template>
  <!--start: Makhmudov Mirfozil-->
  <div class="flex border border-primary-500 border-r-0 rounded-lg">
    <div class="w-24 flex justify-center items-center mx-1">
      <select class="outline-none p-1 bg-gray-400 rounded-md">
        <option value="select1">
          Везде
        </option>
        <option value="select2">
          select 2
        </option>
      </select>
    </div>
    <input v-model="query" class="outline-none w-10/12 px-2" type="text" placeholder="Поиск...">
    <button
      class="focus:outline-none flex justify-center bg-primary-500 rounded-r-md py-2 px-4 w-2/12"
    >
      <ui-icon name="search" class="text-white" />
    </button>
  </div>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import UiIcon from '@/components/ui/UiIcon';

export default {
  name: 'ZSearch',
  components: {
    UiIcon,
  },
  data() {
    return {
      query: '',
    };
  },
};
// end: Mirfozil Makhmudov
</script>
