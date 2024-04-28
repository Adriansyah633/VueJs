import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/Contact.vue'
import Login from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import EditView from '../views/EditView.vue'
import NolanggView from '../views/NolanggView.vue'
import RiwayatView from '../views/RiwayatView.vue'
import EditBendelView from '../views/EditBendelView.vue'
import EditNolanggView from '../views/EditNolanggView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'contacts',
    component: ContactView
  },
  {
    path: '/login',
    name: 'Login',
    component : Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component : DashboardView
  },
  {
    path: '/edit/:nolangg',
    name: 'edit',
    component : EditView
  },
  {
    path: '/nolangg/',
    name: 'nolangg',
    component : NolanggView
  },
  {
    path: '/riwayat',
    name: 'riwayat',
    component : RiwayatView
  },
  {
    path: '/editbendel/:nolangg',
    name: 'EditBendel',
    component : EditBendelView
  },
  {
    path: '/editnolangg/:nolangg',
    name: 'EditNolangg',
    component : EditNolanggView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, _, next) => {
  // Cek apakah pengguna sudah berada di halaman yang dituju
  if (to.path === '/login' && router.currentRoute.path === '/login') {
    // Batalkan navigasi untuk menghindari NavigationDuplicated error
    return next(false);
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});

function isLoggedIn() {
  return localStorage.getItem('userToken');
}

export default router
