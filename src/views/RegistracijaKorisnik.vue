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

        <!-- NASLOV -->
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-2">
          Registracija
        </h1>
        <p class="text-sm text-gray-600 text-center mb-6">
          Kreirajte svoj račun
        </p>

        <!-- FORMA -->
        <form class="space-y-4" @submit.prevent="handleRegister">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ime</label>
            <input
              type="text"
              v-model="user.firstName"
              placeholder="Unesite ime"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prezime</label>
            <input
              type="text"
              v-model="user.lastName"
              placeholder="Unesite prezime"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              v-model="user.email"
              placeholder="primjer@email.com"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lozinka</label>
            <input
              type="password"
              v-model="user.password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Potvrda lozinke
            </label>
            <input
              type="password"
              v-model="user.confirmPassword"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
              required
            />
          </div>

          <!-- GUMB -->
          <button
            type="submit"
            class="w-full py-3 mt-2 rounded-xl font-bold text-white
                   bg-linear-to-r from-blue-500 to-blue-600
                   hover:from-blue-600 hover:to-blue-700
                   transition shadow-lg"
          >
            REGISTRIRAJ SE
          </button>
        </form>

        <div class="my-6 h-px bg-gray-300/60"></div>

        <!-- POVRATAK -->
        <button
          class="w-full py-3 rounded-xl font-semibold text-blue-600
                 bg-white/70 hover:bg-white
                 border border-blue-200
                 transition"
          @click="goHome"
        >
          ⬅ POČETNA
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = async () => {
  if (user.password !== user.confirmPassword) {
    alert('Lozinka i potvrda lozinke se ne podudaraju!')
    return
  }

  try {
    // POZIV BACKEND-a
    await axios.post('http://localhost:5000/api/korisnici/register', {
      ime: user.firstName,
      prezime: user.lastName,
      email: user.email,
      lozinka: user.password   // <-- mora biti "lozinka"
    })

    // uspješna registracija
    router.push('/registration-success')

  } catch (error) {
    alert(
      error.response?.data?.message ||
      'Greška pri registraciji. Pokušajte ponovno.'
    )
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
</style>
