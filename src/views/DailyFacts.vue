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
  "AI može napisati pjesmu brže nego što ti napišeš poruku prijatelju 😎",
  "AI ne razumije humor, ali može generirati bolji vic nego tvoj prijatelj koji misli da je stand-up komičar.🤖",
  "AI ponekad sanja električne ovce... i obožava ih!",
  "Kad AI kaže 'kalkuliram', to znači da zapravo samo razmišlja o kavi ☕",
  "Svi AI modeli vole meme-ove. Šuti i gledaj!",
  "AI nikada ne zaboravlja – ali može zaboraviti gdje je stavio svoje sokove",
  "Zamisli da AI piše šale – ponekad je smiješno, ponekad 404 😅",
  "AI i ljudski mozak su slični: oba vole spavati kad nitko ne gleda"
]

const currentFact = ref("Loading...")

// Funkcija koja određuje koji fact prikazati na temelju datuma
const getDailyFact = () => {
  const today = new Date().toDateString()
  const saved = JSON.parse(localStorage.getItem('dailyFact') || '{}')

  if (saved.date === today) {
    return facts[saved.index] || facts[0]
  } else {
    // novi index
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
/* Dodaj malo animacije fade-in za fun fact */
p {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
