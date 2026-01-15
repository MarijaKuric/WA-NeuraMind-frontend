<template>
  <div class="min-h-screen bg-gray-100 flex justify-center p-4">
    <div class="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 flex flex-col min-h-[80vh]">

      <!-- LOGO -->
      <div class="flex justify-center items-center mb-8">
        <h1 class="text-4xl font-bold italic text-blue-400">NEURAMind</h1>
        <div class="ml-3 w-10 h-10 relative">
          <div class="w-3 h-3 bg-yellow-300 rounded-full absolute top-0 left-2"></div>
          <div class="w-3 h-3 bg-pink-300 rounded-full absolute top-2 right-0"></div>
          <div class="w-3 h-3 bg-green-300 rounded-full absolute bottom-0 right-2"></div>
          <div class="w-3 h-3 bg-purple-300 rounded-full absolute top-5 left-0"></div>
        </div>
      </div>

      <!-- NAVIGACIJA -->
      <div class="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          @click="goToLessons"
          :class="activeTab==='LEKCIJE' ? activeBtn : inactiveBtn"
        >LEKCIJE</button>

        <button
          @click="goToKvizovi"
          :class="activeTab==='KVIZOVI' ? activeBtn : inactiveBtn"
        >KVIZOVI</button>

        <button
          @click="goToStatistika"
          :class="activeTab==='STATISTIKA' ? activeBtn : inactiveBtn"
        >STATISTIKA</button>

        <button
          @click="goToZajednica"
          :class="activeTab==='ZAJEDNICA' ? activeBtn : inactiveBtn"
        >ZAJEDNICA</button>

        <button
          @click="goToAIChat"
          :class="activeTab==='AI CHAT' ? activeBtn : inactiveBtn"
        >AI CHAT</button>
      </div>

      <!-- SADRŽAJ -->
      <div class="flex-1">

        <!-- LEKCIJA -->
        <div class="bg-blue-50 rounded-xl p-6 shadow-md relative mb-10">

          <h2 class="text-xl font-bold text-gray-800 mb-4">
            1. Lekcija – Osnove umjetne inteligencije
          </h2>

          <div v-if="isOpen" class="text-gray-700 leading-relaxed">
            <p class="mb-4">
              Umjetna inteligencija (AI) je područje računalne znanosti koje se bavi
              razvojem sustava sposobnih obavljati zadatke koji inače zahtijevaju ljudsku inteligenciju.
            </p>
            <p class="mb-4">
              To uključuje učenje, zaključivanje, prepoznavanje obrazaca i donošenje odluka.
            </p>

            <div class="flex justify-end mt-6">
              <button class="text-blue-600 font-bold hover:underline">
                2. lekcija →
              </button>
            </div>
          </div>

          <!-- START / ZATVORI -->
          <button
            @click="toggleLesson"
            class="absolute bottom-4 right-4 bg-pink-400 text-white px-5 py-2
                   rounded-full font-bold shadow-md hover:bg-blue-500 transition"
          >
            {{ isOpen ? 'ZATVORI' : 'OTVORI' }}
          </button>

        </div>
      </div>

      <!-- ODJAVA NA DNU -->
      <div class="mt-auto flex justify-center pt-6">
        <button
          @click="logout"
          class="flex items-center text-blue-900 font-bold hover:opacity-80 transition"
        >
          <span class="bg-blue-400 text-white rounded p-1 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          ODJAVA
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

// Aktivni tab
const activeTab = ref('LEKCIJE')

// CSS klase za gumbiće
const activeBtn = 'bg-blue-500 text-white px-5 py-2 rounded-full shadow-md font-bold hover:bg-blue-600 transition'
const inactiveBtn = 'bg-pink-400 text-white px-5 py-2 rounded-full shadow-md font-bold hover:bg-blue-500 transition'

// Toggle lekcija
const toggleLesson = () => {
  isOpen.value = !isOpen.value
}

// Navigacija
const goToLessons = () => {
  activeTab.value = 'LEKCIJE'
  router.push({ name: 'PrikazLekcija' })
}

const goToKvizovi = () => {
  activeTab.value = 'KVIZOVI'
  router.push({ name: 'KvizoviKorisnik' })
}

const goToStatistika = () => {
  activeTab.value = 'STATISTIKA'
  router.push({ name: 'StatistikaKorisnik' })
}

const goToZajednica = () => {
  activeTab.value = 'ZAJEDNICA'
  router.push({ name: 'ZajednicaKorisnik' })
}

const goToAIChat = () => {
  activeTab.value = 'AI CHAT'
  router.push({ name: 'AIChat' })
}

// Logout
const logout = () => router.push('/')
</script>

<style scoped>
</style>
