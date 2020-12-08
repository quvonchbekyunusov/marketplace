<template>
  <div>
    <ZBlock :blockArr='blockArr' class="inline-block p-2"></ZBlock>
    <ZBlock :blockArr='blockArr' class="inline-block p-2"></ZBlock>
    <ZBreadCrumbs :links="arr" />
    <div class="flex justify-center bg-primary-400">
      <div class="text-white px-4 py-2 m-2">
        <label>Наведите камеру <br> на Qr-код, чтобы скачать</label>
      </div>
      <div class=" text-center  px-4 py-2 m-2">
        <ZFooterGooglPlay src="images/google-play.svg" :to="{ name: 'home' }" />
      </div>
      <div class="text-center  px-4 py-2 m-2">
        <ZFooterAppStore src="images/app-store.svg" :to="{ name: 'home' }" />
      </div>
      <div class=" text-center  px-4 py-2 m-2 relative custom-phoneqr">
        <ZPhoneQr src="images/phone-qr.svg" :to="{ name: 'home' }" />
      </div>
    </div>
    <!-- second layer of footer -->
    <div class="flex justify-center bg-gray-100">
      <!-- Part 1 -->
      <div>
        <div class="my-10 part1-div1">
          <label class="text-gray-450 text-2xl text-gray-900">Подпишитесь на нашу <br>
            рассылку</label>
        </div>
        <div>
          <input
            style="color: #828282"
            type="email"
            placeholder="Electron address"
            class="rounded-none h-12 custom_input_border bg-gray-100 focus:outline-none
            sm:border-b border-primary-600"
          >
          <button
            class="rounded-t-lg bg-primary-600 h-12 w-12 text-white custom_btn-border focus:outline-none"
          >
            >
          </button>
        </div>
        <div class="my-16 custom-footer">
          <label class="text-gray-600">OOO "ZetSoft" 2020</label>
          <p class="text-gray-500">
            &#169; 2020 MarketPlace.
          </p>
        </div>
      </div>
      <!-- Part 2 -->
      <div class=" flex justify-center  my-10 ">
        <div class="px-2 py-2 ">
          <label class="text-xl text-gray-900">Обратная связь</label>
          <ul class="mt-8">
            <li class="mb-2 text-gray-700">
              Мои заказы
            </li>
            <li class="mb-2 text-gray-700">
              Доставка
            </li>
            <li class="mb-2 text-gray-700">
              О сервисе
            </li>
            <li class="mb-2 text-gray-700">
              Партнерам
            </li>
            <li class="mb-2 text-gray-700">
              Настройки
            </li>
          </ul>
        </div>
        <div class="px-2 py-2 ">
          <label class="text-xl text-gray-900">Как купить</label>
          <ul class="mt-8">
            <li class="mb-2 text-gray-700">
              Оплата
            </li>
            <li class="mb-2 text-gray-700">
              Возврат
            </li>
            <li class="mb-2 text-gray-700">
              Помощь
            </li>
          </ul>
        </div>
      </div>
      <!-- Part 3 -->
      <div class=" flex justify-center  my-10">
        <div class="px-2 py-2 mx-4">
          <label class="text-xl text-gray-900">Мы принимаем</label>
          <div class="grid grid-cols-2 my-8">
            <div class="p-1">
              <img src="images/logo-visa.svg">
            </div>
            <div class="p-1">
              <img src="images/logo-uzcard.svg">
            </div>
            <div class="p-1">
              <img src="images/logo-payme.svg">
            </div>
            <div class="p-1">
              <img src="images/logo-click.svg">
            </div>
          </div>
        </div>
        <div class="px-2 py-2 mx-4">
          <label class="text-xl text-gray-900">Наши контакты</label>
          <ul class="mt-8">
            <li class="mb-2 text-gray-700">
              +998 (99) 123 56 67
            </li>
            <li class="mb-2 text-gray-700">
              +998 (99) 123 56 67
            </li>
            <li class="mb-2 text-gray-700">
              info@marketplace.uz
            </li>
          </ul>
          <div class="grid grid-cols-4 my-8">
            <div><img src="images/logo-telegram.svg"></div>
            <div><img src="images/logo-facebook.svg"></div>
            <div><img src="images/logo-wk.svg"></div>
            <div><img src="images/logo-instagram.svg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZFooterGooglPlay from '@/components/ZFooter_google_play';
import ZFooterAppStore from '@/components/ZFooterAppStore';
import ZPhoneQr from '@/components/ZPhoneQr';
import ZBreadCrumbs from '@/components/ZBreadCrumbs';
import ZBlock from '@/components/ZBlock';

