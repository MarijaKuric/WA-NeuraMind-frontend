<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50"
  >
    <div
      class="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-xl text-center"
    >
      <h1 class="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
        DAILY AI FACT
      </h1>
      <p class="text-gray-700 text-lg sm:text-xl leading-relaxed mb-6">
        {{ currentFact }}
      </p>
      <button
        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition cursor-pointer"
        @click="goBack"
      >
        ⬅ Natrag
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const facts = [
  "AI modeli uče iz velikih količina podataka, ali ne razumiju sadržaj kao ljudi – samo prepoznaju obrasce.",
  "AI nema svijest, emocije ni namjere, iako ponekad zvuči kao da zna što radi.🤖",
  "Brzina je jedna od najvećih prednosti AI-ja: može obraditi milijune podataka u sekundi.!",
  "AI može pogriješiti ako su podaci loši – vrijedi pravilo: “garbage in, garbage out”.",
  "Većina AI sustava ne uči sama u stvarnom vremenu, nego se periodično trenira.",
  "AI je već prisutan u svakodnevici: preporuke na YouTubeu, navigacija, filteri za spam.",
  "AI ne zna što je istina – zna samo što statistički izgleda uvjerljivo.",
  "AI je odličan pomoćnik, ali loš zamjenski “šef” – odluke i odgovornost su još uvijek ljudske."
]

const currentFact = ref("Loading...")

const getDailyFact = () => {
  const today = new Date().toDateString()
  const saved = JSON.parse(localStorage.getItem('dailyFact') || '{}')

  if (saved.date === today) {
    return facts[saved.index] || facts[0]
  } else {
    const newIndex = Math.floor(Math.random() * facts.length)
    localStorage.setItem(
      'dailyFact',
      JSON.stringify({ date: today, index: newIndex })
    )
    return facts[newIndex]
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  currentFact.value = getDailyFact()
})
</script>

<style scoped>
p {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
