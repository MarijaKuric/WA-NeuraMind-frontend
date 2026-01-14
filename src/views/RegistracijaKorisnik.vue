<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden
           bg-linear-to-br from-blue-50 via-purple-50 to-pink-50
           px-4 sm:px-6"
  >
    <div class="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
    <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"></div>

    <div class="relative z-10 w-full max-w-md">
      <div class="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-2">
          Registracija
        </h1>

        <p class="text-sm text-gray-600 text-center mb-6">
          Kreirajte svoj račun
        </p>

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
            <label class="block text-sm font-medium text-gray-700 mb-1">Potvrda lozinke</label>
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

          <button
            type="submit"
            class="w-full py-3 mt-2 rounded-xl font-bold text-white
                   bg-linear-to-r from-blue-500 to-blue-600
                   hover:from-blue-600 hover:to-blue-700
                   transition shadow-lg cursor-pointer"
          >
            REGISTRIRAJ SE
          </button>
        </form>

        <div class="my-6 h-px bg-gray-300/60"></div>

        <button
          class="w-full py-3 rounded-xl font-semibold text-blue-600
                 bg-white/70 hover:bg-white
                 border border-blue-200
                 transition cursor-pointer"
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

const router = useRouter()

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  if (user.password !== user.confirmPassword) {
    alert('Lozinka i potvrda lozinke se ne podudaraju!')
    return
  }

  // Dummy "spremanje" – ovdje će kasnije ići MongoDB
  console.log('Registrirani korisnik:', user)

  // Preusmjeri na stranicu uspješne registracije
  router.push('/registration-success')
}

const goHome = () => {
  router.push('/')
}
</script>
<style scoped></style>