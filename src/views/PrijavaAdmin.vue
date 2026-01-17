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
          Admin prijava
        </h1>
        <p class="text-sm text-gray-600 text-center mb-6">
          Pristup administracijskom sučelju
        </p>

        <form class="space-y-4" @submit.prevent="loginAdmin">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@neuramind.hr"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Lozinka
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     bg-white/80"
            />
          </div>

          <button
            type="submit"
            :disabled="!isValid"
            class="w-full py-3 mt-2 rounded-xl font-bold text-white
                   transition shadow-lg cursor-pointer"
            :class="isValid
              ? 'bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              : 'bg-gray-400 cursor-not-allowed'"
          >
            PRIJAVI SE
          </button>
        </form>

        <p v-if="error" class="text-sm text-red-500 text-center mt-3">
          {{ error }}
        </p>

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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const isValid = computed(() =>
  email.value.trim() !== '' && password.value.trim() !== ''
)

const loginAdmin = async () => {
  error.value = ''

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', res.data.token)
    router.push('/admin')
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Greška prilikom prijave'
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
</style>
