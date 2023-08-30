import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/views/MainPage.vue'; // 실제 경로에 맞게 수정해야 합니다.
import LoginPage from '@/views/LoginPage.vue'; // 실제 경로에 맞게 수정해야 합니다.
import MatchingApplyDetailPage from '@/views/MatchingApplyDetailPage.vue';
import MatchingApplyDetailMorePage from '@/views/MatchingApplyDetailMorePage.vue';  // 실제 경로에 맞게 수정해야 합니다.
import MatchingApplyPage from '@/views/MatchingApplyPage.vue'; // 실제 경로에 맞게 수정해야 합니다.
import MyInfoPage from '@/views/MyInfoPage.vue'; // 실제 경로에 맞게 수정해야 합니다.
import MatchingBoardPage from '@/views/MatchingBoardPage.vue';
import MatchingBoardPage02 from '@/views/MatchingBoardPage02.vue'; // 실제 경로에 맞게 수정해야 합니다.
import SignUpPage from '@/views/SignUpPage.vue'; // 실제 경로에 맞게 수정해야 합니다.
import MatchingBoardDetailPage from '@/views/MatchingBoardDetailPage.vue'; 
import MatchingBoardDetailPageTwo from '@/views/MatchingBoardDetailPageTwo.vue';// 실제 경로에 맞게 수정해야 합니다.
import NoticePage from '@/views/NoticePage.vue';

const routes= [
    {
      path: '/MainPage',
      component: MainPage
    },
    {
      path: '/',
      component: LoginPage
    },
    {
      path: '/MatchingApplyDetailPage',
      component: MatchingApplyDetailPage
    },
    {
      path: '/MatchingApplyDetailMorePage',
      component: MatchingApplyDetailMorePage
    },
    {
      path: '/MatchingApplyPage',
      component: MatchingApplyPage
    },
    {
      path: '/MyInfoPage',
      component: MyInfoPage
    },
    {
      path: '/MatchingBoardPage',
      component: MatchingBoardPage
    },
    {
      path: '/MatchingBoardPage02',
      component: MatchingBoardPage02
    },
      {
        path: '/SignUpPage',
        component: SignUpPage
      },
      {
        path: "/MatchingBoardDetailPage/:postID",
        name: "MatchingBoardDetailPage",
        component: MatchingBoardDetailPage,
        props: true
      }, 
      {
        path: '/MatchingBoardDetailPageTwo',
        component: MatchingBoardDetailPageTwo
      },
    
      {
        path: '/NoticePage',
        component:NoticePage
      },
  
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;