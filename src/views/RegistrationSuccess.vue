<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden
           bg-linear-to-br from-blue-50 via-purple-50 to-pink-50
           px-4 sm:px-6"
  >
    <!-- Pozadinski blur krugovi -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"></div>

    <div class="relative z-10 w-full max-w-md">
      <div class="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">

        <!-- Logo NEURAMind -->
        <div class="flex items-center justify-center mb-8 relative">
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

        <!-- Poruka o uspješnoj registraciji -->
        <div class="text-center mb-6 px-4">
          <h2 class="text-2xl font-bold mb-2 text-gray-800">Uspješno ste stvorili svoj račun!</h2>
          <p class="text-gray-700">
            Uskoro će Vam stići i email potvrda. Hvala!
          </p>
        </div>

        <!-- Gumb PRIJAVI SE -->
        <div class="grid grid-cols-1 gap-3 w-full mb-4 px-6">
          <button
            @click="router.push({ name: 'PrijavaKorisnik' })"
            class="w-full py-3 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition shadow-lg uppercase tracking-wide"
          >
            PRIJAVI SE
          </button>
        </div>

        <!-- POČETNA kao klikabilni tekst -->
        <div class="mb-2 text-center">
          <span
            @click="router.push('/')"
            class="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            ⬅ POČETNA
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
</style>
