import ZCharacteristicsCard from '@/components/ZCharacteristicCard';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZCharacteristicsCard, {
  options: [{
    title: 'Разрешение Видео',
    body: '1920x1080',
  }, {
    title: 'Формат сжатия',
    body: 'видеоH.264/MPEG-4',
  }, {
    title: 'Вес с упаковкой (кг)',
    body: '0.36 кг',
  }, {
    title: 'Стандарт видеокамеры',
    body: '10 м',
  }, {
    title: 'Комплектация',
    body: '0.21 кгг',
  }, {
    title: 'Страна бренда',
    body: 'Россия',
  }, {
    title: 'Разрешение Видео',
    body: '1920x1080',
  }, {
    title: 'Формат сжатия',
    body: 'видеоH.264/MPEG-4',
  }, {
    title: 'Вес с упаковкой (кг)',
    body: '0.36 кг',
  }, {
    title: 'Стандарт видеокамеры',
    body: '10 м',
  }, {
    title: 'Комплектация',
    body: '0.21 кгг',
  }],
});
export default definition;

export const Basic = story();
