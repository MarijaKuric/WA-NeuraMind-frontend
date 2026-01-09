<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div
      class="bg-white w-full max-w-md min-h-50
             shadow-lg rounded-lg flex flex-col items-center
             relative py-16 px-6"
    >
      <div class="absolute top-4 left-6 text-gray-400 text-sm font-medium">
        Admin-početna
      </div>

      <div class="flex items-center mt-12 mb-12 relative">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight italic text-blue-400">
          NEURAMind
        </h1>

        <div class="ml-3 w-10 h-10 relative">
          <div class="w-3 h-3 bg-yellow-300 rounded-full absolute top-0 left-2"></div>
          <div class="w-3 h-3 bg-pink-300 rounded-full absolute top-2 right-0"></div>
          <div class="w-3 h-3 bg-green-300 rounded-full absolute bottom-0 right-2"></div>
          <div class="w-3 h-3 bg-purple-300 rounded-full absolute top-5 left-0"></div>
          <div class="w-1 h-5 bg-gray-200 absolute top-2 left-4 rotate-45"></div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 w-full mb-6">
        <button
          @click="router.push('/unos-lekcija')"
          class="bg-[#f482d0] text-white text-xs font-bold py-3 px-2 rounded-full shadow-md hover:bg-[#e06db8] uppercase tracking-wide"
        >
          UNOS LEKCIJA
        </button>

        <button
          @click="router.push('/unos-kvizova')"
          class="bg-[#f482d0] text-white text-xs font-bold py-3 px-2 rounded-full shadow-md hover:bg-[#e06db8] uppercase tracking-wide"
        >
          UNOS KVIZOVA
        </button>

        <button
          @click="router.push('/pregled-lekcija')"
          class="bg-[#f482d0] text-white text-xs font-bold py-3 px-2 rounded-full shadow-md hover:bg-[#e06db8] uppercase tracking-wide"
        >
          PREGLED LEKCIJA
        </button>

        <button
          @click="router.push('/pregled-kvizova')"
          class="bg-[#f482d0] text-white text-xs font-bold py-3 px-2 rounded-full shadow-md hover:bg-[#e06db8] uppercase tracking-wide"
        >
          PREGLED KVIZOVA
        </button>
      </div>

      <div class="mt-auto mb-6">
        <button
          @click="handleLogout"
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
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  router.push('/prijava-admin')
}
</script>

<style>
</style>
