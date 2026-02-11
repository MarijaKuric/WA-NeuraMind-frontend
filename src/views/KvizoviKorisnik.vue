<template>
  <div class="min-h-screen bg-gray-100 flex justify-center p-4">
    <div class="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 flex flex-col min-h-[80vh]">
      
      <div class="flex justify-center items-center mb-8">
        <h1 class="text-4xl font-bold italic text-blue-400">NEURAMind</h1>
        <div class="ml-3 w-10 h-10 relative">
          <div class="w-3 h-3 bg-yellow-300 rounded-full absolute top-0 left-2"></div>
          <div class="w-3 h-3 bg-pink-300 rounded-full absolute top-2 right-0"></div>
          <div class="w-3 h-3 bg-green-300 rounded-full absolute bottom-0 right-2"></div>
          <div class="w-3 h-3 bg-purple-300 rounded-full absolute top-5 left-0"></div>
        </div>
      </div>

      <div class="flex justify-center gap-3 mb-10 flex-wrap">
        <button @click="goToLessons" :class="activeTab==='LEKCIJE'?activeBtn:inactiveBtn">LEKCIJE</button>
        <button @click="goToKvizovi" :class="activeTab==='KVIZOVI'?activeBtn:inactiveBtn">KVIZOVI</button>
        <button @click="goToStatistika" :class="activeTab==='STATISTIKA'?activeBtn:inactiveBtn">STATISTIKA</button>
        <button @click="goToZajednica" :class="activeTab==='ZAJEDNICA'?activeBtn:inactiveBtn">ZAJEDNICA</button>
        <button @click="goToAIChat" :class="activeTab==='AI CHAT'?activeBtn:inactiveBtn">AI CHAT</button>
      </div>

      <div class="flex-1 flex justify-center items-start">
        <div class="w-full max-w-2xl">
          
          <div v-if="currentQuestion">
            <div class="mb-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Pitanje {{ index + 1 }} od {{ quizzes.length }}</span>
                <span>Točno: {{ score }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  :style="{ width: ((index / quizzes.length) * 100) + '%' }"
                ></div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200 shadow-md">
              <p class="font-bold text-xl text-gray-800">{{ currentQuestion.question }}</p>
            </div>

            <div class="space-y-4">
              <button
                v-for="(opt, i) in currentQuestion.options"
                :key="i"
                @click="selectAnswer(i + 1)"
                class="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all font-medium text-gray-700 group"
              >
                <span class="inline-flex items-center">
                  <span class="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center mr-3 font-bold group-hover:scale-110">
                    {{ String.fromCharCode(65 + i) }}
                  </span>
                  {{ opt }}
                </span>
              </button>
            </div>
          </div>

          <div v-else-if="quizzes.length > 0" class="text-center">
            <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-10 border-2 border-green-200 shadow-xl">
              <h3 class="text-3xl font-bold mb-6 text-green-600">Kviz završen!</h3>
              <div class="bg-white rounded-2xl p-6 mb-6 shadow-md">
                <p class="text-2xl text-gray-700">Tvoj rezultat:</p>
                <p class="text-5xl font-bold text-purple-600">{{ score }} / {{ quizzes.length }}</p>
                <p class="text-lg text-gray-600 mt-3">{{ getPerformanceMessage() }}</p>
              </div>
              <button @click="restart" class="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-600">
                🔄 Pokušaj ponovno
              </button>
            </div>
          </div>

          <div v-else class="text-center text-gray-500">
            Učitavanje kvizova...
          </div>
        </div>
      </div>

      <div class="mt-auto flex justify-center pt-6">
        <button @click="logout" class="flex items-center text-blue-900 font-bold hover:opacity-80 transition">
          <span class="bg-blue-400 text-white rounded p-1 mr-2">←</span> ODJAVA
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const activeTab = ref('KVIZOVI')
const quizzes = ref([])
const index = ref(0)
const score = ref(0)

const currentQuestion = computed(() => quizzes.value[index.value])

onMounted(async () => {
  try {
    const { data } = await api.get('/quizzes')
    quizzes.value = data
  } catch (err) {
    console.error("Greška pri dohvaćanju kvizova:", err)
  }
})

// FUNKCIJA ZA ODGOVARANJE (Ažurirana prema tvom zahtjevu)
const selectAnswer = async (answer) => {
  // 1. Provjeri točnost
  if (answer === currentQuestion.value.correct) {
    score.value++
  }

  // 2. Provjeri je li ovo zadnje pitanje
  if (index.value + 1 === quizzes.value.length) {
    index.value++ // Pomakni na ekran s rezultatima
    await saveStats() // Spremi u bazu
  } else {
    index.value++ // Samo idi na sljedeće pitanje
  }
}

// FUNKCIJA ZA SPREMANJE (Ažurirana prema tvom zahtjevu)
const saveStats = async () => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    console.error("Korisnik nije prijavljen (userId nedostaje)")
    return
  }

  try {
    await api.post('/statistika', {
      userId: userId,
      correct: score.value,
      total: quizzes.value.length
    })
    console.log("Statistika uspješno spremljena!")
  } catch (err) {
    console.error("Greška pri spremanju statistike na server:", err)
  }
}

const restart = () => {
  index.value = 0
  score.value = 0
}

const getPerformanceMessage = () => {
  if (quizzes.value.length === 0) return ''
  const percentage = (score.value / quizzes.value.length) * 100
  if (percentage === 100) return '🌟 Savršeno! Bravo!'
  if (percentage >= 80) return '💪 Odličan rezultat!'
  if (percentage >= 40) return '📚 Nastavi vježbati!'
  return '💡 Probaj ponovno!'
}

// Stilovi gumba
const activeBtn = 'bg-blue-500 text-white px-5 py-2 rounded-full font-bold shadow-md transition'
const inactiveBtn = 'bg-pink-400 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-blue-400 transition'

// Navigacija
const goToLessons = () => router.push({ name: 'PrikazLekcija' })
const goToKvizovi = () => router.push({ name: 'KvizoviKorisnik' })
const goToStatistika = () => router.push({ name: 'StatistikaKorisnik' })
const goToZajednica = () => router.push({ name: 'ZajednicaKorisnik' })
const goToAIChat = () => router.push({ name: 'AIChat' })

const logout = () => {
  localStorage.clear()
  router.push('/')
}
</script>