export default {
  components: {
    ZFooterGooglPlay,
    ZFooterAppStore,
    ZPhoneQr,
    ZBreadCrumbs,
    ZBlock,
  },
  data() {
    return {
      arrRating: [
        { fiveStar: 200, fourStar: 100, threeStar: 60, twoStar: 12, oneStar: 4 },
      ],
      review: [
        {
          user: {
            avatar: 'http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png',
            name: 'Долганова Светлана',
          },
          date: {
            day: 9,
            month: 'Oktober',
            year: 1996,
          },
          rating: 3.7,
          body: 'Затрудняюсь вынести адекватную оценку товару, так как стекло продержалось меньше недели.',
        },
      ],
      dataList: [
        {
          id: 1,
          src: 'https://gilmanlabs.com/wp-content/uploads/2017/02/OGMOGH0.jpg',
          title: 'Смартфон Xiaomi RedmiNote 9 4/128GB, Чёрный...',
          logo: 'https://logodownload.org/wp-content/uploads/2015/02/xiaomi-logo.png',
          logoTitle: 'Xiaomi',
        },
      ],
      seasonalProduct: [
        {
          id: 1,
          src: 'https://gilmanlabs.com/wp-content/uploads/2017/02/OGMOGH0.jpg',
          name: 'Dolphin',
          title: 'Цветные карандаши',
          rate: 4,
          description: 'Яркие и масленные карандаши, 24шт. в коробке',
          price: 250000,
        },
      ],
      allMagazine: [
        {
          id: 1,
          logo: 'https://im0-tub-com.yandex.net/i?id=8a2127c9fc9ce6adb000c7865545a0be&n=13',
          name: 'Mplace1',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://img.pngio.com/png-mobile-phone-transparent-mobile-phonepng-images-pluspng-cell-phone-pngs-hd-1024_1024.png',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://cdn.pixabay.com/photo/2012/04/18/20/54/iphone-37856_1280.png',
        },
        {
          id: 2,
          logo: 'https://xn--f1afgckh7i.xn--p1ai/wp-content/uploads/2017/09/Fiolent1.jpg',
          name: 'Mplace2',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://a.d-cd.net/8850449s-1920.jpg',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://i.pinimg.com/originals/cf/76/0c/cf760cf754726c29b3f933f5a6acee0b.jpg',
        },
        {
          id: 3,
          logo: 'https://im0-tub-com.yandex.net/i?id=8a2127c9fc9ce6adb000c7865545a0be&n=13',
          name: 'Mplace3',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://img.pngio.com/png-mobile-phone-transparent-mobile-phonepng-images-pluspng-cell-phone-pngs-hd-1024_1024.png',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://cdn.pixabay.com/photo/2012/04/18/20/54/iphone-37856_1280.png',
        },
        {
          id: 4,
          logo: 'https://xn--f1afgckh7i.xn--p1ai/wp-content/uploads/2017/09/Fiolent1.jpg',
          name: 'Mplace4',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://a.d-cd.net/8850449s-1920.jpg',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://i.pinimg.com/originals/cf/76/0c/cf760cf754726c29b3f933f5a6acee0b.jpg',
        },
        {
          id: 5,
          logo: 'https://im0-tub-com.yandex.net/i?id=8a2127c9fc9ce6adb000c7865545a0be&n=13',
          name: 'Mplace5',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://img.pngio.com/png-mobile-phone-transparent-mobile-phonepng-images-pluspng-cell-phone-pngs-hd-1024_1024.png',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://cdn.pixabay.com/photo/2012/04/18/20/54/iphone-37856_1280.png',
        },
        {
          id: 6,
          logo: 'https://xn--f1afgckh7i.xn--p1ai/wp-content/uploads/2017/09/Fiolent1.jpg',
          name: 'Mplace6',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://a.d-cd.net/8850449s-1920.jpg',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://i.pinimg.com/originals/cf/76/0c/cf760cf754726c29b3f933f5a6acee0b.jpg',
        },
        {
          id: 7,
          logo: 'https://im0-tub-com.yandex.net/i?id=8a2127c9fc9ce6adb000c7865545a0be&n=13',
          name: 'Mplace7',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://img.pngio.com/png-mobile-phone-transparent-mobile-phonepng-images-pluspng-cell-phone-pngs-hd-1024_1024.png',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://cdn.pixabay.com/photo/2012/04/18/20/54/iphone-37856_1280.png',
        },
        {
          id: 8,
          logo: 'https://xn--f1afgckh7i.xn--p1ai/wp-content/uploads/2017/09/Fiolent1.jpg',
          name: 'Mplace8',
          title: 'Защита экрана №1 в Мире',
          src1: 'https://a.d-cd.net/8850449s-1920.jpg',
          src2: 'https://pixfeeds.com/images/technology/phones/1280-177435934-mobile-smartphone-with-applications.jpg',
          src3: 'https://i.pinimg.com/originals/cf/76/0c/cf760cf754726c29b3f933f5a6acee0b.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped>
  .custom-phoneqr {
    margin-top: -450px;
    margin-bottom: -100px;
  }
</style>
