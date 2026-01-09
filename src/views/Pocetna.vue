<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden
           bg-linear-to-br from-blue-50 via-purple-50 to-pink-50
           px-4 sm:px-6"
  >
    <div class="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"></div>

    <div class="w-full max-w-lg text-center space-y-6 relative z-10">

      <div>
        <div class="flex justify-center items-center mb-3">
          <h1 class="text-5xl sm:text-6xl font-bold text-blue-600 tracking-tight">
            NEURA<span class="text-blue-500 font-light">Mind</span>
          </h1>
        </div>

        <p class="text-gray-600 text-base sm:text-lg font-medium px-4">
          Dobrodošli u <span class="font-bold text-blue-600">NeuraMind</span> –
          Vaš vlastiti edukacijski AI svijet!
        </p>
      </div>

      <div class="flex justify-center py-2">
        <div class="relative w-72 h-56">
          <svg class="absolute inset-0 w-full h-full opacity-60">
            <line x1="50" y1="60" x2="135" y2="20" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="50" y1="60" x2="135" y2="90" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="50" y1="60" x2="135" y2="160" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="50" y1="120" x2="135" y2="20" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="50" y1="120" x2="135" y2="90" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="50" y1="120" x2="135" y2="160" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="135" y1="20" x2="220" y2="60" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="135" y1="90" x2="220" y2="60" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="135" y1="160" x2="220" y2="60" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="135" y1="20" x2="220" y2="120" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="135" y1="90" x2="220" y2="120" stroke="#cbd5e1" stroke-width="1.5"/>
            <line x1="135" y1="160" x2="220" y2="120" stroke="#cbd5e1" stroke-width="1.5"/>
          </svg>

          <span class="node bg-yellow-400" style="top:60px; left:50px"></span>
          <span class="node bg-yellow-400" style="top:120px; left:50px"></span>

          <span class="node bg-pink-400" style="top:20px; left:135px"></span>
          <span class="node bg-pink-400" style="top:90px; left:135px"></span>
          <span class="node bg-pink-400" style="top:160px; left:135px"></span>

          <span class="node bg-green-400" style="top:60px; left:220px"></span>
          <span class="node bg-green-400" style="top:120px; left:220px"></span>
        </div>
      </div>

      <div
        class="group p-5 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/50
               shadow-xl hover:bg-white/60 transition cursor-pointer"
        @click="goToDailyFacts"
      >
        <div class="flex justify-center gap-3 font-bold text-blue-600 cursor-pointer">
          ⬅ DAILY AI FACTS ➡
        </div>
        <p class="text-xs text-gray-500 mt-1">
          bez prijave, pristup kao gost
        </p>
      </div>

      <button
        class="w-full py-4 rounded-2xl font-bold text-lg text-white
               bg-linear-to-r from-blue-500 to-blue-600
               hover:from-blue-600 hover:to-blue-700
               shadow-xl transition cursor-pointer"
        @click="goToLogin"
      >
        PRIJAVI SE
      </button>

      <p class="text-sm text-gray-600">
        Nemate račun?
        <span
          class="text-pink-600 font-bold cursor-pointer hover:underline"
          @click="goToRegister"
        >
          Registrirajte se
        </span>
      </p>

      <p class="text-xs text-gray-500">
        Prijavite se kao
        <button
          class="text-blue-600 font-bold cursor-pointer hover:underline bg-transparent border-0 p-0"
          @click="goToAdmin"
        >
          ADMINISTRATOR
        </button>
      </p>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToDailyFacts = () => router.push('/daily-facts')
const goToLogin = () => router.push('/prijava-korisnik')
const goToAdmin = () => router.push('/prijava-admin')
const goToRegister = () => router.push('/registracija-korisnik')
</script>

<style scoped>
.node {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  transform: translate(-50%, -50%);
}
</style>

