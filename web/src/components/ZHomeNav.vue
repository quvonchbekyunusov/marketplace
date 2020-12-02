<template>
  <ul
    class="flex items-center justify-around md:container mx-auto py-3"
  >
    <li v-for="(item,index) in items" :key="index">
      <router-link class="text-gray-700" :to="item.link">
        {{ item.label }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ZHomeNav',
  data() {
    return {
      items: [
        {
          label: 'Бренды',
          link: 'something',
        },
        {
          label: 'Магазины',
          link: 'something',
        },
        {
          label: 'Сравнение',
          link: 'something',
        },
        {
          label: 'Красота',
          link: 'something',
        },
        {
          label: 'Спорт&Путишествие',
          link: 'something',
        },
        {
          label: 'Детям',
          link: 'something',
        },
        {
          label: 'Здоровье',
          link: 'something',
        },
        {
          label: 'Дом',
          link: 'something',
        },
        {
          label: 'Мужчинам',
          link: 'something',
        },
        {
          label: 'Женщинам',
          link: 'something',
        },
      ],
    };
  },
};
</script>
