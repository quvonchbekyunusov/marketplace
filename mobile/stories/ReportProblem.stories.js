import ReportProblem from '@/components/ZReportProblem';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ReportProblem, {});

export default definition;

export const Basic = story();
