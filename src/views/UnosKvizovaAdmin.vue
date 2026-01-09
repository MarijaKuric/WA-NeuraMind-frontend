<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">

      <h2 class="text-2xl font-bold text-blue-400 mb-6">
        {{ isEdit ? 'Izmena kviza' : 'Unos novog kviza' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pitanje</label>
          <input
            v-model="quiz.question"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Opcije</label>
          <input
            v-for="(opt, i) in quiz.options"
            :key="i"
            v-model="quiz.options[i]"
            :placeholder="`Opcija ${i + 1}`"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tačan odgovor (1–4)
          </label>
          <input
            v-model.number="quiz.correct"
            type="number"
            min="1"
            max="4"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div class="flex justify-between mt-6">
          <button class="bg-blue-400 text-white px-4 py-2 rounded">
            Sačuvaj
          </button>

          <button
            type="button"
            @click="router.push('/admin')"
            class="bg-gray-300 px-4 py-2 rounded"
          >
            Odustani
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const quiz = ref({
  question: '',
  options: ['', '', '', ''],
  correct: 1
})

const isEdit = computed(() => !!route.query.id)

onMounted(async () => {
  if (isEdit.value) {
    const { data } = await api.get(`/quizzes/${route.query.id}`)
    quiz.value = data
  }
})

const handleSubmit = async () => {
  if (isEdit.value) {
    await api.put(`/quizzes/${route.query.id}`, quiz.value)
  } else {
    await api.post('/quizzes', quiz.value)
  }
  router.push('/pregled-kvizova')
}
</script>
<style scoped></style>
