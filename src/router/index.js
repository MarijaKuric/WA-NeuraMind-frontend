import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '@/views/Pocetna.vue'
import DailyFacts from '@/views/DailyFacts.vue'
import PrijavaAdmin from '@/views/PrijavaAdmin.vue'
import RegistracijaKorisnik from '@/views/RegistracijaKorisnik.vue'
import PrijavaKorisnik from '@/views/PrijavaKorisnik.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import UnosLekcijaAdmin from '../views/UnosLekcijaAdmin.vue'
import UnosKvizovaAdmin from '../views/UnosKvizovaAdmin.vue'
import PregledLekcijaAdmin from '../views/PregledLekcijaAdmin.vue'
import PregledKvizovaAdmin from '../views/PregledKvizovaAdmin.vue'
import RegistrationSuccess from '@/views/RegistrationSuccess.vue'
import PrikazLekcija from '@/views/PrikazLekcija.vue'
import AIChat from '@/views/AIChat.vue'
import KvizoviKorisnik from '@/views/KvizoviKorisnik.vue'
import StatistikaKorisnik from '@/views/StatistikaKorisnik.vue'
import ZajednicaKorisnik from '@/views/ZajednicaKorisnik.vue'

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna,
  },
  {
    path: '/daily-facts',
    name: 'DailyFacts',
    component: DailyFacts,
  },
  {
    path: '/prijava-admin',
    name: 'PrijavaAdmin',
    component: PrijavaAdmin,
  },
  {
    path: '/registracija-korisnik',
    name: 'RegistracijaKorisnik',
    component: RegistracijaKorisnik,
  },
  {
    path: '/prijava-korisnik',
    name: 'PrijavaKorisnik',
    component: PrijavaKorisnik,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
  },
  {
    path: '/unos-lekcija',
    name: 'UnosLekcijaAdmin',
    component: () => import('@/views/UnosLekcijaAdmin.vue'),
  },
  {
    path: '/unos-kvizova',
    name: 'UnosKvizovaAdmin',
    component: () => import('@/views/UnosKvizovaAdmin.vue'),
  },
  {
    path: '/pregled-lekcija',
    name: 'PregledLekcijaAdmin',
    component: () => import('@/views/PregledLekcijaAdmin.vue'),
  },
  {
    path: '/pregled-kvizova',
    name: 'PregledKvizovaAdmin',
    component: () => import('@/views/PregledKvizovaAdmin.vue'),
  },
  {
    path: '/registration-success',
    name: 'RegistrationSuccess',
    component: RegistrationSuccess,
  },
  {
    path: '/prikaz-lekcija',
    name: 'PrikazLekcija',
    component: PrikazLekcija,
  },
  {
    path: '/ai-chat',
    name: 'AIChat',
    component: AIChat,
  },
  {
    path: '/kvizovi-korisnik',
    name: 'KvizoviKorisnik',
    component: KvizoviKorisnik,
  },
  {
    path: '/statistika-korisnik',
    name: 'StatistikaKorisnik',
    component: StatistikaKorisnik,
  },
  {
    path: '/zajednica-korisnik',
    name: 'ZajednicaKorisnik',
    component: ZajednicaKorisnik,
  },
  {
    path: '/kvizovi-korisnik',
    name: 'KvizoviKorisnik',
    component: KvizoviKorisnik,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
