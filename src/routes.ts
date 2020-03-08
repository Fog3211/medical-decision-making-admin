import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
import Solution from '@/pages/Solution';
import Analysis from '@/pages/Analysis';
import Monitor from '@/pages/Monitor';
import FormBasic from '@/pages/FormBasic';
import FormStep from '@/pages/FormStep';
import FormClassified from '@/pages/FormClassified';
import FormHierarchical from '@/pages/FormHierarchical';
import FormGroup from '@/pages/FormGroup';
import FlowGroup from '@/pages/FlowGroup';
import Advanced from '@/pages/Advanced';
import BasicListPage from '@/pages/BasicListPage';
import CardListPage from '@/pages/CardListPage';
import TableListPage from '@/pages/TableListPage';
import FeedbackFail from '@/pages/FeedbackFail';
import FeedbackSuccess from '@/pages/FeedbackSuccess';
import FeedbackForbidden from '@/pages/FeedbackForbidden';
import FeedbackNotFound from '@/pages/FeedbackNotFound';
import FeedbackServerError from '@/pages/FeedbackServerError';
import Settings from '@/pages/Settings';
import Person from '@/pages/Person';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/solution',
        component: Solution,
      },
      {
        path: '/dashboard/analysis',
        component: Analysis,
      },
      {
        path: '/dashboard/monitor',
        component: Monitor,
      },
      {
        path: '/form/basic',
        component: FormBasic,
      },
      {
        path: '/form/step',
        component: FormStep,
      },
      {
        path: '/form/classified',
        component: FormClassified,
      },
      {
        path: '/form/hierarchical',
        component: FormHierarchical,
      },
      {
        path: '/form/group',
        component: FormGroup,
      },
      {
        path: '/form/flow',
        component: FlowGroup,
      },
      {
        path: '/detail/advanced',
        component: Advanced,
      },
      {
        path: '/list/basic',
        component: BasicListPage,
      },
      {
        path: '/list/card',
        component: CardListPage,
      },
      {
        path: '/list/table',
        component: TableListPage,
      },
      {
        path: '/feedback/fail',
        component: FeedbackFail,
      },
      {
        path: '/feedback/success',
        component: FeedbackSuccess,
      },
      {
        path: '/feedback/403',
        component: FeedbackForbidden,
      },
      {
        path: '/feedback/404',
        component: FeedbackNotFound,
      },
      {
        path: '/feedback/500',
        component: FeedbackServerError,
      },
      {
        path: '/settings',
        component: Settings,
      },
      {
        path: '/person',
        component: Person,
      },
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
    ],
  },
];
export default routerConfig;
