<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden
           bg-linear-to-br from-blue-50 via-purple-50 to-pink-50
           px-4 sm:px-6"
  >
    <!-- Blur pozadina -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"></div>

    <div class="relative z-10 w-full max-w-md">
      <div class="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">

        <!-- Logo -->
        <div class="flex items-center justify-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight italic text-blue-400">
            NEURAMind
          </h1>
        </div>

        <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
          Prijavite se u svoj račun.
        </h1>

        <!-- Login Forma -->
        <form class="space-y-4" @submit.prevent="login">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              v-model="email"
              type="email"
              placeholder="primjer@email.com"
              class="w-full px-4 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lozinka*</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              required
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

        <span
          class="text-blue-600 font-semibold cursor-pointer mt-4 block text-center hover:underline"
          @click="goHome"
        >
          ⬅ POČETNA
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')

const isFormValid = computed(() => email.value.trim() !== '' && password.value.trim() !== '')

const goHome = () => router.push('/')
const goToRegister = () => router.push('/registracija-korisnik')

const login = async () => {
  if (!isFormValid.value) return

  try {
    const res = await axios.post('http://localhost:5000/api/korisnici/login', {
      email: email.value,
      lozinka: password.value
    })

    console.log('Prijava uspješna:', res.data)

    // Spremi korisnika u local state (po potrebi)
    localStorage.setItem('korisnik', JSON.stringify(res.data.korisnik))

    // Preusmjeri na PrikazLekcija.vue
    router.push('/prikaz-lekcija')
  } catch (err) {
    alert(err.response?.data?.message || 'Greška pri prijavi. Pokušajte ponovno.')
  }
}
</script>

<style scoped>
</style>
