<template id="temp-demo">
  <div class="temp-demo ">
    <div
      v-for="(mb, index) in allMagazine"
      :key="mb.id"
      class="v-carausel"
    >
<!--      <transition :name="dir">-->
<!--      v-if="(index>=firstIndex) && (index<=secondIndex)"-->
        <div
          v-if="(index>=firstIndex) && (index<=secondIndex)"
          style="width: 350px; height: 329px"
          class="bg-gray-100 rounded mr-4"
        >
          <div class="ml-4 pt-4">
            <div class="inline-block">
              <img :src="mb.logo" style="height: 60px; width: 60px" class="bg-white rounded">
            </div>
            <div class="inline-block absolute ml-4">
              <h1 class="font-bold ">
                {{ mb.name }}
              </h1>
              <p>{{ mb.title }}</p>
            </div>
          </div>
          <div class="ml-4 mt-3">
            <div class="inline-block">
              <img :src="mb.src1" style="width: 199px; height: 224px;" class="bg-white rounded">
            </div>
            <div class="inline-block float-right">
              <div style="width: 106px; height: 105px" class="bg-white rounded mr-3">
                <img :src="mb.src2" style="height: 105px; height: 106px" class="bg-white rounded">
              </div>
              <div style="width: 106px; height: 105px" class="bg-white rounded mt-3">
                <img :src="mb.src3" style="height: 105px; height: 106px" class="bg-white rounded">
              </div>
            </div>
          </div>
        </div>
<!--      </transition>-->
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  data() {
    return {
      currentShow: 3,
    };
  },
  methods: {
  },
  props: {
    firstIndex: VueTypes.number.def(0),
    secondIndex: VueTypes.number.def(2),
    next: VueTypes.number.def(3),
    back: VueTypes.boolean,
    dir: VueTypes.string.isRequired,
    allMagazine: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.number,
        logo: VueTypes.string.isRequired,
        name: VueTypes.string.isRequired,
        title: VueTypes.string.isRequired,
        src1: VueTypes.string.isRequired,
        src2: VueTypes.string.isRequired,
        src3: VueTypes.string.isRequired,
      }),
    ).isRequired,
  },
};
</script>

<style scoped>
  .slide-card {
  }
  .slide-left-enter-active {
    animation: slide-left-in 1s ease-in;
  }
  .slide-left-leave-active {
    animation: slide-left-out 1s ease-in;
  }
  @keyframes slide-left-in{
    from  { transform: translateX(-100%);}
    to { transform: translateX(0);}
  }
  @keyframes slide-left-out{
    from  { transform: translateX(0%);}
    to { transform: translateX(100%);}
  }

  .slide-right-enter-active {
    animation: slide-right-in 1s ease-in;
  }
  .slide-right-leave-active {
    animation: slide-right-out 1s ease-in;
  }
  @keyframes slide-right-out{
    from  { transform: translateX(0%);}
    to { transform: translateX(-100%);}
  }
  @keyframes slide-right-in{
    from  { transform: translateX(100%);}
    to { transform: translateX(0);}
  }
  /*.temp-demo {*/
  /*  overflow: hidden;*/
  /*}*/
  /*#demo {*/
  /*  overflow: hidden;*/
  /*}*/
  /*.slide-leave-active,*/
  /*.slide-enter-active {*/
  /*  transition: 1s;*/
  /*}*/
  /*.slide-enter {*/
  /*  transform: translate(100%, 0);*/
  /*}*/
  /*.slide-leave-to {*/
  /*  transform: translate(-100%, 0);*/
  /*}*/
  /*.slideback-leave-active,*/
  /*.slideback-enter-active {*/
  /*  transition: 1s;*/
  /*}*/
  /*.slideback-enter {*/
  /*  transform: translate(-100%, 0);*/
  /*}*/
  /*.slideback-leave-to {*/
  /*  transform: translate(100%, 0);*/
  /*}*/
  /*.div-slider{*/
  /*  overflow: hidden;*/
  /*  position: relative;*/
  /*  height: 100px;*/
  /*  width: 90%;*/
  /*}*/
  /*.div-slider .card {*/
  /*  position: absolute;*/
  /*  height: 100px;*/
  /*  width: 90%;*/
  /*  background-color: #60adff;*/
  /*}*/
</style>
