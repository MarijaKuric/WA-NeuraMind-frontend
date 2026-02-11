<template>
  <div class="min-h-screen bg-gray-100 flex justify-center p-4">
    <div class="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-8 flex flex-col min-h-[80vh]">

      <div class="flex justify-center mb-8">
        <h1 class="text-4xl font-bold italic text-blue-400">NEURAMind</h1>
      </div>

      <div class="flex justify-center gap-3 mb-10 flex-wrap">
        <button @click="goToLessons" :class="inactiveBtn">LEKCIJE</button>
        <button @click="goToKvizovi" :class="inactiveBtn">KVIZOVI</button>
        <button class="bg-blue-500 text-white px-5 py-2 rounded-full font-bold">STATISTIKA</button>
        <button @click="goToZajednica" :class="inactiveBtn">ZAJEDNICA</button>
        <button @click="goToAIChat" :class="inactiveBtn">AI CHAT</button>
      </div>

      <!-- GORNJE KARTICE -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div class="bg-blue-50 p-6 rounded-xl text-center shadow">
          <h3 class="font-bold mb-2">Riješeni kvizovi</h3>
          <p class="text-3xl font-bold text-blue-600">{{ stats.attempts }}</p>
        </div>

        <div class="bg-green-50 p-6 rounded-xl text-center shadow">
          <h3 class="font-bold mb-2">Ukupno točnih</h3>
          <p class="text-3xl font-bold text-green-600">{{ stats.totalCorrect }}</p>
        </div>

        <div class="bg-purple-50 p-6 rounded-xl text-center shadow">
          <h3 class="font-bold mb-2">Prosjek</h3>
          <p class="text-3xl font-bold text-purple-600">{{ successRate }}%</p>
        </div>

        <div class="bg-orange-50 p-6 rounded-xl text-center shadow">
          <h3 class="font-bold mb-2">🔥 Streak</h3>
          <p class="text-3xl font-bold text-orange-600">{{ streak }} dana</p>
        </div>

      </div>

      <!-- GRAF NAPRETKA -->
      <div class="mb-10">
        <h3 class="font-bold text-lg mb-4">📈 Zadnjih 5 rezultata</h3>

        <div class="flex items-end gap-4 h-40">
          <div
            v-for="(r, i) in lastResults"
            :key="i"
            class="flex-1 bg-gradient-to-t from-blue-400 to-purple-500 rounded-t-xl flex items-end justify-center text-white font-bold"
            :style="{ height: r + '%' }"
          >
            {{ r }}%
          </div>
        </div>
      </div>

      <div class="mt-auto flex justify-center pt-6">
        <button @click="logout" class="text-blue-900 font-bold hover:underline">
          ODJAVA
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🔥 FEJK PODACI
const stats = ref({
  attempts: 12,
  totalCorrect: 85,
  totalQuestions: 100
})

const streak = ref(4)

const lastResults = ref([60, 75, 80, 90, 100])

// IZRAČUNI
const successRate = computed(() => {
  return Math.round((stats.value.totalCorrect / stats.value.totalQuestions) * 100)
})

const level = computed(() => {
  return Math.floor(stats.value.totalCorrect / 20) + 1
})

const levelProgress = computed(() => {
  return (stats.value.totalCorrect % 20) * 5
})

const inactiveBtn =
  'bg-pink-400 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-400 transition'

const goToLessons = () => router.push({ name: 'PrikazLekcija' })
const goToKvizovi = () => router.push({ name: 'KvizoviKorisnik' })
const goToZajednica = () => router.push({ name: 'ZajednicaKorisnik' })
const goToAIChat = () => router.push({ name: 'AIChat' })
const logout = () => router.push('/')
</script>
