<template>
  <ui-page>
    <header>
      <nav class="text-sm bg-gray-100">
        <ui-container class="flex items-center justify-between py-3">
          <a
            class="
              bg-gray-500
              rounded-2xl
              px-3
              py-1
              text-white
              mr-5
              hover:bg-primary-500
              transition-colors
              duration-200
            "
            href="#"
          >
            Мобильное приложение
          </a>

          <ui-list :items="deepHeader.links" :gap="8">
            <template #item="{ value }">
              <a
                class="text-gray-600 hover:text-primary-500 transition-colors duration-200"
                href="#"
              >
                {{ value }}
              </a>
            </template>
          </ui-list>

          <button class="ml-5 flex items-center px-3 py-2 bg-white rounded shadow">
            <ui-country-flag class="mr-2" country="uz" />
            |
            <span class="mx-2">Русский</span>
            |
            <span class="mx-2">UZS</span>
            <span class="fas fa-chevron-down" />
          </button>
        </ui-container>
      </nav>

      <nav>
        <ui-container class="flex items-center">
          <a class="mr-10" href="/"><img :src="logo" alt="Logo"></a>

          <button class="mr-12">
            <ui-icon name="bars" variant="light" />
            Каталог
          </button>

          <form>
            <input type="search" placeholder="Поиск">
            <button type="submit">
              Поиск
            </button>
          </form>

          <ui-list :items="header.links" :identifier="['variant', 'name']">
            <template #item="{ value }">
              <ui-icon v-bind="value.icon" />
            </template>
          </ui-list>
        </ui-container>
      </nav>
    </header>
  </ui-page>
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
  name: 'IndexPage',
  computed: {
    logo: () => logo,
    deepHeader: () => ({
      links: ['Пункты выдачи', 'Подарочные сертификаты', 'Доставка', 'Партнерам', 'Постоматы', 'Помощь'],
    }),
    header: () => ({
      links: [
        {
          icon: {
            variant: 'light',
            name: 'shopping-cart',
          },
        },
        {
          icon: {
            variant: 'light',
            name: 'bell',
          },
        },
        {
          icon: {
            variant: 'light',
            name: 'heart',
          },
        },
        {
          icon: {
            variant: 'light',
            name: 'box',
          },
        },
        {
          icon: {
            variant: 'light',
            name: 'user',
          },
        },
      ],
    }),
  },
};
</script>
