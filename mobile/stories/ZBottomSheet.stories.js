import ZBottomSheet from '@/components/ZBottomSheet';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZBottomSheet, {
  dialog: true,
});

export default definition;

export const Basic = story();
