<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 w-full max-w-md">
      
      <!-- Logo -->
      <div class="flex items-center justify-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight italic text-blue-400">
          NEURAMind
        </h1>
      </div>

      <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
        Prijavite se u svoj račun.
      </h1>

      <form class="space-y-4" @submit.prevent="login">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <input
            v-model="email"
            type="email"
            placeholder="primjer@email.com"
            class="w-full px-4 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lozinka*</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
          />
        </div>

        <button
          type="submit"
          :class="[
            'w-full py-3 mt-2 rounded-xl font-bold text-white transition shadow-lg cursor-pointer',
            isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          ]"
          :disabled="!isFormValid"
        >
          PRIJAVI SE
        </button>
      </form>

      <p class="text-sm text-center mt-4 text-gray-700">
        Nemate račun?
        <span class="text-pink-600 font-bold cursor-pointer hover:underline" @click="goToRegister">
          Registrirajte se
        </span>
      </p>

      <span class="text-blue-600 font-semibold cursor-pointer mt-4 block text-center hover:underline" @click="goHome">
        ⬅ POČETNA
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('user@example.com') // dummy podaci
const password = ref('password123')    // dummy podaci

const isFormValid = computed(() => email.value.trim() !== '' && password.value.trim() !== '')

const goHome = () => router.push('/')
const goToRegister = () => router.push('/registracija-korisnik')

const login = () => {
  if (isFormValid.value) {
    // Dummy login, vodi na PrikazLekcija.vue
    router.push('/prikaz-lekcija')
  }
}
</script>
